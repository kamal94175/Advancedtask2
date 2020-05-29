import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
export class Address extends React.Component {
    constructor(props) {
        super(props)


        const addressData = props.addressData ?
            Object.assign({}, props.addressData)
            : {
                number: "",
                street: "",
                suburb: "",
                postCode: "",
                country: "",
                city: "",
            }

        this.state = {
            showEditSection: false,
            newAddress: addressData
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)


    }

    openEdit() {
        const addressData = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            newAddress: addressData
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }



    handleChange(event) {
        const data = Object.assign({}, this.state.newAddress)
        data[event.target.name] = event.target.value
        this.setState({
            newAddress: data
        })
    }

    saveContact() {
        console.log(this.state.newAddress)
        const data = Object.assign({}, this.state.newAddress)
        var updateData = {
            address: data

        }
        this.props.saveProfileData(updateData)
        

        this.closeEdit()
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        let CountriesOptions = [];
        let CitiesOptions = [];
        const selectedCountry = this.state.newAddress.country;
        const selectedCity = this.state.newAddress.city;

        CountriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
        if (selectedCountry != "" && selectedCountry != null) {

            CitiesOptions = Countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);

        }

        return (
            <React.Fragment>
                <div className='ui four wide column'>
                    <ChildSingleInput
                        inputType="text"
                        label="Number" 
                        name="number"
                        value={this.state.newAddress.number}
                        controlFunc={this.handleChange}
                        maxLength={10}
                        errorMessage="Please enter your street number"

                    />
                </div>
                <div className='ui eight wide column'>
                    <ChildSingleInput
                        inputType="text"
                        label="Street"
                        name="street"
                        value={this.state.newAddress.street}
                        controlFunc={this.handleChange}
                        maxLength={80}
                        errorMessage="Please enter your street name"

                    />
                </div>
                <div className='ui four wide column'>
                    <ChildSingleInput
                        inputType="text"
                        label="Suburb"
                        name="suburb"
                        value={this.state.newAddress.suburb}
                        controlFunc={this.handleChange}
                        maxLength={80}
                        errorMessage="Please enter your Suburb"
                    />
                </div>
                
                <div className='ui six wide column'>
                    <label htmlFor="Dropdown">Country</label>
                    <select className="ui right labeled dropdown"
                        id = "Dropdown"
                        placeholder="Country"
                        value={selectedCountry}
                        onChange={this.handleChange}
                        name="country">
                        <option value="">Select a country</option>
                        {CountriesOptions}
                    </select>
                </div>
               
                <div className='ui six wide column'>
                    <label htmlFor="Dropdown1">City</label>
                    <select className="ui right labeled dropdown"
                        placeholder="City"
                        id="Dropdown1"
                        value={selectedCity}
                        onChange={this.handleChange}
                        name="city">
                        <option value="">Select a city</option>
                        {CitiesOptions}
                    </select>
                </div>
                <div className='ui four wide column'>
                    <ChildSingleInput
                        inputType="text"
                        label="Postcode"
                        name="postCode"
                        value={this.state.newAddress.postCode}
                        controlFunc={this.handleChange}
                        maxLength={20}
                        errorMessage="Please enter your Postcode"
                    />
                </div>
                <div className="marginbutton">
                    <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                </div>
            </React.Fragment>
        )
    }

    renderDisplay() {

        let Address = this.props.addressData ? `${this.props.addressData.number}, ${this.props.addressData.street}, ${this.props.addressData.suburb}, ${this.props.addressData.
            postCode}` : ""
        let City = this.props.addressData ? this.props.addressData.city : ""
        let Country = this.props.addressData ? this.props.addressData.country : ""

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {Address}</p>
                        <p>City: {City}</p>
                        <p>Country: {Country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}
export class Nationality extends React.Component {
    constructor(props) {
        super(props)
        

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

    }
    handleChange(event) {
        let data = {};
        data[event.target.name] = event.target.value;
       
        console.log(data)
        this.props.saveProfileData(data);
    }
    render() {
        let CountriesOptions = [];
        
        CountriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
        return (
            <div className='ui six wide column'>
                <select className="ui right labeled dropdown"
                    placeholder="Nationality"
                    value={this.props.nationalityData}
                    onChange={this.handleChange}
                    name="nationality">
                    <option value="">Select a Nationality</option>
                    {CountriesOptions}
                </select>
            </div>
        )


    }
}