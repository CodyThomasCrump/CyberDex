import React from 'react';
import { Link } from 'react-router-dom';
import {
    withWidth,
    AppBar, 
    Toolbar,
    Container,
    Typography,
    Grid,
    Button,
} from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MenuIcon from '@material-ui/icons/Menu';

export default withWidth()(props => {

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
                        props.width !== 'xs' && props.width !== 'sm' ? (
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
                        ) : (
                            <Button
                                onClick={() => props.handleDropdown(!props.dropdown)}
                            >
                                <MenuIcon/>
                            </Button>
                        )
                    ) : null }
                </Container>
            </Toolbar>
        </AppBar>
        {props.dropdown === true ? (
            <Container className={props.classes.headerMenu}
            >
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
            </Container>
        ) : null }
    </Grid>
})