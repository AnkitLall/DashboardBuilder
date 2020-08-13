import React, { Component } from 'react';
import './../css/Home.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className={'home-container'}>
                Home!
            </div>
        )
    }
}

export default Home;