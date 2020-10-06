import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import authReducer from './AuthSlice';
import showPopUpReducer from './PopUpSlice';
import projectPageReducer from './ProjectSlice';
import filesReducer from './FilesSlice';
import fileConfigReducer from './FileConfigSlice';
import { 
    projectListReducer
} from './listSlice';

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    blacklist:['projectListType','showPopUp','projectPage','files','config']
}

const rootReducer = combineReducers({
    user: authReducer,
    projectListType: projectListReducer,
    showPopUp: showPopUpReducer,
    projectPage: projectPageReducer,
    files: filesReducer,
    config: fileConfigReducer
});

export default persistReducer(rootPersistConfig, rootReducer);