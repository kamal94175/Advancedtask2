/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);
        this.state = { ProfilePhoto: '', ProfilePhotoUrl: '' };
        showUpload : false

        this.handleImageChange = this.handleImageChange.bind(this)
        this.renderImage = this.renderImage.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleSubmit(e) {
        //e.preventDefault();
        // TODO: do something with -> this.state.file
        let file = this.state.ProfilePhoto
        const formData = new FormData()

        formData.append('files', file)
        
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateProfilePhoto',
            headers: {
                'Authorization': 'Bearer '+ cookies,
                //'Content-Type': false,                
            },
            contentType: false,
            processData: false,
            type: "POST",
            data: formData,
            success: function (res) {
                console.log(res)
                
                if (res.success == true) {
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                    document.getElementById('showhide').style.display = 'none';//this will hide the upload button only when success == true
                    this.props.updateProfileData(res.data);
                    
                } else {

                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    
        console.log('handle uploading-', this.state.ProfilePhoto);
    }

    handleImageChange(e) {
        //e.preventDefault();
        let acceptedExt = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                ProfilePhoto: file,
                ProfilePhotoUrl: reader.result,
                //showUpload: true
            });
        }

        reader.readAsDataURL(file)
        if (file == "") {
            document.getElementById('showhide').style.display = 'none';
        } else {
            document.getElementById('showhide').style.display = 'inline';
        }
        
    }
    renderImage() {
        let { ProfilePhotoUrl } = this.state;
        ProfilePhotoUrl = this.props.imageId;
        if (ProfilePhotoUrl == null) {
            return (
                <div className="ui container">
                    <div className="margin-top">
                        <label className="upload-btn" >
                            <input type="file"
                                className="inputfile hidden"
                                name="file"
                                accept="image/*" //this will only accept the images not other files
                                onChange={this.handleImageChange}
                                id="embedpollfileinput" />

                            <i className="camera retro icon"></i>
                        </label>
                    </div>
                </div>)
        } else {
            return (<div className="image-preview">
                <label className="upload-btn2" >
                    <input type="file"
                        className="inputfile hidden"
                        name="file"
                        accept="image/*" //this will only accept the images not other files
                        onChange={this.handleImageChange}
                        id="fileinput"
                    />

                    {<img className="ProfilePhoto" src={this.props.imageId} />}
                </label>
            </div>)
        }
                  
    }
            
    render() {
        return (
            <div>
                {this.renderImage}
                <button className="submitButton"
                    id="showhide"
                    type="submit"
                    style={{ display: 'none' }}
                    onClick={this.handleSubmit()}><i className="upload icon"></i>Upload
               </button>
            </div>
        )
    }
}
    

