import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = {
    root: {
        marginBottom: '20%',
    },
    content: {
        width: 400,
    }
};

class AddEditGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div >
                <Dialog className={classes.root} open={this.props.isShowGroupModal} onClose={this.props.hideGroupModal} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add/Edit Group</DialogTitle>
                    <DialogContent className={classes.content}>
                        {/* <DialogContentText>
                            Please enter group name
                        </DialogContentText> */}
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Group Name"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.hideGroupModal} color="primary"> Cancel </Button>
                        <Button color="primary"> Save </Button>
                    </DialogActions>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(AddEditGroup));