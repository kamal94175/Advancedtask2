import React from 'react';
import { Loader } from 'semantic-ui-react';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import Cookies from 'js-cookie';


export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaderData: loaderData,
            companyData: {
                companyContact: {
                    name: '',
                    email: '',
                    phone: '',
                    location: {
                        city: '',
                        country: ''
                    }
                }
            }
        }
        this.init = this.init.bind(this);
        this.loadDate = this.loadData.bind(this);
        this.updateWithoutSave = this.updateWithoutSave.bind(this);
    };
    init() {
        let loaderData = this.state.loaderData;
        loaderData.allowedUsers.push("Employer");
        loaderData.allowedUsers.push("Recruiter");
        loaderData.isLoading = false;
        this.setState({ loaderData })
    }
    componentDidMount() {
        this.loadData()
    };
    loadData() {
        let getCompanyProfileUrl = this.state.baseUrl + "getEmployerProfile"
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/Profile/Profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let employerData = null;
                if (res.employer) {
                    employerData = res.employer
                }
                this.updateWithoutSave(employerData)
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
        this.init()
    }
    updateWithoutSave(newValues) {
        let newCompanyDetails = Object.assign({}, newValues)
        this.setState({
            companyData: newCompanyDetails
        }, () => console.log("updateWithoutSave", this.state.companyData))
    } 

    render() {
        console.log("InRender", this.state.companyData)
        let companyName = this.state.companyData ? this.state.companyData.companyContact.name : ""
        let email = this.state.companyData ? this.state.companyData.companyContact.email : ""
        let phone = this.state.companyData ? this.state.companyData.companyContact.phone : ""
        let location = { city: '', country: '' }
        if (this.state.companyData && this.state.companyData.companyContact.location) {
            location = this.state.companyData.companyContact.location
        }
        
        return (
           <div>
               
               <div className="ui card">
                   <div className="content">

                       <div className="center aligned header">
                            <img className="icon-img" src="https://semantic-ui.com/images/wireframe/image.png" />
                            <br /> {companyName}<br />
                       </div>

                       <div className="center aligned location">
                           <span className="text-muted"><i className="map marker alternate icon"></i>
                                {location.city}, {location.country}
                           </span>
                       </div>

                       <div className="center aligned">
                           We currently do not have specific skills that we desire
                       </div>

                       <div className="extra content contact-info">

                               <div className="phone"><i className="phone icon"></i> {phone}</div>
                               <div className="email"><i className="envelope icon"></i> {email}</div>

                       </div>
                   </div>
               </div>
           
          </div>
         
        )
    }
}