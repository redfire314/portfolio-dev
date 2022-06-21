import { Link } from "react-router-dom";

import Icon from "../../Icon";
import { YoutubeIcon, FacebookIcon, TwitterIcon, InstagramIcon } from "../../../assets/icons";
import { Container, Wrapper, Social, Links, Contact, Copy } from "./styles";

function Footer() {
    return (
        <Container>
            <Wrapper>
                <Social>
                    <li>
                        <a href="https://pt-br.facebook.com/" target="_blank">
                            <Icon size={2.4}>
                                <FacebookIcon />
                            </Icon>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/" target="_blank">
                            <Icon size={2.4}>
                                <InstagramIcon />
                            </Icon>
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/explore" target="_blank">
                            <Icon size={2.4}>
                                <TwitterIcon />
                            </Icon>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/" target="_blank">
                            <Icon size={2.4}>
                                <YoutubeIcon />
                            </Icon>
                        </a>
                    </li>
                </Social>
                <Links>
                    <li>
                        <Link to="#">Lorem, ipsum</Link>
                    </li>
                    <li>
                        <Link to="#">Dolor sit</Link>
                    </li>
                    <li>
                        <Link to="#">Amet consectetur</Link>
                    </li>
                    <li>
                        <Link to="#">Adipisicing elit</Link>
                    </li>
                    <li>
                        <Link to="#">Nostrum, eaque</Link>
                    </li>
                    <li>
                        <Link to="#">Sit recusandae</Link>
                    </li>
                    <li>
                        <Link to="#">Quibusdam provident</Link>
                    </li>
                    <li>
                        <Link to="#">Eius excepturi</Link>
                    </li>
                    <li>
                        <Link to="#">Laboriosam esse</Link>
                    </li>
                    <li>
                        <Link to="#">Ratione eveniet</Link>
                    </li>
                    <li>
                        <Link to="#">Neque rerum</Link>
                    </li>
                    <li>
                        <Link to="#">Ipsa tempora</Link>
                    </li>
                    <li>
                        <Link to="#">Culpa, mollitia</Link>
                    </li>
                    <li>
                        <Link to="#">Natus ipsam</Link>
                    </li>
                    <li>
                        <Link to="#">Reiciendis tempore</Link>
                    </li>
                    <li>
                        <Link to="#">Ex dolorem</Link>
                    </li>
                </Links>
                <Contact href="https://www.netflix.com" target="_blank">
                    Netflix
                </Contact>
                <Copy href="https://github.com/redfire314" target="_blank">
                    &copy; 2022 Netflix Clone by redfire314
                </Copy>
            </Wrapper>
        </Container>
    );
}

export default Footer;
