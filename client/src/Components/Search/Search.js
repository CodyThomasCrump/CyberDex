import React, { Component } from 'react';
import './Search.css';
import SearchForm from '../SearchForm/SearchForm';
import List from '../List/List';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            district: '',
            school: '',
            searchInput: '',
            display: []
        }
    }

    defaultInput = () => {

        this.setState({
            searchInput: ''
        });
    }

    changeDistrict = event => {

        this.setState({
            district: event.target.value,
            display: []
        });
    }

    changeSchool = event => {

        const { district } = this.state, { dbData } = this.props;
        const newSchool = dbData[district].sheet[event.target.value];

        this.setState({
            school: newSchool
        });

        if (newSchool === undefined) {
            return this.setState({
                display: []
            })
        }

        this.handleSearch(newSchool, '');
    }

    changeInput = event => {
        this.setState({
            searchInput: event.target.value 
        });
    }

    handleSearch = (school, name) => {

        const newDisplay = [], newList = [];
        // Create an object to hold new data.
        var newObject = {
            title: school.title,
            metaList: school.value.metaData,
            personList: newList
        }

        if (name !== '') { // Search for single return.
            // For ever person in personData
            for (var i = 0; i < school.value.personData.length; i++) {
                var person = school.value.personData[i];
                console.log(person.name);
                // If name matches the person.
                if (person.name === name) {
                    // Push person to newList
                    newList.push(person);
                    // Push newObject to newDisplay
                    newDisplay.push(newObject);
                    // Set display as neDisplay.
                    return this.setState({display: newDisplay})
                }
            }

            alert('Error: Name is not in sheet.');
            return this.setState({ display: [] });

        } else { // Search for All
            // For ever person in personData
            for (var i = 0; i < school.value.personData.length; i++) {
                var person = school.value.personData[i];
                // Push person to newList
                newList.push(person);
            }
            // Push newObject to newDisplay
            newDisplay.push(newObject);
            // Set display as neDisplay.
            this.setState({display: newDisplay})
        }
    }


    render() {

        const { district, school, searchInput, display } = this.state;
        const{ dbData } = this.props;

        return(
            <div className='Search'>
                <SearchForm
                    dbData={dbData}
                    district={district}
                    school={school}
                    searchInput={searchInput}
                    changeDistrict={this.changeDistrict}
                    changeSchool={this.changeSchool}
                    changeInput={this.changeInput}
                    handleSearch={this.handleSearch}
                    defaultInput={this.defaultInput}
                />
                <List display={display}/>
            </div>
        );
    }

}