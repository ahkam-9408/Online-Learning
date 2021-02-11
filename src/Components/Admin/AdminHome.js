import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class AdminHome extends Component{
    constructor() {
        super();

        this.state = {
            username : "",
            password : ""
        }

        this.createAdmin = this.createAdmin.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        this.props.changeNav("admin")
        this.props.changeLog(false);

        sessionStorage.removeItem('loggedLecturer')
        sessionStorage.removeItem('loggedStudent')

        axios.get('http://localhost:4000/admin/')
            .then(res => {
                if(res.data.length == 0){
                    this.createAdmin()
                }
            })

        console.log(this.state.username)
    }

    createAdmin() {
        const adminObject = {
            username: "admin",
            password: "admin123"
        }

        axios.post('http://localhost:4000/admin/create-admin',adminObject)
    }

    onSubmit(e) {
        e.preventDefault();

        const {username,password} = this.state;

        if(username === "" || password === ""){
            alert("All fields are required")
        }else {
            axios.get('http://localhost:4000/admin/get-admin/' + username + '/' + password)
                .then(res => {
                    if(res.data[0].username === username) {
                        alert("Login Successful");
                        sessionStorage.setItem('loggedAdmin',JSON.stringify(res.data[0]._id));
                        this.props.history.push('/admin-add-student');
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
                    <h3 className={'text-center mb-5'}>Admin Login</h3>
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
                        <div className="form-group text-center">
                            {/*<Link to={'/signup'}>*/}
                            {/*    Create an account!!!*/}
                            {/*</Link>*/}
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

export default AdminHome;