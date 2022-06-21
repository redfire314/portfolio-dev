import { Link } from "react-router-dom";

import { Container, Info } from "./styles";

function NotFound() {
    return (
        <Container>
            <Info>
                <h1>Você se perdeu?</h1>
                <p>Infelizmente, não localizamos essa página. Você encontra muitos outros títulos na página inicial.</p>
                <Link to="/">
                    <button>Página inicial da Netflix</button>
                </Link>
                <span>
                    Código de erro <strong>NSES-404</strong>
                </span>
            </Info>
        </Container>
    );
}

export default NotFound;
