import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistCombineReducers } from 'redux-persist'; // these function functions will add persistance support to the reducers so that they  will update the state to persite storage whenever there is a change to the state
import storage from 'redux-persist/es/storage'; //give access to local storage on device
import { campsites } from './campsites';
import { comments } from './comments';
import { promotions } from './promotions';
import { partners } from './partners';
import { favorites } from './favorites';

const config = {
    key: 'root',
    storage,
    debug: true
}

export const ConfigureStore = () => {
    const store = createStore(
        //persistCombineReducers will update the state to local storage whenever the a reducer is used to update store
        persistCombineReducers(config, {
            campsites,
            comments,
            partners,
            promotions,
            favorites
        }),
        applyMiddleware(thunk)
    );

    const persistor = persistStore(store);//enabled the store to be peristed

    return {persistor,store};
}