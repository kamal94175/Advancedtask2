 import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import { Dropdown } from 'semantic-ui-react'
const visaStatusOption =  [
    { key: 0, value: 'Citizen', text: 'Citizen' },
    { key: 1, value: 'Permanent Resident', text: 'Permanent Resident' },
    { key: 2, value: 'Work Visa', text: 'Work Visa' },
    { key: 3, value: 'Student Visa', text: 'Student Visa' },
];



export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state={
           // selectedValue: 'default',
            visaStatus: '',
            visaExpiryDate: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleExpiryChange = this.handleExpiryChange.bind(this);
        this.Saveme = this.Saveme.bind(this);
        
    }

    componentDidMount() {

    }

    handleChange(event) {
        const data = event.target.value;
        this.setState({
            visaStatus: data
        })
        if (data == "Citizen" || data == "Permanent Resident" || data == "") {
            document.getElementById('expiry').style.display = 'none';

             const update = {
                visaStatus : data,
                visaExpiryDate: null
             }
            
            this.props.saveProfileData(update);

        }
        else {           
            document.getElementById('expiry').style.display = 'inline-flex';
            
        }
        
    }

    handleExpiryChange(event) {

        const data = event.target.value
        //console.log("date", data);
        
        this.setState({
            visaExpiryDate: data

        });
        
    }
    Saveme() {
        const update = {
            visaStatus: this.state.visaStatus,
            visaExpiryDate: this.state.visaExpiryDate
        }
        this.props.saveProfileData(update);
    }
        
    render() {
        let VisaOptions = [];

        VisaOptions = visaStatusOption.map((x) => <option key={x.key} value={x.value}>{x.text}</option>);
        return (

            <div className="ui container table-margin" >

                <select className="ui right labeled dropdown w-auto"
                    value={this.state.visaStatus || this.props.visaStatus}
                    // id = "visastatus"
                    onChange={this.handleChange}
                    name="visaStatus">
                    <option value="">Select one one</option>
                    {VisaOptions}
                </select>

                <div id="expiry" style={{ display: 'none' }}>
                    <input
                        type="Date"
                        value={this.state.visaExpiryDate || this.props.visaExpiryDate}
                        onChange={this.handleExpiryChange}
                        name="visaExpiryDate"
                    />
                    <button type="button" className="ui teal button "
                        onClick={this.Saveme}>Save
                        </button>
                </div>


            </div>

        )
    }
}