import React, {Component} from 'react';
import {Link} from "react-router-dom";

class NavigationBar extends Component {
    render() {
        return (
            <div className={'navbar navbar-expand-lg navbar-light bg-dark'}>
                <Link to={'/'}>
                    <div className="navbar-brand text-light">Online Lecture Content</div>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={'collapse navbar-collapse'} id={'navbarSupportedContent'}>
                    {(this.props.naviStatus === "admin")?(
                        (this.props.logStatus === false)?null:(
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item mx-2">
                                    <Link to={'/admin-add-lecturer'}>
                                        <button type={'button'}
                                                className={'btn btn-text-light btn-outline-light my-2'}>
                                            <i className="fas fa-list"></i> Booking List
                                        </button>
                                    </Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to={'/admin-add-student'}>
                                        <button type={'button'}
                                                className={'btn btn-text-light btn-outline-light my-2'}>
                                            <i className="fas fa-list"></i> Booking List
                                        </button>
                                    </Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to={'/admin-delete'}>
                                        <button type={'button'}
                                                className={'btn btn-text-light btn-outline-light my-2'}>
                                            <i className="fas fa-list"></i> Booking List
                                        </button>
                                    </Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to={'/'}>
                                        <button type={'button'}
                                                className={'btn btn-text-light btn-outline-light my-2'}
                                                onClick={() => {
                                                    sessionStorage.removeItem('loggedLecturer')
                                                    window.location.reload();
                                                }}>
                                            <i className="fas fa-sign-out-alt"></i> Logout
                                        </button>
                                    </Link>
                                </li>
                            </ul>

                        )
                    ):null}
                    {(this.props.naviStatus === "student")?(
                        (this.props.logStatus === false)?null:(
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item mx-2">
                                    <Link to={'/'}>
                                        <button type={'button'}
                                                className={'btn btn-text-light btn-outline-light my-2'}
                                                onClick={() => {
                                                    sessionStorage.removeItem('loggedStudent')
                                                    window.location.reload();
                                                }}>
                                            <i className="fas fa-sign-out-alt"></i> Logout
                                        </button>
                                    </Link>
                                </li>
                            </ul>
                        )
                    ):null}
                    {(this.props.naviStatus === "lecturer")?(
                        (this.props.logStatus === false)?null:(
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item mx-2">
                                    <Link to={'/'}>
                                        <button type={'button'}
                                                className={'btn btn-text-light btn-outline-light my-2'}
                                                onClick={() => {
                                                    sessionStorage.removeItem('loggedLecturer')
                                                    window.location.reload();
                                                }}>
                                            <i className="fas fa-sign-out-alt"></i> Logout
                                        </button>
                                    </Link>
                                </li>
                            </ul>
                        )
                    ):null}
                </div>
            </div>
        );
    }
}

export default NavigationBar;