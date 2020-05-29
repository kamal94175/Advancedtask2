/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup } from 'semantic-ui-react';
export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditSection: false,
            linkedAccounts: {
                linkedIn: "",
                github: "",
            }
        }
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        //this.onclick = this.onclick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }
    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }
    openEdit() {
        const linkedAccounts = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            showEditSection: true,
            newAccounts: linkedAccounts
        })
    }
    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }
    
    handleChange(event) {
        const data = Object.assign({}, this.state.newAccounts)
        data[event.target.name] = event.target.value
        this.setState({
            newAccounts: data
        })
    }
    saveContact() {
        console.log(this.state.newAccounts)
        const Accounts = Object.assign({}, this.state.newAccounts)
        var updateData = {
            linkedAccounts: Accounts
        }
        this.props.saveProfileData(updateData)
        this.closeEdit()
    }
    
    renderEdit() {

        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="linkedIn"
                    name="linkedIn"
                    value={this.state.newAccounts.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your Linkedin Url"
                    errorMessage="Please enter your Linkedin Url"
                />
                <ChildSingleInput
                    inputType="text"
                    label="github"
                    name="github"
                    value={this.state.newAccounts.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your Github Url"
                    errorMessage="Please enter your Github Url"
                />
                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }
    renderDisplay() {
        let linked = this.props.linkedAccounts ? this.props.linkedAccounts.linkedIn : ""
        let linkedgit = this.props.linkedAccounts ? this.props.linkedAccounts.github : ""
        
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <div>
                            <a className="ui linkedin button" target='_blank'
                                href={this.props.linkedAccounts.linkedIn}>
                                <i className="linkedin icon"></i>
                                LinkedIn
                            </a>

                            <a className="ui black button" target='_blank'
                                href={this.props.linkedAccounts.github}>
                                <i className="github icon"></i>
                                Github
                            </a>

                            <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit
                            </button>
                        </div>
                    </React.Fragment>
                </div>
            </div>
        )
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
}




