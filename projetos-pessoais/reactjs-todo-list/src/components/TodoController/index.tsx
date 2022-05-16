import { FormEvent, useState } from 'react';
import { Form } from './styles';

interface IProps {
    addTaskOnList: Function;
}

function Todo({ addTaskOnList }: IProps) {
    const [textValue, setTextValue] = useState<string>('');

    const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
        setTextValue(event.currentTarget.value);
    };

    const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTextValue('');
        addTaskOnList(textValue);
    };

    return (
        <Form onSubmit={handleOnSubmit}>
            <input type='text' value={textValue} onChange={handleOnChange} placeholder='O que você precisa fazer?' />
            <button type='submit'>Adicionar tarefa</button>
        </Form>
    );
}

export default Todo;
