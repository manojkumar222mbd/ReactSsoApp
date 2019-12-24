import React from 'react';
import { connect } from 'react-redux'
//import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PersonIcon from '@material-ui/icons/Person';
import AppsIcon from '@material-ui/icons/Apps';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SettingsIcon from '@material-ui/icons/Settings';
import ReportIcon from '@material-ui/icons/Report';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import LoginAction from '../../../../redux/login/LoginAction';



const drawerWidth = 240;
const useStyles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  toolbar: theme.mixins.toolbar,
});

class Sidebar extends React.Component {

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

  handleClick = () => {
    this.setState({ open: !this.state.open });
  }

  LogOut = () => {
    this.props.logOut();
  }

  render() {
    const { classes } = this.props;
    const { container } = this.props;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button key="Dashboard" component={Link} to={'/admin/dashboard'} >
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button key="Tenant" component={Link} to={'/admin/tenant'}  >
            <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
            <ListItemText primary="Tenant" />
          </ListItem>
          <ListItem button key="User" component={Link} to={'/admin/user'}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="User" />
          </ListItem>
          <ListItem button key="Group" component={Link} to={'/admin/group'} >
            <ListItemIcon><GroupAddIcon /></ListItemIcon>
            <ListItemText primary="Group" />
          </ListItem>
          <ListItem button key="Application"
            onClick={this.handleClick}
          >
            <ListItemIcon><AppsIcon /></ListItemIcon>
            <ListItemText primary="Application" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Add & Assign" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="App Connector" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <ReportIcon />
                </ListItemIcon>
                <ListItemText primary="App Report" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button key={'Logout'} onClick={this.LogOut}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItem>
        </List>
      </div>
    );
    return (
      <nav aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor="left"
            open={this.props.sidebarCollapsed}
            onClose={this.props.handleClick}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    is_login: state.loginView.is_login,
  }
};

const mapDispatchToProps = {
  logOut: LoginAction.logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Sidebar));