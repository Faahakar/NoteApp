import { configureStore } from '@reduxjs/toolkit';

// import all reducers
import notes from './slices';


// define store
const store = configureStore({
    reducer: {
        notes
    },
}
);

export default store;