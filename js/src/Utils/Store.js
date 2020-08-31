import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';

import rootReducer from './../Slices/RootReducer';

export const store =  configureStore({
    reducer: rootReducer,
    middleware: []
});

export const persistor = persistStore(store);