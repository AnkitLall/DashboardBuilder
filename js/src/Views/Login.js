import React, { Component } from 'react';
import Form from './../Components/Form';
import './../css/Form.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className={'form-container'}>
                <Form 
                    type={'login'}
                />
            </div>
        );
    }
}

export default Login;