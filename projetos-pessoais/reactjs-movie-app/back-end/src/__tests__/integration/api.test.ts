import request from 'supertest';
import app from '../../app';

describe('Requests', () => {
    describe('404', () => {
        it('should fail when request are incomplete', async () => {
            const response = await request(app).get('/api/movie/hello_world');

            expect(response.statusCode).toBe(404);
        });
    });

    describe('Popular movies', () => {
        it('should fail when requested with invalid page number', async () => {
            const response = await request(app).get('/api/movie/popular/-1');

            expect(response.statusCode).toBe(502);
        });

        it('should return popular movies from page 1', async () => {
            const response = await request(app).get('/api/movie/popular/1');

            expect(response.statusCode).toBe(200);
        });
    });

    describe('Top rated movies', () => {
        it('should fail when requested with invalid page number', async () => {
            const response = await request(app).get('/api/movie/top_rated/-1');

            expect(response.statusCode).toBe(502);
        });

        it('should return top rated movies from page 2', async () => {
            const response = await request(app).get('/api/movie/top_rated/2');

            expect(response.statusCode).toBe(200);
        });
    });

    describe('Upcoming movies', () => {
        it('should fail when requested with invalid page number', async () => {
            const response = await request(app).get('/api/movie/upcoming/-1');

            expect(response.statusCode).toBe(502);
        });

        it('should return upcoming movies from page 3', async () => {
            const response = await request(app).get('/api/movie/upcoming/3');

            expect(response.statusCode).toBe(200);
        });
    });

    describe('Search by name movies', () => {
        it('should fail when requested with invalid page number and name', async () => {
            const response = await request(app).get('/api/movie/search/foo bar/-1');

            expect(response.statusCode).toBe(502);
        });

        it('should return searched movies by name from page 1', async () => {
            const response = await request(app).get('/api/movie/search/vingadores/1');

            expect(response.statusCode).toBe(200);
        });
    });

    describe('Search by id movie', () => {
        it('should fail when requested with invalid id number', async () => {
            const response = await request(app).get('/api/movie/id/abc');

            expect(response.statusCode).toBe(502);
        });

        it('should return searched movie by id', async () => {
            const response = await request(app).get('/api/movie/id/24428');

            expect(response.statusCode).toBe(200);
        });
    });
});
