import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    setUser,
} from './../Slices/AuthSlice';
import {
    validator
} from './../Utils/FormValidators';
import {
    login,
    register
} from './../Utils/ApiService';
import history from './../Utils/History';
import './../css/Form.scss';

function Form(props) {
    let [name,setName] = useState('');
    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');
    let [passwordConfirm,setPasswordConfirm] = useState('');
    let [errorMsgs,setErrorMsgs] = useState({});

    const dispatch = useDispatch();

    const onSubmit = (event) => {        
        event.preventDefault();
        if(props.type === 'register') {
            let userInfo = {
                name: name,
                email: email,
                password: password,
                passwordConfirm: passwordConfirm
            }
            let [errors,isValid] = validator(userInfo,props.type);
            setErrorMsgs(errors);

            if(isValid) {
                register(userInfo)
                    .then(user => {
                        dispatch(setUser({
                            name: user.data.name,
                            email: user.data.email
                        }));
                        history.push("/Projects");
                    })
                    .catch(err => {
                        let errorMsg = {
                            emailExists: err.response.data.errorMsg
                        }

                        setErrorMsgs(errorMsg);
                    })
            }            
        }else if(props.type === 'login') {
            let userInfo = {
                email: email,
                password: password
            }
            let [errors,isValid] = validator(userInfo,props.type);
            setErrorMsgs(errors);

            if(isValid) {
                login(userInfo)
                    .then(user => {
                        history.push("/Projects");
                        dispatch(setUser({
                            name: user.data.name,
                            email: user.data.email
                        }));
                    })
                    .catch(err => {
                        let errorMsg = {
                            emailExists: err.response.data.errorMsg
                        }

                        setErrorMsgs(errorMsg);
                    })
            } 
        }
    }

    return (
        <div className={'form-panel'}>
            <form onSubmit={onSubmit}>
                <div className={'input-blocks-container'}>
                    {
                        props.type==='register' &&
                        <div className={'input-block'}>
                            <label className={'header-text'}>Name:</label>
                            <input 
                                type='text'
                                id='name'
                                onChange={(e) => {setName(e.target.value)}}
                            />
                            <label className={'error-text'}>{errorMsgs.name}</label>
                        </div>                        
                    }  

                    <div className={'input-block'}>
                        <label className={'header-text'}>Email:</label>
                        <input 
                            type='text'
                            id='email'  
                            onChange={(e) => {setEmail(e.target.value)}}                     
                        />
                        <label className={'error-text'}>{errorMsgs.email}</label>
                    </div>  

                    <div className={'input-block'}>
                        <label className={'header-text'}>Password:</label>
                        <input 
                            type='text'
                            id='password'   
                            onChange={(e) => {setPassword(e.target.value)}}                     
                        />
                        <label className={'error-text'}>{errorMsgs.password}</label>
                    </div>   
                    {
                        props.type==='register' &&
                        <div className={'input-block'}>
                            <label className={'header-text'}>Confirm Password:</label>
                            <input 
                                type='text'
                                id='passwordConfirm' 
                                onChange={(e) => {setPasswordConfirm(e.target.value)}}                       
                            />
                            <label className={'error-text'}>{errorMsgs.passwordConfirm}</label>
                        </div>
                    }  
                    <div>
                        <label className={'error-text'}>
                            {
                            errorMsgs.emailExists
                            }   
                        </label>
                    </div> 
                    <div className={'submit-button-container'}>
                        <button 
                            className={'button-colored'}
                            type='submit'                        
                        >
                        Submit
                        </button>
                    </div>                                     
                </div>
            </form>
        </div>
    )
}

export default Form;