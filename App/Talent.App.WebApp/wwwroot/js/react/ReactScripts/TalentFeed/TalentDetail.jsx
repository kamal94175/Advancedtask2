import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx'
import TalentCardDetail from '../TalentFeed/TalentCardDetail.jsx';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';

export default class TalentDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            Details: []
        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
       $.ajax({
           url: 'https://jsonplaceholder.typicode.com/todos/1',
            headers: {
                'Authorization': 'Bearer ' ,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
               success: function (res) {
                   //this.updateWithoutSave(res.data)
               }.bind(this)
       })

    }
    render() {
        return null;
    }
}