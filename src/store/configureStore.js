import { createStore } from 'redux';
import RootReducer from '../reducers/RootReducer';

export default function configureStores(initialState){
    return createStore(
        RootReducer,
        initialState,
    )
}
