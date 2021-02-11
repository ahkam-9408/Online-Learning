import React, {Component} from "react";
import axios from "axios";
import {Link, Switch} from "react-router-dom";

class ViewLectures extends Component{
    constructor() {
        super();

        this.state = {
            lectures: []
        }
    }

    componentDidMount() {
        if(JSON.parse(sessionStorage.getItem('loggedStudent')) == null)
            this.props.history.push('/');

        axios.get('http://localhost:4000/lecture/')
            .then(res => this.setState({lectures: res.data}))
            .catch(error=> console.log(error))
    }

    onChange(e){
        sessionStorage.setItem('filename',JSON.stringify(e));
        this.props.history.push('/student-view-document')
    }

    render() {
        return (
            <div className="container">
                <h2 className="text-center">
                    Lecture Contents
                </h2>
                {(this.state.lectures.length > 0)?(
                    this.state.lectures.map((res,id) => {
                        return (<div className={'row my-3'} key={id}>
                            <div className={'col'}>
                                <div className={'card'}>
                                    <div className={'row no-gutters'}>
                                        <div className={'col-auto'}>
                                            {/*<img src={'http://localhost:4000/image/get-image/'+res.imageName}*/}
                                            {/*     alt={res.imageName}*/}
                                            {/*     width={'220px'}*/}
                                            {/*     height={'220px'}/>*/}
                                        </div>
                                        <div className={'col'}>
                                            <div className={'row my-2 mx-2'}>
                                                <div className={'col align-self-center'}>
                                                    <div className={'row my-2'}>
                                                        <div className={'col font-weight-bold'}>
                                                            {res.subject}
                                                        </div>
                                                    </div>
                                                    <div className={'row align-items-center'}>
                                                        <div className={'col'}>
                                                            {res.lectureTopic}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={'col align-self-center'}>
                                                    {res.description}
                                                </div>
                                                <div className={'col align-self-center my-3'}>
                                                    <div className={'row align-items-center'}>
                                                        <div className={'col'}>
                                                            <button className={'btn btn-primary mx-2 my-2 form-control'} id={`delId${id}`}
                                                                    onClick={() => this.onChange(res.documentName)}>
                                                                View File
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    })
                    ):(
                    <h4 className="text-center">
                    Lecture Content is empty!!!
                    </h4>
                    )}
                    </div>
                    );
                }
                }

    export default ViewLectures;