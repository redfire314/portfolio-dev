import { useContext } from 'react';
import GlobalContext from '../../contexts/GlobalContext';
import { ButtonStyled, PaginationContainerStyled } from './styles';

type propsType = {
    totalPages: number;
};

function Pagination(props: propsType) {
    const globalContext = useContext(GlobalContext);
    const currPage = globalContext?.page.get || 1;
    const min = currPage - 5;
    const max = currPage + 5;
    let data = [];

    for (let i = 1; i < 10; i++) {
        if (min > 0 && max <= props.totalPages) {
            if (currPage === i + min) {
                data.push(
                    <ButtonStyled onClick={() => globalContext?.page.set(i + min)} current>
                        {i + min}
                    </ButtonStyled>
                );
            } else {
                data.push(<ButtonStyled onClick={() => globalContext?.page.set(i + min)}>{i + min}</ButtonStyled>);
            }
        } else if (i <= props.totalPages) {
            if (currPage === i) {
                data.push(
                    <ButtonStyled onClick={() => globalContext?.page.set(i)} current>
                        {i}
                    </ButtonStyled>
                );
            } else {
                data.push(<ButtonStyled onClick={() => globalContext?.page.set(i)}>{i}</ButtonStyled>);
            }
        }
    }

    return <PaginationContainerStyled>{data}</PaginationContainerStyled>;
}

export default Pagination;
