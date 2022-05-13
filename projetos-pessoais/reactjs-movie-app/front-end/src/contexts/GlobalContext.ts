import { createContext } from 'react';

export type GlobalState = {
    query: {
        get: QueryType;
        set: Function;
    };
    search: {
        get: string;
        set: Function;
    };
    page: {
        get: number;
        set: Function;
    };
};

export enum QueryType {
    popular,
    top_rated,
    upcoming,
    search
}

export default createContext<GlobalState | null>(null);
