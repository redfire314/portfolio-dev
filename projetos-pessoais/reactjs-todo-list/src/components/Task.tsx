import { useState } from 'react';
import styled from 'styled-components';

const TaskContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5em;
    padding-bottom: 0.5em;
    border-bottom: 1px solid #ffff99;
`;

const Title = styled.h3`
    &.done {
        text-decoration: line-through;
        font-style: italic;
        color: #fff;
    }
`;

const Button = styled.button`
    border: 1px solid #000;
    padding: 0.25em 1em;
    margin-left: 0.5em;

    &:hover {
        cursor: pointer;
    }
`;

interface Iprops {
    text: string;
    removeAction: Function;
}

function Task({ text, removeAction }: Iprops) {
    const [isDone, setIsDone] = useState<boolean>(false);

    const handleToggleClass = () => {
        setIsDone((state) => !state);
    };

    return (
        <TaskContainer>
            <div>
                <Title className={isDone ? 'done' : undefined}>{text}</Title>
            </div>
            <div>
                <Button onClick={handleToggleClass}>{isDone ? 'A fazer' : 'Finalizar'}</Button>
                <Button onClick={() => removeAction(text)}>Remover</Button>
            </div>
        </TaskContainer>
    );
}

export default Task;
