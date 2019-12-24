import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Header from './common/header/Header'
import Sidebar from './common/sidebar/Sidebar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

//Component
import Dashboard from './dashboard/Dashboard';
import Tenant from './tenant/Tenant';
import User from './user/User';
import Group from './group/Group';
import Notfound from '../notfound/Notfound';

const useStyles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
    },
    main: {
        padding: 24,
    },
});

class AdminLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarCollapsed: false,
            AssignUserDialog: false
        };
    }
    handleClick = () => {
        this.setState({ sidebarCollapsed: !this.state.sidebarCollapsed });
    }
    handleSidebarClose = () => {
        this.setState({ sidebarCollapsed: false });
    }
    render = () => {
        const { classes } = this.props;
        const { match } = this.props;
        let AuthData = JSON.parse(localStorage.getItem('AuthData'));
        return (
            <div className={classes.root}>
                <CssBaseline />
                <Header
                    handleClick={this.handleClick}
                    sidebarCollapsed={this.state.sidebarCollapsed}
                    history={this.props.history}
                    user={AuthData.user}
                />
                <Sidebar
                    onClose={this.handleSidebarClose}
                    handleClick={this.handleClick}
                    sidebarCollapsed={this.state.sidebarCollapsed}
                    history={this.props.history}
                />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <React.Fragment>
                        <CssBaseline />
                        <Container fixed className={classes.main} >
                            <div>
                                <Switch>
                                    <Route exact path="/admin" component={Dashboard} />

                                    <Route exact path={`${match.url}/dashboard`} component={Dashboard} />

                                    <Route exact path={`${match.url}/tenant`} component={Tenant} />

                                    <Route exact path={`${match.url}/user`} component={User} />

                                    <Route exact path={`${match.url}/group`}
                                        component={() => <Group AssignUserDialog={this.state.AssignUserDialog} />}
                                    />
                                    <Route component={Notfound} />
                                </Switch>
                            </div>
                        </Container>
                    </React.Fragment>
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(AdminLayout));