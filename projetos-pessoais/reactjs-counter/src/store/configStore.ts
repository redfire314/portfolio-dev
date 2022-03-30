import { configureStore } from '@reduxjs/toolkit';

import counterSlice from './modules/counter';

export default configureStore({
    reducer: {
        counter: counterSlice
    }
});
