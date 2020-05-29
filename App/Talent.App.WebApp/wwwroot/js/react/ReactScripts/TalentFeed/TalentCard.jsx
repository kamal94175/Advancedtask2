import React from 'react';
import Cookies from 'js-cookie';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon } from 'semantic-ui-react'


export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedData: [], 
            showProfile: true,
            isLoading: false,
            
        }
        this.renderVideo = this.renderVideo.bind(this),
        this.renderProfile = this.renderProfile.bind(this),
        this.toggleContent = this.toggleContent.bind(this)
        this.fetchData = this.fetchData.bind(this)
        
    };
    
    componentDidMount() {
        this.fetchData();   
    }
    fetchData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/Profile/Profile/getTalent?Number=514&Position=509',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let newValues = res.data;
                this.setState({
                    feedData: newValues,
                });
                console.log(this.state.feedData);
            }.bind(this)
        })
        
    } 
    
    toggleContent(e) {
        e.preventDefault()
        this.setState({
            showProfile: !this.state.showProfile,
            //details: this.state.details
        })
    }

    renderVideo() {
        return (
            <div>
                {
                  this.state.feedData.map((detail, index) => (
                  <div className="ui card" key={index}>
                        <div className="name">{detail.name}<i className="star icon"></i>
                        </div>

                        <div className="video">
                            <iframe src="http://techslides.com/demos/sample-videos/small.webm" />
                        </div>
                        <div className="extra content">
                            <i onClick={this.toggleContent} className="user icon"></i>
                            <i className="file pdf outline icon"></i>
                            <i className="linkedin in icon"></i>
                            <i className="github icon"></i>
                        </div>
                  </div>
                ))}
            </div>
        )
    }
    renderProfile() {
        //const { details } = this.props;
        return ( 
            <div>
                {
                   this.state.feedData == null ? <p>There are no talents found for your recruitment company</p> :
                <div>
                      {this.state.feedData.map((detail,index) => (

                    <div className="ui card" key={index}>

                        <div className="name">{detail.name}
                            <i className="star icon"></i>
                        </div>

                        <div className="image">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" ></img>
                        </div>

                        <div className="content img-content">
                            {detail.visa} 
                            <div className="meta">
                                <span className="skill">{detail.skill}</span>
                            </div>
                            <div className="description">
                                {detail.summary}
                            </div>
                        </div>
                    
                        <div className="extra content">
                            <i onClick={this.toggleContent} className="video icon"></i>
                            <i className="file pdf outline icon"></i>
                            <i className="linkedin in icon"></i>
                            <i className="github icon"></i>

                        </div>
                    </div>
                   ))}
                </div>
                }
            </div>
        )
    }

    render() {
        return (
            <div> {
                this.state.showProfile ? this.renderProfile() : this.renderVideo()
            }
            </div>
         )     
          
    }
}
