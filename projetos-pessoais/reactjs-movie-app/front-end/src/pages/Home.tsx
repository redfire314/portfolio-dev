import { useState, useEffect, useContext } from 'react';
import GlobalContext, { QueryType } from '../contexts/GlobalContext';
import { fetchPopular, fetchTopRated, fetchUpcoming, fetchSearch } from '../utils/fetch';
import MovieBoxContainer from '../components/layout/MovieBoxContainer';
import MovieBox from '../components/MovieBox';
import Pagination from '../components/Pagination';

function Home() {
    const [movies, setMovies] = useState([{}]);
    const [pages, setPages] = useState<number>(1); // Total de páginas
    const globalContext = useContext(GlobalContext);

    useEffect(() => {
        (async () => {
            let data;

            switch (globalContext?.query.get) {
                case QueryType.popular:
                    data = await fetchPopular(globalContext?.page.get);
                    break;
                case QueryType.top_rated:
                    data = await fetchTopRated(globalContext?.page.get);
                    break;
                case QueryType.upcoming:
                    data = await fetchUpcoming(globalContext?.page.get);
                    break;
                case QueryType.search:
                    data = await fetchSearch(globalContext.search.get, globalContext.page.get);
                    break;
            }

            setPages(data.movies.total_pages);
            setMovies(data.movies.results);
        })();
    }, [globalContext?.query.get, globalContext?.page.get]);

    return (
        <>
            <Pagination totalPages={pages} />
            <MovieBoxContainer>
                {movies.map((movie: any) => {
                    return <MovieBox key={movie.id} poster={movie.poster_path || movie.backdrop_path} title={movie.title} id={movie.id} />;
                })}
            </MovieBoxContainer>
            <Pagination totalPages={pages} />
        </>
    );
}

export default Home;
