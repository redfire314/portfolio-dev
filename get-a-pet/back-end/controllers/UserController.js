// Dependencies
const bcryptjs = require('bcryptjs');
const User = require('../models/UserModel');
const Pet = require('../models/PetModel');
const userFormValidator = require('../helpers/userFormValidator');
const loginFormValidator = require('../helpers/loginFormValidator');
const generateToken = require('../helpers/generateToken');
const getTokenData = require('../helpers/getTokenData');
const messages = require('../helpers/messages');

class UserController {
    // Creates the user on the collection
    static async create(req, res) {
        // Retrieves user form input
        const { name, email, phone, zip, password, password2 } = req.body;

        // Checks input with RegExp
        if (!userFormValidator(name, email, phone, zip, password, password2)) {
            res.status(400).json({ message: messages.badRequest });
            return;
        }

        // Checks if the email are busy
        const userExists = await User.findOne({ email }).select('email');
        if (userExists) {
            res.status(200).json({ message: messages.emailBusy });
            return;
        }

        // Encrypt password
        const salt = bcryptjs.genSaltSync();
        const hashedPass = bcryptjs.hashSync(password, salt);

        // Create user
        const user = new User({
            name,
            email,
            phone,
            zipCode: zip,
            password: hashedPass
        });
        await user.save();

        // Generate token
        const token = generateToken({ data: user.id }, '3h');

        // Response
        res.status(200).json({ message: messages.userCreated, token });
    }

    // Checks if the user exists and returns a token
    static async login(req, res) {
        // Retrieves login form input
        const { email, password } = req.body;

        // Checks input with RegExp
        if (!loginFormValidator(email, password)) {
            res.status(400).json({ message: messages.badRequest });
            return;
        }

        // Finds the user by email
        const user = await User.findOne({ email });
        if (user) {
            // If user are found, compare the given password with the hashed password
            const isSamePass = bcryptjs.compareSync(password, user.password);
            if (!isSamePass) {
                res.status(200).json({ message: messages.userNotFound });
                return;
            }
        } else {
            res.status(200).json({ message: messages.userNotFound });
            return;
        }

        // Generate token
        const token = generateToken({ data: user.id }, '3h');

        // Response
        res.status(200).json({ message: messages.userLoggedIn, token });
    }

    // Updates the user in database
    static async update(req, res) {
        // Retrieves user form input
        const { name, email, phone, zip, password, password2 } = req.body;

        // Checks input with RegExp
        if (!userFormValidator(name, email, phone, zip, password, password2)) {
            res.status(400).json({ message: messages.badRequest });
            return;
        }

        // Get user token
        const token = req.headers.authorization;
        const data = getTokenData(token).data; // user id

        // Checks if the email exists and it's id is different from token
        const user = await User.findOne({ email });
        if (user && user.id !== data) {
            res.status(200).json({ message: messages.emailBusy });
            return;
        }

        // Encrypt password
        const salt = bcryptjs.genSaltSync();
        const hashedPass = bcryptjs.hashSync(password, salt);

        // Update user
        await User.updateOne(
            { id: data },
            {
                name,
                email,
                phone,
                zipCode: zip,
                password: hashedPass
            }
        );

        // Response
        res.status(200).json({ message: messages.userUpdated });
    }

    // Gets pets that are adopted by the user
    static async getPetsAdopted(req, res) {
        // Get user
        const token = req.headers.authorization;
        const user = getTokenData(token).data; // user id

        // Get adopted pets
        const petsAdopted = await Pet.find({ newOwner: user })
            .select('name breed color age images')
            .lean();

        // Response
        res.status(200).json({ messages: messages.usersAdopted, petsAdopted });
    }

    // Get user pets from collection
    static async getUserPets(req, res) {
        // Get user
        const token = req.headers.authorization;
        const user = getTokenData(token).data; // user id

        // Get user pets
        const pets = await Pet.find({ owner: user })
            .select('name breed color age images pendingOwners newOwner')
            .lean();

        // Response
        res.status(200).json({ messages: messages.usersPet, pets });
    }

    // Get user info for update form
    static async getUserInfo(req, res) {
        // Get user
        const token = req.headers.authorization;
        const user = getTokenData(token).data; // user id

        // Get user from collection
        const userDb = await User.findById(user)
            .select('-_id name email phone zipCode')
            .lean();

        // Response
        res.status(200).json({ message: messages.userData, ...userDb });
    }
}

// Export
module.exports = UserController;
