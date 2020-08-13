import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                <div className={'home-intro-container'}>
                    <div className={'home-intro-image'}>

                    </div>
                    <div className={'home-intro-description'}>
                        <div className={'description-text'}>
                            Text
                        </div>
                        <div className={'getting-started-container'}>
                            <Link to='/Projects'>
                                <button className={'button-colored'}>{'Get Started >'}</button>
                            </Link>
                        </div>
                    </div>                    
                </div>
                <div className={'template-display-container'}>

                </div>
            </div>
        )
    }
}

export default Home;