import { FormEvent, useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
    margin: 1em 0;
`;

const InputText = styled.input`
    width: 70%;
    height: 24px;
`;

const Button = styled.button`
    width: 30%;
    height: 24px;
    border: 1px solid #000;
    padding: 0.25em 1em;

    &:hover {
        cursor: pointer;
    }
`;

interface Iprops {
    addTaskOnList: Function;
}

function Todo({ addTaskOnList }: Iprops) {
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
        <>
            <Form onSubmit={handleOnSubmit}>
                <InputText type='text' value={textValue} onChange={handleOnChange} />
                <Button type='submit'>Adicionar tarefa</Button>
            </Form>
        </>
    );
}

export default Todo;
