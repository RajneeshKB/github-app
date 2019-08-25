import React, { Component } from 'react';
import '../styles/githubApp.css';
import gitapp from '../apis/github-api.js';

class SearchBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchTerm: "",
            filterTerm: "",
            filterEnabled: false
        }
    }

    findRepos = async ()=>{
        let response = await gitapp.get(this.state.searchTerm + '/repos');
        if (response && response.data && response.data.length){ 
            this.props.onShow([...response.data]);
            this.setState({ filterEnabled: true });
        }
    }

    filterResult = (e)=>{
        this.setState({ filterTerm: e.currentTarget.value },()=>{
            this.props.onFilter(this.state.filterTerm);
        });
    }

    clearInput = (type)=>{
        if(type === 'search'){
            this.setState({ searchTerm: "", filterEnabled: false });
            this.props.onShow([]);
        }else{
            this.setState({ filterTerm: "" },()=>{
                this.props.onFilter(this.state.filterTerm);
            });
        }
    }

    render(){
        return(
            <div className="search-container">
                <div className="flex-row find-repo-container">
                    <input className="h25 w71 pl5 br5" type="text" value={this.state.searchTerm} placeholder="Enter username to search your repositories Eg. TestUser" onChange={e => this.setState({ searchTerm: e.currentTarget.value }) } />
                    <button className="submit-btn w11 br5" onClick={this.findRepos} >Go</button>
                    <button className="clear-btn w15 br5" onClick={() => this.clearInput('search')}>Clear</button>
                </div>
                <div className="flex-row">
                    <input className="h25 w71 mr4 pl5 br5" type="text" disabled={!this.state.filterEnabled} value={this.state.filterTerm} placeholder="Enter some keywords to filter Eg. Algo" onChange={ e => this.filterResult(e) } />
                    <button className="clear-btn w15 br5" disabled={!this.state.filterEnabled} onClick={() => this.clearInput('filter')}>Clear</button>
                </div>
            </div>
        );
    }
}

export default SearchBox;