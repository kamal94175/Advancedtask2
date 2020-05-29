/* Education section */
import React from 'react';
import Cookies from 'js-cookie';
import { default as Countries } from '../../../../../wwwroot/util/jsonFiles/countries.json'
import { Container, Table, Button, Icons } from "semantic-ui-react";
export default class Education extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            showAddSection: false,
            showeditSection: false,
            Education: [{
                Title: "",
                Degree: "",
                InstituteName: "",
                YearOfGraduation: "",
                Country: ""

            }],
        }

        this.AddEducation = this.AddEducation.bind(this)
        this.cancel = this.cancel.bind(this)
        this.editEducation = this.editEducation.bind(this)
        this.delete = this.delete.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveAdd = this.saveAdd.bind(this)
        this.saveEdit = this.saveEdit.bind(this)
        this.renderEditForm = this.renderEditForm.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.renderAddForm = this.renderAddForm.bind(this)
        this.renderOne = this.renderOne.bind(this)
    }
    componentDidMount() {

    }
    AddEducation() {

        this.setState({
            showAddSection: true,

        })
    }

    editEducation() {
        const { showeditSection } = this.state;
        const data = Object.assign({}, this.state.Education)

        this.setState({
            showeditSection: !showeditSection,
            Education: data

        });
    }

    cancel() {
        this.setState({
            showAddSection: false,
            showeditSection: false
        });
    }



    handleChange(event) {
        const data = Object.assign({}, this.state.Education)
        data[event.target.name] = event.target.value
        this.setState({
            Education: data
        })
    }

    saveAdd() {
        console.log(this.state.Education)

        const educationData = this.props.educationData;

        this.props.educationData.push(this.state.Education);

        var updateData = {
            Education: educationData
        }
        this.props.updateProfileData(updateData)
        this.cancel()

    }
    saveEdit() {
        const educationData = this.props.educationData.slice();
        const educationIndex = updatedEducation.findIndex(
            Education => Education.Id === EducationToUpdate.Id
        );
        //updatedlanguages[languageIndex] = languageToUpdate;
        var updateData = {
            Education: educationData
        }
        this.props.updateProfileData(updateData)
        this.cancel()
    }

    delete() {

        console.log(this.state.Education)

        const educationData = this.props.educationData;

        this.props.educationData.pop(this.state.Education);

        var updateData = {
            Education: educationData
        }
        this.props.updateProfileData(updateData)
        this.cancel()
    };





    renderAddForm() {
        let CountriesOptions = [];

        CountriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
        if (this.state.showAddSection) {
            
            return (
                <React.Fragment>

                    <Table striped>
                        <Table.Row>
                            <Table.Cell><input type="text" name="Title" value={this.state.Education.Title}
                                onChange={this.handleChange} placeholder="Title" />
                            </Table.Cell>

                            <Table.Cell><input type="text" name="Degree" value={this.state.Education.Degree}
                                onChange={this.handleChange} placeholder="Degree" />
                            </Table.Cell>

                            <Table.Cell><input type="text" name="InstituteName" value={this.state.Education.InstituteName}
                                onChange={this.handleChange} placeholder="InstituteName" />
                            </Table.Cell>

                            <Table.Cell><input type="text" name="YearOfGraduation" value={this.state.Education.YearOfGraduation}
                                onChange={this.handleChange} placeholder="YearOfGraduation" />
                            </Table.Cell>

                            <Table.Cell><select className="ui right labeled dropdown"
                                placeholder="Country"
                                value={this.state.Education.Country}
                                onChange={this.handleChange}
                                name="Country">
                                <option value="">Select a Country</option>
                                {CountriesOptions}
                            </select>
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
                    <Table.Cell><input type="text" name="Title" value={this.state.Education.Title}
                        onChange={this.handleChange} placeholder="Title" />
                    </Table.Cell>

                    <Table.Cell><input type="text" name="Degree" value={this.state.Education.Degree}
                        onChange={this.handleChange} placeholder="Degree" />
                    </Table.Cell>

                    <Table.Cell><input type="text" name="InstituteName" value={this.state.Education.InstituteName}
                        onChange={this.handleChange} placeholder="InstituteName" />
                    </Table.Cell>

                    <Table.Cell><input type="text" name="YearOfGraduation" value={this.state.Education.YearOfGraduation}
                        onChange={this.handleChange} placeholder="YearOfGraduation" />
                    </Table.Cell>

                    <Table.Cell><input type="text" name="Country" value={this.state.Education.Country}
                        onChange={this.handleChange} placeholder="Country" />
                    </Table.Cell>

                    <Table.Cell>
                        <button type="button" className="ui teal button " onClick={this.saveEdit}>Save</button>
                        <button type="button" className="ui red button " onClick={this.cancel}>Cancel</button>
                    </Table.Cell>
                </Table.Row>
            </React.Fragment>
        )


    }
    renderOne() {
        return null


    }
    renderDisplay() {
        return (
            <React.Fragment>
                
                    <Table.Row >
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell>
                            <i className="pencil alternate icon" onClick={this.editEducation}>
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
                                <Table.HeaderCell>Title</Table.HeaderCell>
                                <Table.HeaderCell>Degree</Table.HeaderCell>
                                <Table.HeaderCell>InstituteName</Table.HeaderCell>
                                <Table.HeaderCell>YearOfGraduation</Table.HeaderCell>
                                <Table.HeaderCell>Country</Table.HeaderCell>
                                <Table.HeaderCell>
                                    <button type="button" className="ui secondary button" onClick={this.AddEducation}>
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
