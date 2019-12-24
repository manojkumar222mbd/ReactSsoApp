import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = {
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: 2,
        flex: 1,
    }
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class AssignUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }


    render() {
        const { classes } = this.props;
        // const handleClickOpen = () => {
        //     this.setState({ open: true });
        // };

        const handleClose = () => {
            this.setState({ open: false });
        };
        return (
            <div >
                <Dialog fullScreen open={this.props.AssignUserDialog} onClose={handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}> Sound </Typography>
                            <Button autoFocus color="inherit" onClick={handleClose}> Close </Button>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem button>
                            <ListItemText primary="Phone ringtone" secondary="Titania" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                        </ListItem>
                    </List>
                </Dialog>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(AssignUser));