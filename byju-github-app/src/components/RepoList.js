import React from 'react';

function RepoList(props){
    function getRepoName(repo){
        let name = repo.name;
        if (!props.filterTerm) return <p className="m0">{name}</p>
        let idx = name.toUpperCase().indexOf(props.filterTerm.toUpperCase());
        if(idx !== -1){
            return <p className="m0">{name.slice(0, idx)}<b style={{ color:'#ef0a0a'}}>{name.slice(idx,props.filterTerm.length)}</b>{name.slice(idx+props.filterTerm.length)}</p>
        }else{
            return <p className="m0">{name}</p>
        }
    }

    return(
        props.resultList.map(repo => {
            return (
                <div className="list-container">
                    {getRepoName(repo)}
                </div>
            );
        })
    );
}

export default RepoList;