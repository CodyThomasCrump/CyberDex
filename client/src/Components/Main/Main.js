import React, { Component } from 'react';
import Search from '../Search/Search';
import Sheet from '../Sheet/Sheet';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { 
    Grid,
    TextField,
    Button,
    Container,
} from '@material-ui/core';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            searchInput: '',
            searchHelper: '',
            display: [],
            editMode: ''
        }
        this.changeInput = this.changeInput.bind(this);
        this.iterateSearch = this.iterateSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.setEditMode = this.setEditMode.bind(this);
        this.resetDisplay = this.resetDisplay.bind(this);
    }

    changeInput(event) {
        this.setState({
            searchInput: event.target.value,
            searchHelper: ''
        });
    }

    iterateSearch(refresh) {

        const { 
            dbSpread 
        } = this.props, {
            searchInput
        } = this.state;

        let value = searchInput, 
            sheetIdArray = [], 
            sheetTitleArray = [];

        if (refresh) value = refresh;

        const resultArray = [],
            reset = '',
            input = value.trim().toLowerCase(), 
            inputArray = input.split(' '), 
            self = this;

        dbSpread.sheet.forEach(sheet => {
            sheetTitleArray = sheet.title.toLowerCase().split(' ');
            sheetTitleArray.forEach(titleWord => {
                if (inputArray.includes(titleWord)) {
                    sheetIdArray.push(sheet.id);
                    inputArray.splice(inputArray.indexOf(titleWord), 1);
                }
            });
        });

        dbSpread.sheet.forEach(sheet => {
            let result = reset;
            if (sheetIdArray.length === 0) {
                result = self.handleSearch(sheet, inputArray);
                if (result === undefined) return
                result = self.handleSearch(sheet, inputArray);
                if (result.includes('unshift')) {
                    resultArray.unshift(result[0]);
                } else {
                    resultArray.push(result[0]);
                }
            } else if (sheetIdArray.includes(sheet.id)) {
                result = self.handleSearch(sheet, inputArray);
                if (result.includes('unshift')) {
                    resultArray.unshift(result[0]);
                } else {
                    resultArray.push(result[0]);
                }
            }
        });

        if (resultArray.length < 1) return this.setState({ searchHelper: `"${value}" is not found.` });

        this.setState({ 
            loading: false,
            display: resultArray 
        });
    }

    handleSearch(sheet, inputArray) {

        const newMeta = [],
            newPerson = [],
            input = inputArray.join(' ');

        let pushPerson = false,
            unshiftPerson = false,
            unshiftObject = false,
            nameArray = [],
            tagArray = [],
            roomStr = '',
            extStr = '',
            newObject = {
                id: sheet.id,
                title: sheet.title,
                meta: newMeta,
                person: newPerson
            };

        // Add all metaData to display.
        sheet.meta.forEach(meta => newMeta.push(meta));

        sheet.person.forEach(person => {
            // If search is for all results.
            if (inputArray.length === 0) pushPerson = true;
            // If person's values is not null.
            if (person.name !== null) {
                // If person's value is identical to input.
                if (person.name.toLowerCase() === input) {
                    unshiftPerson = true;
                    unshiftObject = true;
                } else {
                    nameArray = person.name.toLowerCase().split(' ');
                    // If any word in person's value matches any word in the input.
                    nameArray.forEach(word => {
                        if (inputArray.includes(word.toLowerCase())) {
                            pushPerson = true;
                        }
                    });
                }
            } if (person.phoneTag !== null && !pushPerson) {
                if (person.phoneTag.toLowerCase() === input) {
                    unshiftPerson = true;
                    unshiftObject = true;
                } else {
                    tagArray = person.phoneTag.toLowerCase().split(' ');
                    tagArray.forEach(word => {
                        if (inputArray.includes(word.toLowerCase())) {
                            pushPerson = true;
                        }
                    });
                }
            } if (person.room !== null && !pushPerson) {
                roomStr = person.room.toString();
                // If person's value matches input.
                if (roomStr === input) {
                    pushPerson = true;
                }
            } if (person.extension !== null && !pushPerson) {
                extStr = person.extension.toString();
                if (extStr === input) {
                    pushPerson = true;
                }
            }
            if (unshiftPerson) {
                newPerson.unshift(person);
                unshiftPerson = false;
            }
            if (pushPerson) {
                newPerson.push(person);
                pushPerson = false;
            }
        });
        
        if (unshiftObject) {
            return [newObject, 'unshift']
        }

        if ((!unshiftObject && newPerson.length > 0) || inputArray.length === 0) {
            return [newObject, 'push']
        }
    }

    resetDisplay() { 
        this.setState({ 
            loading: true,
            display: [], 
            editMode: '' 
        }); 
    }

    setEditMode(event) { this.setState({ editMode: event }); }

    render() {

        const { 
            classes,
            logInDisplay,
            logInUsername,
            logInPassword,
            account, 
            dbSpread, 
            handleUsername,
            handlePassword,
            postLogIn,
            putSheet 
        } = this.props, { 
            searchInput, 
            searchHelper,
            display, 
            editMode 
        } = this.state;

        return <Grid item xs={12} className={classes.route}>
            {account.username === '' && logInDisplay ? (
                <Container className={classes.container}>
                    <TextField
                        className={classes.input}
                        InputLabelProps={{
                            classes: {
                                focused: classes.focused
                            },
                        }}
                        InputProps={{
                            classes: {
                                root: classes.outline,
                                focused: classes.focused,
                                notchedOutline: classes.notchedOutline
                            },
                        }}
                        label={'Username'}
                        value={logInUsername}
                        onChange={event => handleUsername(event.target.value)}
                        variant='outlined'
                        onKeyPress={event => {
                        if (logInUsername === '' || logInPassword === '') return
                        if(event.key === 'Enter') {
                            event.preventDefault();
                            postLogIn();
                        }
                        }}
                    />
                    <TextField
                        className={classes.input}
                        style={{ marginLeft: '10px' }}
                        type='password'
                        InputLabelProps={{
                            classes: {
                                focused: classes.focused
                            },
                        }}
                        InputProps={{
                            classes: {
                                root: classes.outline,
                                focused: classes.focused,
                                notchedOutline: classes.notchedOutline
                            },
                        }}
                        label={'Password'}
                        value={logInPassword}
                        onChange={event => handlePassword(event.target.value)}
                        variant='outlined'
                        onKeyPress={event => {
                        if (logInUsername === '' || logInPassword === '') return
                        if(event.key === 'Enter') {
                            event.preventDefault();
                            postLogIn();
                        }
                        }}
                    />
                    <Button
                        className={classes.btn}
                        style={{ marginLeft: '10px' }}
                        onClick={() => {
                        if (logInUsername === '' || logInPassword === '') return
                        postLogIn()
                        }}
                    >Log in</Button>
                </Container>
            ) : null }
            <Search
                classes={classes}
                dbSpread={dbSpread}
                searchInput={searchInput}
                searchHelper={searchHelper}
                resetDisplay={this.resetDisplay}
                changeInput={this.changeInput}
                iterateSearch={this.iterateSearch}
            />
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <TableContainer className={`${classes.table} ${classes.tabTable}`}>
                        <Table>
                            <TableBody>
                                {dbSpread.sheet.length !== 0 ? (
                                    dbSpread.sheet.map((sheet, i) => {
                                        return <TableRow>
                                            <TableCell 
                                                key={`ind-${i}`}
                                                className={classes.tabCell}
                                            >
                                                <a
                                                    className={classes.tabTitle}
                                                    href='#'
                                                    onClick={() => {
                                                        this.resetDisplay();
                                                        setTimeout(() => {
                                                            this.iterateSearch(sheet.title);
                                                        }, 500);
                                                    }}
                                                >{sheet.title}</a>
                                            </TableCell>
                                        </TableRow>
                                    })
                                ) : (
                                    <TableCell>No Sheets</TableCell>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={9}>
                    {display.length !== 0 ? (
                        display.map((data, i) => {
                            return <Sheet 
                                key={`sheet-${i}`}
                                classes={classes}
                                account={account}
                                dbSpread={dbSpread}
                                putSheet={putSheet}
                                data={data}
                                editMode={editMode}
                                setEditMode={this.setEditMode}
                                searchInput={searchInput}
                                resetDisplay={this.resetDisplay}
                            />
                        })
                    ) : null }
                </Grid>
            </Grid>
        </Grid>
    }
}