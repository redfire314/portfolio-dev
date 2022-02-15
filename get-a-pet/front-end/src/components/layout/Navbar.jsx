// Dependencies
import { Link } from 'react-router-dom';

// Hooks
import useAuth from '../../hooks/useAuth';

// Assets
import logo from '../../assets/images/logo.png';
import style from './Navbar.module.css'

function Navbar() {
    const { checkAuth, logout } = useAuth();
    const token = checkAuth();
    const loggedOff = (
        <ul>
            <li>
                <Link to='/'>Pets</Link>
            </li>
            <li>
                <Link to='/cadastro'>Entrar/Cadastro</Link>
            </li>
        </ul>
    );
    const loggedIn = (
        <ul>
            <li>
                <Link to='/'>Pets</Link>
            </li>
            <li>
                <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li>
                <Link to='/meu-perfil'>Meu perfil</Link>
            </li>
            <li>
                <button onClick={logout}>Sair</button>
            </li>
        </ul>
    );

    return (
        <>
            <header>
                <nav className={style.navbar}>
                    <div>
                        <img src={logo} alt='Logo Adope um Pet' />
                    </div>
                    {token ? loggedIn : loggedOff}
                </nav>
            </header>
        </>
    );
}

export default Navbar;
