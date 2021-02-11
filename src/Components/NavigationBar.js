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
                    {(this.props.adminNav === true)?null:(
                        (JSON.parse(sessionStorage.getItem('loggedUser')) == null)?(
                            <ul className={'navbar-nav ml-auto'}>
                                <li className={'nav-item mx-2'}>
                                    <Link to={'/signup'}>
                                        <button type={'button'}
                                                className={'btn btn-text-light btn-outline-light my-2'}>
                                            <i className={"fas fa-user-plus"}></i> Sign Up
                                        </button>
                                    </Link>
                                </li>
                            </ul>):(
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item mx-2">
                                    <Link to={'/booking-list'}>
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
                                                    sessionStorage.removeItem('loggedUser')
                                                    window.location.reload();
                                                }}>
                                            <i className="fas fa-sign-out-alt"></i> Logout
                                        </button>
                                    </Link>
                                </li>
                            </ul>
                        )
                    )
                    }</div>
            </div>
        );
    }
}

export default NavigationBar;