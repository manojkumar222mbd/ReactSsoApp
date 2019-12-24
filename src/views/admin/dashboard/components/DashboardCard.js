import React from 'react';
import { connect } from 'react-redux'
import clsx from 'clsx';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = {
    root: {
        height: '100%'
    },
    content: {
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        fontWeight: 700
    },
    avatar: {
        height: 40,
        width: 40
    },
    value: {
        float: "left",
    }
};

class DashboardCard extends React.Component {
    render() {
       
        const { classes } = this.props;
        return (
            <Card className={clsx(classes.root)} >
                <CardContent>
                    <Grid container justify="space-between" >
                        <Grid item>
                            <Typography
                                className={classes.title}
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                {this.props.text}
                            </Typography>
                            <Typography variant="h4" className={classes.value} >{this.props.value}</Typography>
                        </Grid>
                        <Grid item>
                            <Avatar className={classes.avatar} style={{backgroundColor : this.props.color}} >  
                                {this.props.icon}
                            </Avatar>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(DashboardCard));