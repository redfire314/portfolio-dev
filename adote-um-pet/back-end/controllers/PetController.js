// Dependencies
const Pet = require('../models/PetModel');
const User = require('../models/UserModel');
const petFormValidator = require('../helpers/petFormValidator');
const messages = require('../helpers/messages');
const getTokenData = require('../helpers/getTokenData');
const { isValidObjectId } = require('mongoose');
const removeImageFromDisk = require('../helpers/removeImageFromDisk');

class PetController {
    // Creates the pet on the collection
    static async create(req, res) {
        // Retrieves pet form input
        const { name, breed, color, age } = req.body;
        let images = req.file;

        // Checks input with RegExp
        if (!petFormValidator(name, breed, color, age, images)) {
            res.status(400).json({ message: messages.badRequest });
            return;
        }

        // Checks image size (max 100kb)
        if (images.size >= 100000) {
            removeImageFromDisk(images.filename);
            res.status(415).json({ message: messages.imgSize });
            return;
        }

        images = images.filename;

        // Get owner
        const token = req.headers.authorization;
        const owner = getTokenData(token).data; // user id

        // Create pet
        const pet = new Pet({
            name,
            breed,
            color,
            age,
            images,
            owner
        });
        await pet.save();

        // Response
        res.status(200).json({ message: messages.petCreated });
    }

    // Updates the pet in database
    static async update(req, res) {
        // Retrieves pet form input
        const { id, name, breed, color, age } = req.body;
        let images = req.file;

        // Checks input with RegExp
        if (!petFormValidator(name, breed, color, age, images)) {
            res.status(400).json({ message: messages.badRequest });
            return;
        }

        // Checks image size (max 100kb)
        if (images.size >= 100000) {
            removeImageFromDisk(images.filename);
            res.status(415).json({ message: messages.imgSize });
            return;
        }

        images = images.filename;

        // Get user
        const token = req.headers.authorization;
        const user = getTokenData(token).data; // user id

        // Checks if pet exists
        const pet = await Pet.findById(id);
        if (!pet) {
            res.status(404).json({ message: messages.petNotFound });
            return;
        }

        // Checks if the user is the owner
        if (pet.owner != user) {
            res.status(403).json({ message: messages.forbidden });
            return;
        }

        // Remove old images
        pet.images.forEach((image) => {
            removeImageFromDisk(image);
        });

        // Update pet
        await Pet.updateOne(
            { _id: id },
            {
                name,
                breed,
                color,
                age,
                images
            }
        );

        // Response
        res.status(200).json({ message: messages.petUpdated });
    }

    // Removes the pet from collection
    static async remove(req, res) {
        // Retrieves pet form input
        const id = req.params.id;

        // Checks if id was given
        if (!id || !isValidObjectId(id)) {
            res.status(400).json({ message: messages.badRequest });
            return;
        }

        // Checks if pet exists
        const pet = await Pet.findById(id);
        if (!pet) {
            res.status(404).json({ message: messages.petNotFound });
            return;
        }

        // Get user
        const token = req.headers.authorization;
        const user = getTokenData(token).data; // user id

        // Checks if the user is the owner
        if (pet.owner != user) {
            res.status(403).json({ message: messages.forbidden });
            return;
        }

        // Remove all images
        pet.images.forEach((image) => {
            removeImageFromDisk(image);
        });

        // Remove
        await Pet.deleteOne({ _id: id });

        // Response
        res.status(200).json({ message: messages.petRemoved });
    }

    // Get pet data from collection
    static async getPetInfo(req, res) {
        // Retrieves id from input
        const id = req.params.id;

        // Checks if id is valid
        // RegExp
        if (!id || !isValidObjectId(id)) {
            res.status(400).json({ message: messages.badRequest });
            return;
        }

        // Checks if pet exists
        const pet = await Pet.findById(id)
            .select('-_id name breed color age images owner')
            .lean();

        if (!pet) {
            res.status(404).json({ message: messages.petNotFound });
            return;
        }

        // Get user
        // const token = req.headers.authorization;
        // const user = getTokenData(token).data;

        // Checks if the user is the owner
        // if (pet.owner != user) {
        //     res.status(403).json({ message: messages.forbidden });
        //     return;
        // }

        // Response
        res.status(200).json({ message: messages.petData, ...pet });
    }

