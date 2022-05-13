import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalContext, { QueryType, GlobalState } from './contexts/GlobalContext';
import Global from './assets/themes/default';
import Navbar from './components/layout/Navbar';
import Container from './components/layout/Container';
import Home from './pages/Home';
import Movie from './pages/Movie';
import NotFound from './pages/NotFound';

function App() {
    const [queryState, setQueryState] = useState<QueryType>(QueryType.popular);
    const [searchName, setSearchName] = useState<string>('');
    const [pageNumber, setPageNumber] = useState<number>(1);
    const contextValue: GlobalState = {
        query: {
            get: queryState,
            set: setQueryState
        },
        search: {
            get: searchName,
            set: setSearchName
        },
        page: {
            get: pageNumber,
            set: setPageNumber
        }
    };

    return (
        <BrowserRouter>
            <GlobalContext.Provider value={contextValue}>
                <Global />
                <Container>
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/filme/:id' element={<Movie />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </Container>
            </GlobalContext.Provider>
        </BrowserRouter>
    );
}

export default App;
