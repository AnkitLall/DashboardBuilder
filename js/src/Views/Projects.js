import React, { Component } from 'react';

import ProjectsSideBar from './../Components/ProjectsSideBar';
import ProjectLists from '../Components/ProjectList';

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className={'projects-container'}>
                <ProjectsSideBar />
                <ProjectLists />
            </div>
        )
    }
}

export default Projects;