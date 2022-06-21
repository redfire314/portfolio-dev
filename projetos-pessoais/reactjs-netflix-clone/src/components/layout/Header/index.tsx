import { Link } from "react-router-dom";

import Icon from "../../Icon";
import logo from "../../../logo.svg";
import avatar from "../../../assets/images/avatar.webp";
import { SearchIcon, GiftBoxIcon, NotificationBellIcon, DownArrowIcon } from "../../../assets/icons";
import { Container, Item, Profile } from "./styles";

function Header() {
    return (
        <Container>
            <nav>
                <Link to="/">
                    <img src={logo} alt="Netflix logo" />
                </Link>
                <ul>
                    <Item>
                        <Link to="/">Início</Link>
                    </Item>
                    <Item disabled>
                        <Link to="#">Séries</Link>
                    </Item>
                    <Item disabled>
                        <Link to="#">Filmes</Link>
                    </Item>
                    <Item disabled>
                        <Link to="#">Originais</Link>
                    </Item>
                    <Item disabled>
                        <Link to="#">Novidades</Link>
                    </Item>
                    <Item disabled>
                        <Link to="#">Minha lista</Link>
                    </Item>
                </ul>
            </nav>
            <ul>
                <Item>
                    <Link to="/search">
                        <Icon size={2}>
                            <SearchIcon />
                        </Icon>
                    </Link>
                </Item>
                <Item disabled>
                    <Link to="#">
                        <Icon size={2}>
                            <GiftBoxIcon />
                        </Icon>
                    </Link>
                </Item>
                <Item disabled>
                    <Link to="#">
                        <Icon size={2}>
                            <NotificationBellIcon />
                        </Icon>
                    </Link>
                </Item>
                <Item disabled>
                    <Profile>
                        <img src={avatar} alt="Profile image" />
                        <Icon size={1.4}>
                            <DownArrowIcon />
                        </Icon>
                    </Profile>
                </Item>
            </ul>
        </Container>
    );
}

export default Header;
