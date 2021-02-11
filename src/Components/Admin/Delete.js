import React, {Component} from "react";
import axios from "axios";

class Delete extends Component{
    constructor() {
        super();

        this.state={
            type:"",
            id:"",
            dataSets:""
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onChangeID = this.onChangeID.bind(this);
    }

    componentDidMount() {
        if(JSON.parse(sessionStorage.getItem('loggedAdmin')) == null)
            this.props.history.push('/admin');
    }

    onSubmit(e){
        e.preventDefault();

        console.log(this.state.id)

        if(this.state.type === "student"){
            axios.delete('http://localhost:4000/student/delete-student/'+this.state.id)
                .then(res=> alert("Deleted Successfully"))
        }else if(this.state.type === "lecturer"){
            axios.delete('http://localhost:4000/lecturer/delete-lecturer/'+this.state.id)
                .then(res=> alert("Deleted Successfully"))
        }

        // window.location.reload()
    }

    onChangeID(e){
        this.setState({id:e.target.value})
    }

    onChangeValue(e){
        this.setState({type:e.target.value})

        if(this.state.type === "student"){
            axios.get('http://localhost:4000/student/')
                .then(res=>this.setState({dataSets:res.data}))
        }else if(this.state.type === "lecturer"){
            axios.get('http://localhost:4000/lecturer/')
                .then(res=>this.setState({dataSets:res.data}))
        }
    }

    render() {
        return(
            <div className={'col-10 mx-auto col-md-4'}>
                <div className={'card card-body'}>
                    <h3 className={'text-center mb-5'}>Delete Student/Lecturer</h3>
                    <form className={'signup text-left'} onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Select Category</label>
                            <div>
                                <select className="form-select form-control" value={this.state.type} onChange={this.onChangeValue}>
                                    <option value="student" selected>Student</option>
                                    <option value="lecturer">Lecturer</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Select</label>
                            {(this.state.dataSets.length>0) ?(
                                <select className="form-select form-control" value={this.state.id} onChange={this.onChangeID}>
                                    {this.state.dataSets.map((res,id) => {
                                        return <option key={id} value={res._id}>Name: {res.name}</option>
                                    })}
                                </select>) :null}
                        </div>
                        <div className={'form-group'}>
                            <button type="submit" className="btn btn-danger form-control">Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Delete;