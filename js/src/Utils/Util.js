import { setFiles } from '../Slices/FilesSlice';
import { updateFileConfig } from './ApiService';
import { setFileConfig,setOriginalConfig } from '../Slices/FileConfigSlice';

export const saveConfig = (fileSelected,filesList,projectDetails,currentUser,fileConfig,dispatch) => {
    let files = [];
    let config = {...fileConfig};      
    
    let newConfig = {
        fileConfig: config,
        fileName: fileSelected[0],
        projectName: projectDetails.data.projectName,
        email: currentUser.email
    }

    updateFileConfig(newConfig)
        .then(() => {
            console.log('changes saved successfully!!');
            dispatch(setFileConfig(config));
            dispatch(setOriginalConfig(config));
        })
        .catch(err => {
            console.log(err);
        })
}