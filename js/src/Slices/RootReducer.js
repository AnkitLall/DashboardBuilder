import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import authReducer from './AuthSlice';
import showPopUpReducer from './PopUpSlice';
import { 
    projectListReducer
} from './listSlice';

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    blacklist:['projectListType','showPopUp']
}

const rootReducer = combineReducers({
    user: authReducer,
    projectListType: projectListReducer,
    showPopUp: showPopUpReducer
});

export default persistReducer(rootPersistConfig, rootReducer);