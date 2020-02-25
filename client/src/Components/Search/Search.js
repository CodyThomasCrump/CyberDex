import React from 'react';
import { 
    TextField,
    Button, 
    Container
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export default (props) => {

    return <Container className={props.classes.container}>
        <TextField
            className={props.classes.input}
            InputLabelProps={{
                classes: {
                    focused: props.classes.focused
                },
            }}
            InputProps={{
                classes: {
                    root: props.classes.outline,
                    focused: props.classes.focused,
                    notchedOutline: props.classes.notchedOutline
                },
            }}
            label={`Search ${props.dbSpread.title}`}
            value={props.searchInput}
            onChange={event => props.changeInput(event)}
            error={props.searchHelper !== ''}
            helperText={props.searchHelper}
            variant='outlined'
            onKeyPress={event => {
                if (props.searchInput === '') return
                if (event.key === 'Enter') {
                    event.preventDefault();
                    props.resetDisplay();
                    setTimeout(() => {
                        props.iterateSearch();
                    }, 500);
                }
            }}
        />
        <Button 
            className={props.classes.searchBtn}
            onClick={() => {
                if (props.searchInput === '') return
                props.resetDisplay();
                setTimeout(() => {
                    props.iterateSearch();
                }, 500);
            }}
        >
            <SearchIcon/>
        </Button>
    </Container>
}