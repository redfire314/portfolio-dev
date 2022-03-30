import { memo } from 'react';
import styled from 'styled-components';

interface Iprops {
    action: () => void;
}

const Button = styled.button`
    padding: 0.33em 1em;
    font-size: 1em;
    border: 2px solid transparent;
    border-radius: 12px;

    &:hover {
        cursor: pointer;
    }
`;

function ActionBtn(props: Iprops) {
    return (
        <Button onClick={props.action} data-testid='actionbtn'>
            Girar moeda
        </Button>
    );
}

export default memo(ActionBtn);
