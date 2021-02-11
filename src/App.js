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
            naviStatus:"student"
        }

        this.changeNav = this.changeNav.bind(this);
    }

    changeNav(status) {
        this.setState({naviStatus:status})
    }

    render() {
        return <div className="App">
            <div className={"container"}>
                <div className={'row my-3'}>
                    <div className={'col'}>
                        <NavigationBar naviStatus={this.state.naviStatus}/>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col'}>
                        <Switch>
                            <Route exact path={'/'} render={props => <StudentHome {...props} changeNav={this.changeNav}/>}/>
                            <Route path={'/admin'} exact render={props => <AdminHome {...props} changeNav={this.changeNav}/>}/>
                            <Route path={'/admin-add-student'} exact component={AddStudent}/>
                            <Route path={'/admin-add-lecturer'} exact component={AddLecturer}/>
                            <Route path={'/lecturer'} exact render={props => <LecturerHome {...props} changeNav={this.changeNav}/>}/>
                            <Route path={'/lecturer-add-documents'} exact component={AddDocument}/>
                            <Route path={'/student-view-lecture'} exact component={ViewLectures}/>
                            <Route path={'/student-view-document'} exact component={ViewDocument}/>
                            <Route path={'/admin-delete'} exact component={Delete}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default App;
