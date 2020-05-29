/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { Container, Table, Button, Icons } from "semantic-ui-react";

export default class Experience extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            showAddSection: false,
            showeditSection: false,
            experiences: {
                Company: "",
                Position: "",
                Responsibilities: "",
                Start: "",
                End:  ""
            }


        }
        this.AddLanguage = this.AddLanguage.bind(this)
        this.cancel = this.cancel.bind(this)
        this.editLanguage = this.editLanguage.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEditForm = this.renderEditForm.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.renderAddForm = this.renderAddForm.bind(this)
    }
    componentDidMount() {

    }
    AddLanguage() {
        this.setState({
            showAddSection: true,
        });

    }
    editLanguage() {
        const data = Object.assign({}, this.state.experiences)
        this.setState({
            experiences: data,
            showeditSection: true,
        });
    }

    cancel() {
        this.setState({
            showAddSection: false,
            showeditSection: false
        });
    }



    handleChange(event) {
        const data = Object.assign({}, this.state.experiences)
        data[event.target.name] = event.target.value
        this.setState({
            experiences: data
        })
    }

    saveContact() {
        console.log(this.state.experiences)
        const myExperience = Object.assign({}, this.state.experiences)
        var updateData = {
            experiences: [myExperience]
        }
        this.props.updateProfileData(updateData)
        this.cancel()
    }
    renderAddForm() {
        if (this.state.showAddSection) {
            return (
                <React.Fragment>
                    <Table striped>
                        < Table.Body >
                            <Table.Row>
                                <Table.Cell><input type="text" name="Company" value={this.state.experiences.Company}
                                    onChange={this.handleChange} placeholder="Company" />
                                </Table.Cell>
                                <Table.Cell><input type="text" name="Position" value={this.state.experiences.Position}
                                    onChange={this.handleChange} placeholder="Position" />
                                </Table.Cell>
                                <Table.Cell><input type="text" name="Responsibilities" value={this.state.experiences.Responsibilities}
                                    onChange={this.handleChange} placeholder="Responsibilities" />
                                </Table.Cell>
                                <Table.Cell><input type="date" name="Start" value={this.state.experiences.Start}
                                    onChange={this.handleChange} placeholder="Start" />
                                </Table.Cell>
                                <Table.Cell><input type="date" name="End" value={this.state.experiences.End}
                                    onChange={this.handleChange} placeholder="End" />
                                </Table.Cell>
                                
                                <Table.Cell><button type="button" className="ui teal button " onClick={this.saveContact}>Save</button>
                                            <button type="button" className="ui red button " onClick={this.cancel}>Cancel</button>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body >
                    </Table>
                </React.Fragment>
            )
        } else {
            return null
        }
    }
    renderEditForm() {
        return (

                <Table.Body>
                    <Table.Row>
                        <Table.Cell><input type="text" name="Company" value={this.state.experiences.Company}
                            onChange={this.handleChange} placeholder="Company" />
                        </Table.Cell>
                        <Table.Cell><input type="text" name="Position" value={this.state.experiences.Position}
                            onChange={this.handleChange} placeholder="Position" />
                        </Table.Cell>
                        <Table.Cell><input type="text" name="Responsibilities" value={this.state.experiences.Responsibilities}
                            onChange={this.handleChange} placeholder="Responsibilities" />
                        </Table.Cell>
                        <Table.Cell><input type="date" name="Start" value={this.state.experiences.Start}
                            onChange={this.handleChange} placeholder="Start" />
                        </Table.Cell>
                        <Table.Cell><input type="date" name="End" value={this.state.experiences.End}
                            onChange={this.handleChange} placeholder="End" />
                        </Table.Cell>
                        <Table.Cell><button type="button" className="ui teal button " onClick={this.saveContact}>Save</button>
                            <button type="button" className="ui red button " onClick={this.cancel}>Cancel</button></Table.Cell>
                    </Table.Row>
                </Table.Body >
            )
        
    }

    renderOne() {
        return (
            this.state.showeditSection ? this.renderEditForm() : this.renderDisplay()
        )
    }

    renderDisplay() {
        return (
            <Table.Body>
                {this.props.experienceData.map(lang => (
                    <Table.Row key={lang.id}>

                        <Table.Cell>{lang.company}</Table.Cell>
                        <Table.Cell>{lang.position}</Table.Cell>
                        <Table.Cell>{lang.responsibilities}</Table.Cell>
                        <Table.Cell>{lang.start}</Table.Cell>
                        <Table.Cell>{lang.end}</Table.Cell>
                        <Table.Cell>
                            <i className="pencil alternate icon" onClick={this.editLanguage}></i>
                            <i className="close icon"></i>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        )
    }
    render() {
        return (

            <Container className="table-margin">
                {this.renderAddForm()}
                <React.Fragment>
                    <Table striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Company</Table.HeaderCell>
                                <Table.HeaderCell>Position</Table.HeaderCell>
                                <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                                <Table.HeaderCell>Start</Table.HeaderCell>
                                <Table.HeaderCell>End</Table.HeaderCell>
                                <Table.HeaderCell>
                                    <button type="button" className="ui secondary button" onClick={this.AddLanguage}>
                                        <i className="plus icon "></i>AddNew
                                    </button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        {this.renderOne()}
                    </Table>
                </React.Fragment>
            </Container >
        )
    }


}
