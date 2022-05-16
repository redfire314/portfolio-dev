import { useState } from 'react';
import { TaskContainer } from './styles';

interface IProps {
    text: string;
    removeAction: Function;
}

function Task({ text, removeAction }: IProps) {
    const [isDone, setIsDone] = useState<boolean>(false);

    const handleToggleClass = () => {
        setIsDone((state) => !state);
    };

    return (
        <TaskContainer>
            <div className='text'>
                <h3 className={isDone ? 'done' : undefined}>{text}</h3>
            </div>
            <div className='actions'>
                <button onClick={handleToggleClass}>{isDone ? 'A fazer' : 'Finalizar'}</button>
                <button onClick={() => removeAction(text)}>Remover</button>
            </div>
        </TaskContainer>
    );
}

export default Task;
