import React, { Component } from 'react';
import Form from './../Components/Form';

import './../css/Form.scss';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className={'form-container'}>
                <Form 
                    type={'register'}
                />
            </div>
        );
    }
}

export default Register;