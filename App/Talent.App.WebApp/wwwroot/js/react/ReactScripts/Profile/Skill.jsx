/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { Container, Table, Button, Icons } from "semantic-ui-react";
export default class Skill extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoaded: false,
            showAddSection: false,
            index: -1,
            skills: {
                name: "",
                level: ""
            },
            Name: "",
            Level: ""
        }
        this.AddSkill = this.AddSkill.bind(this)
        this.cancel = this.cancel.bind(this)
        this.editSkill = this.editSkill.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleEditChange = this.handleEditChange.bind(this)
        this.saveAdd = this.saveAdd.bind(this)
        this.saveEdit = this.saveEdit.bind(this)
        this.delete = this.delete.bind(this)
        this.renderAddForm = this.renderAddForm.bind(this)
    }
    componentDidMount() {

    }
    AddSkill() {
        this.setState({
            showAddSection: true,
        });

    }
    editSkill(index) {
        var oldskills = Object.assign([], this.props.skillData)
            var name = oldskills[index].name;
            var level = oldskills[index].level;

            this.setState({
                index: index,
                Name: name,
                Level: level

            });
        }
    

    cancel() {
        this.setState({
            showAddSection: false,
            index: -1
        });
    }



    handleChange(event) {
        const data = Object.assign({}, this.state.skills)
        data[event.target.name] = event.target.value
        this.setState({
            skills: data
        })
    }

    handleEditChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    saveAdd() {
        console.log(this.state.skills)

        const skillData = this.props.skillData;

        this.props.skillData.push(this.state.skills);

        var updateData = {
            skills: skillData
        }
        this.props.updateProfileData(updateData)
        this.cancel()

    }
    saveEdit(index) {

        const data = Object.assign([], this.props.skillData)

        data[index].name = this.state.Name
        data[index].level = this.state.Level

        var updateData = {
            skill: data
        }
        console.log(updateData)
        this.props.updateProfileData(updateData)
        this.cancel()
    }



    delete() {

        console.log(this.state.skills)

        const skillData = this.props.skillData;

        this.props.skillData.pop(this.state.skills);

        var updateData = {
            skills: skillData
        }
        this.props.updateProfileData(updateData)
        this.cancel()
    };
    renderAddForm() {
        if (this.state.showAddSection) {
         return (
           <React.Fragment>
              <Table striped>
                < Table.Body >
                    <Table.Row>
                        <Table.Cell><input type="text" name="name" value={this.state.skills.name} onChange={this.handleChange} placeholder="Skill" /></Table.Cell>
                        <Table.Cell>
                            <select name="level" value={this.state.skills.level}
                                     onChange={this.handleChange} className="ui fluid dropdown">
                                <option value="ExperienceLevel">ExperienceLevel</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Experienced">Experienced</option>
                                
                            </select>
                        </Table.Cell>
                        <Table.Cell><button type="button" className="ui teal button " onClick={this.saveAdd}>Save</button>
                            <button type="button" className="ui red button " onClick={this.cancel}>Cancel</button></Table.Cell>
                    </Table.Row>
                </Table.Body >
              </Table>
           </React.Fragment>
            )
        } else {
            return null
        }
    }
    render() {
        const editname = (
            <input type="text" name="Name" value={this.state.Name}
                onChange={this.handleEditChange} placeholder="Skill" />)

        const editlevel = (
            <select name="level" value={this.state.Level}
                onChange={this.handleEditChange} className="ui fluid dropdown">
                <option value="ExperienceLevel">ExperienceLevel</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Experienced">Experienced</option>
            </select>)

        const editbutton = index => (<button type="button" className="ui teal button "
            onClick={() => this.saveEdit(index)}>Save
                                     </button>)

        const cancelbutton = (<button type="button" className="ui red button "
            onClick={this.cancel}>Cancel
                              </button>)

        return (

            <Container className="table-margin">
                {this.renderAddForm()}
                <React.Fragment>
                    <Table striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Skill</Table.HeaderCell>
                                <Table.HeaderCell>Level</Table.HeaderCell>
                                <Table.HeaderCell>
                                    <button type="button" className="ui secondary button" onClick={this.AddSkill}>
                                        <i className="plus icon"></i>AddNew
                                    </button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body className="helo">
                            {this.props.skillData.map(lang => (
                                <Table.Row key={lang.id}>
                                    <Table.Cell>{this.props.skillData.indexOf(lang) == this.state.index ? editname : lang.name}</Table.Cell>
                                    <Table.Cell>{this.props.skillData.indexOf(lang) == this.state.index ? editlevel : lang.level}</Table.Cell>
                                    <Table.Cell>
                                        {this.props.skillData.indexOf(lang) == this.state.index ? editbutton(this.props.skillData.indexOf(lang)) :
                                            <i className="pencil alternate icon" onClick={() => this.editSkill(this.props.skillData.indexOf(lang))}>
                                            </i>}
                                        {this.props.skillData.indexOf(lang) == this.state.index ? cancelbutton :
                                            <i className="close icon" onClick={this.delete}></i>}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </React.Fragment>
            </Container >
        )
    }


}

   

