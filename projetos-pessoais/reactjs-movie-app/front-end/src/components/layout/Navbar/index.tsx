import { Link } from 'react-router-dom';
import Search from '../../Search';
import { NavbarStyled } from './styles';

const logo = require('../../../assets/images/logo.png');

function Navbar() {
    return (
        <NavbarStyled>
            <Link to='./'>
                <img src={logo} alt='Logo Movie App' width='64px' height='64px' />
            </Link>
            <Search />
        </NavbarStyled>
    );
}

export default Navbar;
