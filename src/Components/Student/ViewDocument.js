import React, {Component} from "react";
import PDFViewer from 'pdf-viewer-reactjs';

class ViewDocument extends Component {
    constructor() {
        super();

        this.state = {
            filename:""
        }
    }

    componentDidMount() {
        let filename = JSON.parse(sessionStorage.getItem('filename'));

        this.setState({filename:filename})

        // if (filename == null)
        //     this.props.history.push('/student-view-lecture');
        // else
        //     this.setState({filename:filename})
    }


    render() {
        return(
            <div className={'col py-2'}>
                {/*<PDFViewer*/}
                {/*    document={{*/}
                {/*        url: ('http://localhost:4000/file/get-file/'+this.state.filename)*/}
                {/*    }}*/}
                {/*/>*/}
                {/*<img src={'http://localhost:4000/file/get-file/'+this.state.filename}/>*/}
            </div>
        );
    }
}

export default ViewDocument;