import React from 'react';
import { connect } from 'react-redux';
import SnackbarAction from '../../redux/snackbar/SnackbarAction';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

const useStyles = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    }
});

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

class SnackbarToast extends React.Component {
 
    handleClose = () => {
        this.props.hideSnack();
    }
    render() {
        const Icon = variantIcon[this.props.type];
        const { classes } = this.props;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.props.status}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                >
                    <SnackbarContent
                        className={classes[this.props.type]}
                        aria-describedby="client-snackbar"
                        message={
                            <span id="client-snackbar" className={classes.message}>
                                <Icon className={clsx(classes.icon, classes.iconVariant)} />
                                {this.props.message}
                            </span>
                        }
                        action={[
                            <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleClose}>
                                <CloseIcon className={classes.icon} />
                            </IconButton>,
                        ]}
                    />
                </Snackbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        type: state.Snackbar.type,
        message: state.Snackbar.message,
        status: state.Snackbar.status
    }
};

const mapDispatchToProps = {
    hideSnack: SnackbarAction.hideSnack
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SnackbarToast));