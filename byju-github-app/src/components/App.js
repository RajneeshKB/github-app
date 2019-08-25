import React, { Component } from 'react';
import SearchBox from './SearchBox';
import RepoList from './RepoList';
import '../styles/githubApp.css';

class App extends Component{
    constructor(props){
        super(props);
        this.state = { result: [], filterResult: [], filterTerm:""};
    }

    displayResult = (list) =>{
        this.setState({result: [...list], filterResult: list});
    }

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