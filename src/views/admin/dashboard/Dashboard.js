import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AppsIcon from '@material-ui/icons/Apps';
import LaunchIcon from '@material-ui/icons/Launch';
import PersonIcon from '@material-ui/icons/Person';

//Dashboard Component
import DashboardCard from './components/DashboardCard';
import AppChart from './components/AppChart';

const useStyles = {
    root: {
        display: 'flex',
    }
};

class Dashboard extends React.Component {
    render() {
        const data1 = [
            { label: '10-12-2019', val: 10 },
            { label: '09-12-2019', val: 20 },
            { label: '08-12-2019', val: 30 },
            { label: '07-12-2019', val: 75 },
            { label: '06-12-2019', val: 56 },
            { label: '05-12-2019', val: 85 },
            { label: '04-12-2019', val: 100 },
        ];
        const data2 = [
            { label: 'Canvas', val: 150 },
            { label: 'Abc Mouse', val: 800 },
            { label: 'Gmail', val: 480 },
            { label: 'Office 365', val: 700 },
            { label: 'Moodle', val: 310 },
            { label: 'Web Sis', val: 650 },
            { label: 'One Roster', val: 900 },
        ];
        return (
            <div>
                <Grid
                    container
                    spacing={4}
                >
                    <Grid item lg={3} sm={6} xl={3} xs={12} >
                        <DashboardCard card="login" text="Logins Today" value="112" color="#f44336" icon={<LockOpenIcon />} />
                    </Grid>
                    <Grid item lg={3} sm={6} xl={3} xs={12} >
                        <DashboardCard card="login" text="App Launches Today" value="15" color="#4caf50" icon={<LaunchIcon />} />
                    </Grid>
                    <Grid item lg={3} sm={6} xl={3} xs={12} >
                        <DashboardCard card="login" text="Total Apps" value="85" color="#2196f3" icon={<AppsIcon />} />
                    </Grid>
                    <Grid item lg={3} sm={6} xl={3} xs={12} >
                        <DashboardCard card="login" text="Total Users" value="96" color="#673ab7" icon={<PersonIcon />} />
                    </Grid>
                    <Grid item lg={6} sm={6} xl={6} xs={6} >
                        <AppChart text="Login last 7 days" data={data1} />
                    </Grid>
                    <Grid item lg={6} sm={6} xl={6} xs={6} >
                        <AppChart text="Top 10 Applications" data={data2} />
                    </Grid>
                </Grid>
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Dashboard));