import { Router, Request, Response } from 'express';
import MovieController from '../controllers/MovieController';

const router = Router();

router.get('/popular/:page', MovieController.getPopular);
router.get('/top_rated/:page', MovieController.getTopRated);
router.get('/upcoming/:page', MovieController.getUpcoming);
router.get('/search/:name/:page', MovieController.getMovieByName);
router.get('/id/:id', MovieController.getMovieById);

router.get('*', (req: Request, res: Response) => {
    res.status(404).json({ message: 'Invalid request' });
});

export default router;
