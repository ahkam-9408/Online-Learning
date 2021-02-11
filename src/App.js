import logo from './logo.svg';
import React, {Component} from 'react';
import './App.css';
import AdminHome from "./Components/Admin/AdminHome";

import {Switch, Route} from 'react-router-dom';
import AddStudent from "./Components/Admin/AddStudent";
import AddLecturer from "./Components/Admin/AddLecturer";
import LecturerHome from "./Components/Lecturer/LecturerHome";
import StudentHome from "./Components/Student/StudentHome";
import AddDocument from "./Components/Lecturer/AddDocument";
import ViewLectures from "./Components/Student/ViewLectures";
import ViewDocument from "./Components/Student/ViewDocument";
import NavigationBar from "./Components/NavigationBar";
import Delete from "./Components/Admin/Delete";

class App extends Component {

    constructor() {
        super();

        this.state = {
            naviStatus:"student",
            logStatus:false
        }

        this.changeNav = this.changeNav.bind(this);
        this.changeLog = this.changeLog.bind(this);
    }

    changeNav(status) {
        this.setState({naviStatus:status})
    }

    changeLog(status) {
        this.setState({logStatus:status})
    }

    render() {
        return <div className="App">
            <div className={"container"}>
                <div className={'row my-3'}>
                    <div className={'col'}>
                        <NavigationBar naviStatus={this.state.naviStatus} logStatus={this.state.logStatus}/>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col'}>
                        <Switch>
                            <Route exact path={'/'} render={props => <StudentHome {...props} changeNav={this.changeNav} changeLog={this.changeLog}/>}/>
                            <Route path={'/admin'} exact render={props => <AdminHome {...props} changeNav={this.changeNav} changeLog={this.changeLog}/>}/>
                            <Route path={'/admin-add-student'} exact render={props => <AddStudent {...props} changeLog={this.changeLog}/>}/>
                            <Route path={'/admin-add-lecturer'} exact render={props => <AddLecturer {...props} changeLog={this.changeLog}/>}/>
                            <Route path={'/lecturer'} exact render={props => <LecturerHome {...props} changeNav={this.changeNav} changeLog={this.changeLog}/>}/>
                            <Route path={'/lecturer-add-documents'} exact render={props => <AddDocument {...props} changeLog={this.changeLog}/>}/>
                            <Route path={'/student-view-lecture'} exact render={props => <ViewLectures {...props} changeLog={this.changeLog}/>}/>
                            <Route path={'/student-view-document'} exact render={props => <ViewLectures {...props} changeLog={this.changeLog}/>}/>
                            <Route path={'/admin-delete'} exact render={props => <Delete {...props} changeLog={this.changeLog}/>}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default App;
