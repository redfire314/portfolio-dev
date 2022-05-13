import app from './app';

const port = process.env.APP_PORT || '3000';

app.listen(port, () => {
    console.log(`Express running on port ${port}`);
});
