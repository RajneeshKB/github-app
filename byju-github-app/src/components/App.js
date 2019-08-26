import React, { Component } from 'react';
import SearchBox from './SearchBox';
import RepoList from './RepoList';
import '../styles/githubApp.css';

/**
 * Root level component
 */
class App extends Component{
    /**
     * Initialize class level state
     * @constructor
     * @param {*} props - props being passed from parent component
     *  
     */
    constructor(props){
        super(props);
        this.state = { result: [], filterResult: [], filterTerm:""};
    }

    /**
     * Update state to re-render DOM, and display list of repo
     * results is used to maintain original repo list fetched
     * filterResult is used to diplay data in DOM
     * @param {[]} list - list of objects containing data of fetched repos
     * 
     */
    displayResult = (list) =>{
        this.setState({result: [...list], filterResult: list});
    }

    /**
     * Filter list of repo based on filterTerm entered by user
     * If no filterTerm found original list would be displayed
     * @param { string } filterTerm - filter term entered by user
     * 
     */
    filterResult = (filterTerm) =>{
        if (filterTerm){
            var filteredList = this.state.result.filter(repo => {
                if (repo.name.toUpperCase().includes(filterTerm.toUpperCase())) return true;
                else return false;
            });
            this.setState({ filterResult: filteredList, filterTerm: filterTerm });
        }else{
            this.setState({ filterResult: [...this.state.result], filterTerm: "" });
        }
    }

    render(){
        return (
            <div className="github-app">
                <SearchBox onShow={this.displayResult} onFilter={this.filterResult}></SearchBox>
                <RepoList resultList={this.state.filterResult} filterTerm={this.state.filterTerm}></RepoList>
            </div>
        );
    }
}

export default App;