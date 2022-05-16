import { memo } from 'react';
import { Button } from './styles';

interface IProps {
    action: () => void;
}

function ActionBtn(props: IProps) {
    return (
        <Button onClick={props.action} data-testid='actionbtn'>
            Girar moeda
        </Button>
    );
}

export default memo(ActionBtn);