    // Adds the user in pendingOwners list
    static async schedule(req, res) {
        // Get input
        const id = req.body.id;

        // Checks the input
        if (!id || !isValidObjectId(id)) {
            res.status(400).json({ message: messages.badRequest });
            return;
        }

        // Checks if the pet exists
        const pet = await Pet.findById(id);
        if (!pet) {
            res.status(404).json({ message: messages.petNotFound });
            return;
        }

        // Checks if the pet isnt already adopted
        if (pet.newOwner) {
            res.status(406).json({ message: messages.petAdopted });
            return;
        }

        // Get user
        const token = req.headers.authorization;
        const user = getTokenData(token).data; // user id

        // Checks if the user is the pet owner
        if (pet.owner == user) {
            res.status(403).json({ message: messages.forbidden });
            return;
        }

        // Checks if the user is already in pendingOwners list
        let isUserInList = false;
        if (pet.pendingOwners) {
            pet.pendingOwners.forEach((value) => {
                if (value == user) isUserInList = true;
            });
        }

        if (isUserInList) {
            res.status(403).json({ message: messages.forbidden });
            return;
        }

        // Adds the user in pendingOwners list
        let pendingOwners = pet.pendingOwners;
        pendingOwners.push(user);

        await Pet.updateOne({ _id: id }, { pendingOwners });

        // Get phone from pet owner and send to the user
        const phone = await User.findById(pet.owner)
            .select('-_id phone')
            .lean();

        // Response
        res.status(200).json({ message: messages.petScheduled, ...phone });
    }

    // Concludes the adoption process
    static async finishAdoption(req, res) {
        // Get input
        const { petId, newOwnerId } = req.body;

        // Checks if is valid input
        if (
            !petId ||
            !newOwnerId ||
            !isValidObjectId(petId) ||
            !isValidObjectId(newOwnerId)
        ) {
            res.status(400).json({ message: messages.badRequest });
            return;
        }

        // Checks if pet exists
        const pet = await Pet.findById(petId).lean();
        if (!pet) {
            res.status(404).json({ message: messages.petNotFound });
            return;
        }

        // Checks if pet is already adopted
        if (pet.newOwner) {
            res.status(403).json({ message: messages.petAdopted });
            return;
        }

        // Checks if newOwner exists
        const newOwner = await User.findById(newOwnerId).lean();
        if (!newOwner) {
            res.status(404).json({ message: messages.userNotFound });
            return;
        }

        // Checks if newOwner is on pendingOwner list
        let isNewOwnerOnList = false;
        pet.pendingOwners.forEach((value) => {
            if (value == newOwnerId) isNewOwnerOnList = true;
        });

        if (!isNewOwnerOnList) {
            res.status(500).json({ message: messages.error });
            return;
        }

        // Get user
        const token = req.headers.authorization;
        const user = getTokenData(token).data; // user id

        // Checks if is valid user
        if (!isValidObjectId(user)) {
            res.status(404).json({ message: messages.userNotFound });
            return;
        }

        // Checks if the user is the pet owner
        if (pet.owner !== user) {
            res.status(403).json({ message: messages.forbidden });
            return;
        }

        // Finish adoption and clear pendingOwner list
        await Pet.updateOne(
            { _id: petId },
            { pendingOwners: [], newOwner: newOwnerId }
        );

        // Response
        res.status(200).json({ message: messages.petFinish });
    }

    // Returns all pets
    static async getAllPets(req, res) {
        // Get all pets from collection
        const pets = await Pet.find().lean();

        // Response
        res.status(200).json({ message: messages.allPets, pets });
    }

    // Returns all my pets
    static async getMyPets(req, res) {
        // Get user
        const token = req.headers.authorization;
        const user = getTokenData(token).data; // user id

        // Get all my pets from collection
        const myPets = await Pet.find({ owner: user }).lean();

        // TO DO: Get pending owners name

        // Response
        res.status(200).json({ message: messages.myPets, myPets });
    }

    // Returns all my adoptions
    static async getMyAdoptions(req, res) {
        // Get user
        const token = req.headers.authorization;
        const user = getTokenData(token).data; // user id

        // Get all my pets from collection
        const myAdoptions = await Pet.find({ newOwner: user }).lean();

        // Response
        res.status(200).json({ message: messages.myAdoptions, myAdoptions });
    }
}

// Export
module.exports = PetController;
