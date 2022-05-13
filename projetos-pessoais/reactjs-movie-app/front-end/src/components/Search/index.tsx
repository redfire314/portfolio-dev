import { useContext } from 'react';
import GlobalContext, { QueryType } from '../../contexts/GlobalContext';
import { ButtonStyled, InputStyled } from './styles';

const search = require('../../assets/images/search.png');

function Search() {
    const globalContext = useContext(GlobalContext);
    const handleOnClick = (query: QueryType) => {
        globalContext?.query.set(query);
        globalContext?.page.set(1);
    };

    return (
        <div>
            <ButtonStyled onClick={() => handleOnClick(QueryType.popular)}>Popular</ButtonStyled>
            <ButtonStyled onClick={() => handleOnClick(QueryType.top_rated)}>Mais vistos</ButtonStyled>
            <ButtonStyled onClick={() => handleOnClick(QueryType.upcoming)}>Lançamentos</ButtonStyled>
            <InputStyled type='text' value={globalContext?.search.get} onChange={(event) => globalContext?.search.set(event.target.value)} placeholder='Pesquisa..' />
            <ButtonStyled onClick={() => handleOnClick(QueryType.search)}>
                <img src={search} alt='Procurar' />
            </ButtonStyled>
        </div>
    );
}

export default Search;
