import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

class AddStudent extends Component{
    constructor() {
        super();

        this.state = {
            stId : "",
            name : "",
            username : "",
            password : "",
            confirmPassword : ""
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChangeHandler(e) {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const {stId,name,username,password,confirmPassword} = this.state;

        if(name==="" || stId==="" || username==="" || password==="") {
            alert("All field are required");
        }else if(username.length < 6) {
            alert("Username minimum length = 6")
        }else if(password.length < 8){
            alert("Password minimum length = 8")
        } else if(password !== confirmPassword){
            alert("Passwords does not match")
        } else{
            axios.get('http://localhost:4000/student/get-student/' + username)
                .then(res => {
                    if(res.data[0].username === username) {
                        alert("Username already used")
                    }
                }).catch(() => {

                const userObject = {
                    stId: stId,
                    name: name,
                    username: username,
                    password: password
                };

                axios.post('http://localhost:4000/student/create-student', userObject)
                    .then(res => alert("Successfully Registered"));

                this.setState({stId: '', name: '', username: '', password: '', confirmPassword: ''});

                // this.props.history.push('/');
            })
        }
    }

    render() {
        return (
            <div className={' col-10 mx-auto col-md-5 mt-4'}>
                <div className={'card card-body my-3'}>
                    <h3 className={'text-center mb-5'}>Add Student</h3>
                    <form className={'signup text-left'} onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Student ID</label>
                            <input type="text" className="form-control" placeholder="Student ID" value={this.state.stId} name={'stId'} onChange={this.onChangeHandler}/>
                        </div>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" className="form-control" placeholder="Full Name" value={this.state.name} name={'name'} onChange={this.onChangeHandler}/>
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" id={"username"} placeholder="Username" value={this.state.username} name={'username'} onChange={this.onChangeHandler}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" id={"password"} placeholder="Password" value={this.state.password} name={'password'} onChange={this.onChangeHandler}/>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" id={"confirmPassword"} placeholder="Confirm Password" value={this.state.confirmPassword} name={'confirmPassword'} onChange={this.onChangeHandler}/>
                        </div>
                        <button type="submit" className="form-control btn btn-primary my-3">Add Student</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddStudent;