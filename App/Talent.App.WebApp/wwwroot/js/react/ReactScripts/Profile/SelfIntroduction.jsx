/* Self introduction section */
import React, { Component } from 'react';
import Cookies from 'js-cookie'

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {
                summary: this.props.summary || "",
                description: this.props.description || ""
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveContact = this.saveContact.bind(this);
    };

    handleChange(event) {
        const data = Object.assign({}, this.state.item)
        data[event.target.name] = event.target.value;
        this.setState({
            item:data
        })
    }
   
    saveContact() {
        console.log(this.state.item)
        const data = Object.assign({}, this.state.item)
        this.props.updateProfileData(data)
    }

    render() {
        
        const characterLimit = 600;
        return (
            <React.Fragment>
                <div className="ui sixteen wide column">
                    <div className="field">
                        <textarea rows="2" maxLength={150} name="summary"
                            placeholder="Please provide a Short Summary about yourself."
                            value={this.props.summary} onChange={this.handleChange} ></textarea>
                    </div>
                </div>
                <span>Summary must be no more than 150 characters</span>
                <div className="ui sixteen wide column">
                    <div className="field" >
                        <textarea maxLength={characterLimit} name="description"
                            placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add."
                            value={this.props.description} onChange={this.handleChange} ></textarea>
                    </div>
                    <span>Description must be between 150-600 characters</span>
                    <div>
                        <button type="button" className="ui right floated teal button" onClick={this.saveContact}>
                            Save </button>
                    </div>
                </div>
             </React.Fragment>
        )
    }
}

  

    



   



