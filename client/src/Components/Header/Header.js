import React from 'react';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
    AppBar, 
    Toolbar,
    Container,
    Typography,
    Grid,
} from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MenuIcon from '@material-ui/icons/Menu'

export default (props) => {

    return <Grid item xs={12}>
        <AppBar 
            className={props.classes.appBar}
            position='static'
        >
            <Toolbar className={props.classes.toolBar}>
                <Link 
                    className={props.classes.homeLink}
                    onClick={() => props.handleDisplay(false)}
                    to='/'
                >
                    <h1 className={props.classes.cyber}>Cyber</h1>
                    <h1 className={props.classes.dex}>Dex</h1>
                </Link>
                <Container className={props.classes.acc}>
                    <AccountBoxIcon/>
                    {props.account.username !== '' ? (
                        <Typography className={props.classes.accLink}>
                            {props.account.username}
                        </Typography>
                    ) : (
                        <Link 
                            className={props.classes.accLink}
                            onClick={() => props.handleDisplay()}
                            to='/'
                        >Log in</Link>
                    )}
                </Container>
                <Container className={props.classes.right}>
                    {props.account.username !== '' ? (
                        <>
                            <Link
                                className={props.classes.rightLink}
                                to='/account'
                            >Account</Link>
                            {(props.account.type === 'admin' || props.account.type === 'master') ? (
                                <>
                                    <Link 
                                        className={props.classes.rightLink}
                                        to='/edit'
                                    >Edit</Link>
                                    <Link 
                                        className={props.classes.rightLink}
                                        to='/history' 
                                    >History</Link>
                                </>
                            ) : null }
                            <Link
                                className={props.classes.rightLink}
                                onClick={() => props.handleLogOut()}
                                to='/'
                            >Log out</Link>
                        </>
                    ) : null }
                </Container>
            </Toolbar>
        </AppBar>
    </Grid>
}