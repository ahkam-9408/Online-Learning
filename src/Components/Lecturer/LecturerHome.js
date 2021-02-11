import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class LecturerHome extends Component{
    constructor() {
        super();

        this.state = {
            username : "",
            password : ""
        }

        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        this.props.changeNav("lecturer")
        this.props.changeLog(false);
        sessionStorage.removeItem('loggedStudent')
        sessionStorage.removeItem('loggedAdmin')
    }

    onSubmit(e) {
        e.preventDefault();

        const {username,password} = this.state;

        if(username === "" || password === ""){
            alert("All fields are required")
        }else {
            axios.get('http://localhost:4000/lecturer/get-lecturer/' + username + '/' + password)
                .then(res => {
                    if(res.data[0].username === username) {
                        alert("Login Successful");
                        sessionStorage.setItem('loggedLecturer',JSON.stringify(res.data[0]._id));
                        this.props.history.push('/lecturer-add-documents');
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert("Username or password wrong");
                })
        }
    }

    onChangeHandler(e) {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render() {
        return (
            <div className={'col-10 mx-auto col-md-4'}>
                <div className={'card card-body'}>
                    <h3 className={'text-center mb-5'}>Lecturer Login</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Username" value={this.state.username} name={'username'} onChange={this.onChangeHandler}/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" value={this.state.password} name={'password'} onChange={this.onChangeHandler}/>
                        </div>
                        <div className={'form-group'}>
                            <button type="submit" className="btn btn-primary form-control">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

export default LecturerHome;