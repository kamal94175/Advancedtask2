import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobSeekingStatus: {
                status: "",
                availableDate: ""
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        //vent.preventDefault();
        const data = {}
        data[event.target.name] = event.target.value
        console.log(data)
        this.setState({
            jobSeekingStatus: data
        })
    
        var update = {
            jobSeekingStatus: data
            }
        console.log(update)
        this.props.saveProfileData(update);
    }
    
    render() {
        return(
            <div className="ui form">
                <div className="grouped fields">
                    <label>Current Status</label>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input type="radio"
                                name="status"
                                value={ "Actively looking for the job"}
                                checked={this.props.status.status === "Actively looking for the job" }
                                onChange={this.handleInputChange} 
                             />
                            <label>Actively looking for the job</label>
                        </div>
                    </div>
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio"
                                       name="status"
                                       value="Not looking for a job at the moment"
                                       checked={this.props.status.status === "Not looking for a job at the moment"}
                                       onChange={this.handleInputChange}
                                 />
                                <label>Not looking for a job at the moment</label>
                            </div> 
                        </div>
                            <div className="field">
                                <div className="ui radio checkbox">
                                     <input type="radio"
                                            name="status"
                                            value="Currently employed but open to offers"
                                            checked={this.props.status.status === "Currently employed but open to offers"}
                                            onChange={this.handleInputChange}
                                     />
                                    <label>Currently employed but open to offers</label>
                                </div>
                            </div>
                                <div className="field">
                                    <div className="ui radio checkbox">
                                         <input type="radio"
                                                name="status"
                                                value="Will be available on later date"
                                                checked={this.props.status.status === "Will be available on later date"}
                                                onChange={this.handleInputChange}
                                        />
                                        <label>Will be available on later date</label>
                                    </div>
                                </div>
                </div>
            </div>
        )

    }
}