import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LoginAction from '../../../../redux/login/LoginAction';

const useStyles = theme => ({
    root: {
        boxShadow: 'none',
        zIndex: theme.zIndex.drawer + 1,
    },
    flexGrow: {
        flexGrow: 1
    },
    signOutButton: {
        marginLeft: theme.spacing(1)
    },
    title: {
        marginLeft: '12px',
        marginTop: '4px'
    },
    logo: {
        height: 40,
        width: 40
    }
});

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.is_login !== this.props.is_login && this.props.is_login === false) {
            this.props.history.push("/login");
        }
    }

    LogOut = () => {
        this.props.logOut();
    }

    render() {
        const { classes } = this.props;
        const { className } = this.props;
        return (
            <AppBar className={clsx(classes.root, className)} >
                <Toolbar>
                    <VpnKeyIcon className={classes.logo} />
                    <Typography variant="h6" className={classes.title} noWrap >SSO Admin</Typography>
                    <div className={classes.flexGrow} />
                    <Hidden mdDown>
                        <Typography noWrap>{this.props.user.name} [{this.props.user.scope}]</Typography>
                        <IconButton
                            className={classes.signOutButton}
                            color="inherit"
                            onClick={this.LogOut}
                        >
                            <InputIcon />
                        </IconButton>
                    </Hidden>
                    <Hidden smUp>
                        <IconButton
                            color="inherit"
                            onClick={this.props.handleClick}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        logout: state.loginView.logout,
    }
};

const mapDispatchToProps = {
    logOut: LoginAction.logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Header));