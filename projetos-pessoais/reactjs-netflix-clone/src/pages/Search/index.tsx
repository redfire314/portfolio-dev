import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

import { IMovie } from "../../interfaces/movie";
import { getMoviesByName } from "../../services/api";
import MovieBox from "../../components/MovieBox";
import Icon from "../../components/Icon";
import { SearchIcon } from "../../assets/icons";
import { SearchOptions, MovieBoxContainer } from "./styles";

function Search() {
    const [movies, setMovies] = useState<Array<IMovie>>();
    const [value, setValue] = useState("");
    const [params, setParams] = useSearchParams();

    useEffect(() => {
        const fetchMovieDataAsync = async () => {
            if (!params.get("q")) return;

            const response = await getMoviesByName(params.get("q") || "");

            setMovies(response.results);
        };

        fetchMovieDataAsync();
    }, [params]);

    return (
        <>
            <SearchOptions>
                <input type="text" onChange={(event) => setValue(event.target.value)} value={value} maxLength={255} />
                <Icon size={3.2}>
                    <SearchIcon onClick={() => setParams({ q: value })} />
                </Icon>
            </SearchOptions>
            <MovieBoxContainer>
                {movies &&
                    movies.map((movie, index) => {
                        return (
                            <Link key={index} to={`/movie/${movie.id}`}>
                                <MovieBox movie={movie} poster={true} />
                            </Link>
                        );
                    })}
            </MovieBoxContainer>
        </>
    );
}

export default Search;
