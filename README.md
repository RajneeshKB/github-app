# github-app - Byju's Assignment

Project searches for user repositories on github.

Project Architecture:
    --> App (root component)
        --> SearchBox (component with search and filter boxes)
        --> RepoList (component displaying fetched and filtered repos of user)

Components Description:
(1) App Component
        -> This component wraps SearchBox and RepoList Components.
        -> It acts as mediator to pass data between SearchBox and RepoList components.
        -> It is a class based component and uses state for re-rendering and props to pass data to child components.

(2) SearchBox Component
        -> This component is used for searching and filtering user repositories.
        -> It includes 1 input box with two buttons for searching and clearing input box content.
        -> It calls a callback function, passed from App (root) component, to update App's state and display fetched repos.
        -> It also calls another callback when user tries to filter the list.
        ->Two list is maintained to hold fetched list from server and one list to display filtered data.
        -->Filter input box and it's clear button is disabled till user have nat made any search.

(3) RepoList Component
        -> Functional component used for displaying fetched repository list.
        -> It gets repo list from it's parent component (App) as a prop and diplays.

Styling:
    --> No CSS pre-processor is used for formatting display.
    --> CSS Flex is used for alignment of elements in DOM.

AJAX Requests:
    --> for AJAX calls axios is used.
    --> axios get function call is used to get list of repositories for that user