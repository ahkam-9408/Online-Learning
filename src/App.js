import logo from './logo.svg';
import React, {Component} from 'react';
import './App.css';
import AdminHome from "./Components/Admin/AdminHome";

import {Switch, Route} from 'react-router-dom';
import AddStudent from "./Components/Admin/AddStudent";
import AddLecturer from "./Components/Admin/AddLecturer";

class App extends Component {

    constructor() {
        super();
    }

    render() {
        return <div className="App">
            <div className={"container"}>
                <div className={'row my-3'}>
                    <div className={'col'}>
                        Hi
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col'}>
                        <Switch>
                            <Route exact path={'/'} component={AdminHome}/>
                            <Route path={'/admin'} exact component={AdminHome}/>
                            <Route path={'/admin-add-student'} exact component={AddStudent}/>
                            <Route path={'/admin-add-lecturer'} exact component={AddLecturer}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default App;
