import { Request, Response } from 'express';
import { fetchPopular, fetchTopRated, fetchUpcoming, fetchByName, fetchById } from '../utils/fetch';

class MovieController {
    static async getPopular(req: Request, res: Response) {
        const page = parseInt(req.params.page);

        fetchPopular(page)
            .then((response) => {
                res.status(200).json({ message: 'OK', movies: response.data });
            })
            .catch((error) => {
                return res.status(502).json({ message: 'Bad Gateway' });
            });
    }

    static async getTopRated(req: Request, res: Response) {
        const page = parseInt(req.params.page);

        fetchTopRated(page)
            .then((response) => {
                res.status(200).json({ message: 'OK', movies: response.data });
            })
            .catch((error) => {
                return res.status(502).json({ message: 'Bad Gateway' });
            });
    }

    static async getUpcoming(req: Request, res: Response) {
        const page = parseInt(req.params.page);

        fetchUpcoming(page)
            .then((response) => {
                res.status(200).json({ message: 'OK', movies: response.data });
            })
            .catch((error) => {
                return res.status(502).json({ message: 'Bad Gateway' });
            });
    }

    static async getMovieByName(req: Request, res: Response) {
        const name = req.params.name;
        const page = parseInt(req.params.page);

        fetchByName(name, page)
            .then((response) => {
                res.status(200).json({ message: 'OK', movies: response.data });
            })
            .catch((error) => {
                return res.status(502).json({ message: 'Bad Gateway' });
            });
    }

    static async getMovieById(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        fetchById(id)
            .then((response) => {
                res.status(200).json({ message: 'OK', movies: response.data });
            })
            .catch((error) => {
                return res.status(502).json({ message: 'Bad Gateway' });
            });
    }
}

export default MovieController;
