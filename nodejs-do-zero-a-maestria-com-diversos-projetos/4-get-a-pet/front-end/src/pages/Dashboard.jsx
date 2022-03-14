// Dependencies
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Hooks
import usePet from '../hooks/usePet';

// Components
import PetDashboard from '../components/PetDashboard';

// Assets
import style from './Dashboard.module.css'

function Dashboard() {
    const [myPets, setMyPets] = useState([]);
    const [myAdoptions, setMyAdoptions] = useState([]);
    const { getMyPets, getMyAdoptions } = usePet();

    useEffect(() => {
        getMyPets().then((response) => setMyPets(response.data.myPets));
        getMyAdoptions().then((response) =>
            setMyAdoptions(response.data.myAdoptions)
        );
    }, []);

    const myPetsComponents = myPets.map((pet, index) => (
        <PetDashboard
            key={index}
            id={pet._id}
            image={pet.images[0]}
            name={pet.name}
            breed={pet.breed}
            color={pet.color}
            age={pet.age}
            pendingOwners={pet.pendingOwners}
            newOwner={pet.newOwner}
        />
    ));
    const myAdoptionsComponents = myAdoptions.map((pet, index) => (
        <PetDashboard
            key={index}
            id={pet._id}
            image={pet.images[0]}
            name={pet.name}
            breed={pet.breed}
            color={pet.color}
            age={pet.age}
            pendingOwners={pet.pendingOwners}
            newOwner={pet.newOwner}
        />
    ));

    return (
        <>
            <h1>Dashboard</h1>
            <div className={style.action}>
                <Link to='/adicionar-pet'>Adicionar Pet</Link>
            </div>
            <h2>Meus pets</h2>
            {myPetsComponents}
            <h2>Minhas adoções</h2>
            {myAdoptionsComponents}
        </>
    );
}

export default Dashboard;
