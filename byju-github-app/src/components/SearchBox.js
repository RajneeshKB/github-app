import React, { Component } from 'react';
import '../styles/githubApp.css';
import gitapp from '../apis/github-api.js';

class SearchBox extends Component{
    /**
     * Update state properties to make use of controlled components. Also enable/disable filter box based on user search
     * @constructor
     * @param {*} props - props being passed from parent component
     * 
     */
    constructor(props){
        super(props);
        this.state = {
            searchTerm: "",
            filterTerm: "",
            filterEnabled: false
        }
    }

    /**
     * Make https request to github API to fetch list of repos for searched username
     * Using async-await to make synchronous calls and handling.
     * Enables filter input box if user searches for any repositories.
     */
    findRepos = async ()=>{
        try{
            if (!this.state.searchTerm){
                this.props.onShow([],true);
                this.setState({ filterEnabled: false });
                return;
            }
            let response = await gitapp.get(this.state.searchTerm + '/repos');
            if (response && response.data && response.data.length) {
                this.props.onShow([...response.data]);
                this.setState({ filterEnabled: true });
            } else {
                this.props.onShow([]);
                this.setState({ filterEnabled: false });
            }
        }catch(err){
            this.props.onShow([]);
            this.setState({ filterEnabled: false });
        }
    }

    /**
     * Calls onFilter callback from parent component with currently filter term.
     */
    filterResult = (e)=>{
        this.setState({ filterTerm: e.currentTarget.value },()=>{
            this.props.onFilter(this.state.filterTerm);
        });
    }

    /**
     * Clears input box for username or filter options based on type input
     * @param { string } type - identity of currently clicked button
     */
    clearInput = (type)=>{
        if(type === 'search'){
            this.setState({ searchTerm: "", filterEnabled: false });
            this.props.onShow([],true);
        }else{
            this.setState({ filterTerm: "" },()=>{
                this.props.onFilter(this.state.filterTerm);
            });
        }
    }

    render(){
        return(
            <div className="search-container">
                <div className="flex-row mb15">
                    <input className="p10 w67 pl5 br5 mr8" type="text" value={this.state.searchTerm} placeholder="Enter username to search your repositories Eg. TestUser" onChange={e => this.setState({ searchTerm: e.currentTarget.value }) } />
                    <button className="submit-btn w11 br5 mr13" onClick={this.findRepos} >Go</button>
                    <button className="clear-btn w13 br5" onClick={() => this.clearInput('search')}>Clear</button>
                </div>
                <div className="flex-row">
                    <input className="p10 w67 mr8 pl5 br5" type="text" disabled={!this.state.filterEnabled} value={this.state.filterTerm} placeholder="Enter some keywords to filter Eg. Algo" onChange={ e => this.filterResult(e) } />
                    <button className="clear-btn w13 br5" disabled={!this.state.filterEnabled} onClick={() => this.clearInput('filter')}>Clear</button>
                </div>
            </div>
        );
    }
}

export default SearchBox;