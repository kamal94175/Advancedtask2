/* Certificate section */
import React from 'react';
import Cookies from 'js-cookie';
import { Container, Table, Button, Icons } from "semantic-ui-react";
export default class Certificate extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            showAddSection: false,
            showeditSection: false,
            Certificate: [{
                CertificationName: "",
                CertificationFrom: "",
                CertificationYear: ""
            }],
        }

        this.AddCertificate = this.AddCertificate.bind(this)
        this.cancel = this.cancel.bind(this)
        this.editCertificate = this.editCertificate.bind(this)
        this.delete = this.delete.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveAdd = this.saveAdd.bind(this)
        this.saveEdit = this.saveEdit.bind(this)
        this.renderEditForm = this.renderEditForm.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.renderAddForm = this.renderAddForm.bind(this)
        
    }
    componentDidMount() {

    }
    AddCertificate() {

        this.setState({
            showAddSection: true,

        })
    }

    editCertificate() {
        const { showeditSection } = this.state;
        const data = Object.assign({}, this.state.Certificate)

        this.setState({
            showeditSection: !showeditSection,
            languages: data

        });
    }

    cancel() {
        this.setState({
            showAddSection: false,
            showeditSection: false
        });
    }



    handleChange(event) {
        const data = Object.assign({}, this.state.Certificate)
        data[event.target.name] = event.target.value
        this.setState({
            Certificate: data
        })
    }

    saveAdd() {
        console.log(this.state.Certificate)

        const certificateData = this.props.certificateData;

        this.props.certificateData.push(this.state.Certificate);

        var updateData = {
            Certificate: certificateData
        }
        this.props.updateProfileData(updateData)
        this.cancel()

    }
    saveEdit() {
        const certificateData = this.props.certificateData.slice();
        const CertificateIndex = updatedCertificate.findIndex(
            Certificate => Certificate.Id === CertificateToUpdate.Id
        );
        //updatedlanguages[languageIndex] = languageToUpdate;
        var updateData = {
            Certificate: certificateData
        }
        this.props.updateProfileData(updateData)
        this.cancel()
    }

    delete() {

        console.log(this.state.Certificate)

        const certificateData = this.props.certificateData;

        this.props.certificateData.pop(this.state.lCertificate);

        var updateData = {
            Certificate: certificateData
        }
        this.props.updateProfileData(updateData)
        this.cancel()
    };





    renderAddForm() {
        if (this.state.showAddSection) {
            return (
                <React.Fragment>

                    <Table striped>
                        <Table.Row>
                            <Table.Cell><input type="text" name="CertificationName" value={this.state.Certificate.CertificationName}
                                onChange={this.handleChange} placeholder="CertificationName" />
                            </Table.Cell>
                            <Table.Cell><input type="text" name="CertificationFrom" value={this.state.Certificate.CertificatioFrom}
                                onChange={this.handleChange} placeholder="CertificationFrom" />
                            </Table.Cell>
                            <Table.Cell><input type="text" name="CertificationYear" value={this.state.Certificate.CertificationYear}
                                onChange={this.handleChange} placeholder="CertificationYear" />
                            </Table.Cell>

                            <Table.Cell>
                                <button type="button" className="ui teal button " onClick={this.saveAdd}>Save</button>
                                <button type="button" className="ui red button " onClick={this.cancel}>Cancel</button>
                            </Table.Cell>
                        </Table.Row>
                    </Table>

                </React.Fragment>
            )
        } else {
            return null
        }
    }
    renderEditForm() {

        return (
            <React.Fragment>

                <Table.Row>
                    <Table.Cell><input type="text" name="CertificationName" value={this.state.Certificate.CertificationName}
                        onChange={this.handleChange} placeholder="CertificationName" />
                    </Table.Cell>

                    <Table.Cell><input type="text" name="CertificationFrom" value={this.state.Certificate.CertificationFrom}
                        onChange={this.handleChange} placeholder="Certificate" />
                    </Table.Cell>

                    <Table.Cell><input type="text" name="CertificationYear" value={this.state.Certificate.CertificationYear}
                        onChange={this.handleChange} placeholder="CertificationYear" />
                    </Table.Cell>

                    <Table.Cell>
                        <button type="button" className="ui teal button " onClick={this.saveEdit}>Save</button>
                        <button type="button" className="ui red button " onClick={this.cancel}>Cancel</button>
                    </Table.Cell>
                </Table.Row>
            </React.Fragment>
        )


    }
    
    renderDisplay() {
        return (
            <React.Fragment>
                
                    <Table.Row >
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell>
                            <i className="pencil alternate icon" onClick={this.editCertificate}>
                            </i>
                            <i className="close icon" onClick={this.delete}></i>
                        </Table.Cell>
                    </Table.Row>
                
            </React.Fragment>
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
                                <Table.HeaderCell>Certification Name</Table.HeaderCell>
                                <Table.HeaderCell>Certification From</Table.HeaderCell>
                                <Table.HeaderCell>Certification Year</Table.HeaderCell>
                                <Table.HeaderCell>
                                    <button type="button" className="ui secondary button" onClick={this.AddCertificate}>
                                        <i className="plus icon"></i>AddNew
                                    </button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body className="helo">
                            {this.state.showeditSection ? this.renderEditForm() : this.renderDisplay()}
                        </Table.Body>
                    </Table>
                </React.Fragment>
            </Container >
        )
    }


}
