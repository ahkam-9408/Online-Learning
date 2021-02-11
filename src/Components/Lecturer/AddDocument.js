import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

class AddDocument extends Component{
    constructor() {
        super();

        this.state = {
            subject : "",
            lectureTopic : "",
            description : "",
            documentName : ""
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this)
    }

    componentDidMount() {
        if(JSON.parse(sessionStorage.getItem('loggedLecturer')) == null)
            this.props.history.push('/lecturer');

        this.props.changeLog(true);
    }

    onChangeHandler(e) {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const {subject,lectureTopic,description,documentName} = this.state;

        if(subject==="" || lectureTopic==="" || description==="" || documentName===""){
            alert("All fields are required")
        } else {
            const file = document.getElementById('inputFile').files;

            const lectureObject = {
                subject:subject,
                lectureTopic: lectureTopic,
                description: description,
                documentName: documentName
            }

            axios.post('http://localhost:4000/lecture/create-lecture', lectureObject)
                .then(res => alert("Lecture Content added successfully"))

            const formData = new FormData();
            formData.append("img",file[0]);

            fetch('http://localhost:4000/file/upload-file/',{
                method: "POST",
                body: formData
            }).then(res => console.log(res));

            this.setState({subject:"",lectureTopic:"",description:"", documentName:""});
        }
    }

    onChangeImage(e) {
        const file = e.target.files[0];
        this.setState({
            fileContent: URL.createObjectURL(file),
            documentName: file.name
        });
    }

    render() {
        return (
            <div className={' col-10 mx-auto col-md-5 mt-4'}>
                <div className={'card card-body my-3'}>
                    <h3 className={'text-center mb-5'}>Add Lecture Document</h3>
                    <form className={'signup text-left'} onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Subject</label>
                            <input type="text" className="form-control" placeholder="Subject" value={this.state.subject} name={'subject'} onChange={this.onChangeHandler}/>
                        </div>
                        <div className="form-group">
                            <label>Lecture Topic</label>
                            <input type="text" className="form-control" placeholder="Lecture Topic" value={this.state.lectureTopic} name={'lectureTopic'} onChange={this.onChangeHandler}/>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea type="text" className="form-control" rows={'3'} id={"description"} placeholder="Description about Lecture" value={this.state.description} name={'description'} onChange={this.onChangeHandler}></textarea>
                        </div>
                        <div className="form-group">
                            <label>Upload the Document</label>
                            <div className={'custom-file'}>
                                <input type="file" ref={'file'} name={'user[image]'} className="custom-file-input" id={'inputFile'} accept={'image/x-png,image/jpeg,application/pdf'} onChange={this.onChangeImage}/>
                                <label className={'custom-file-label'} htmlFor={'inputFile'}>Choose file</label>
                            </div>
                        </div>
                        {(this.state.documentName!=="")?(
                            <div className={'form-group'}>
                                <label>Preview</label>
                                <img src={this.state.fileContent} width={'100%'} alt={this.state.documentName}/>
                            </div>
                        ):null}
                        <button type="submit" className="form-control btn btn-primary my-3">Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddDocument;