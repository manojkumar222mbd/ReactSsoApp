import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import UserAction from '../../../../redux/user/UserAction';
import SnackbarAction from '../../../../redux/snackbar/SnackbarAction';

import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField
} from '@material-ui/core';


const useStyles = {
    root: {
        width: 500,
    },
    fullList: {
        width: 'auto',
    }
};
const initState = {
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    status: '1'
};
class AddEditUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formErr: false,
            data: initState
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(() => ({ data: { ...this.state.data, [name]: value } }))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.IsShow !== this.props.IsShow && this.props.IsShow === false) {
            this.setState({ formErr: false })
        }

        if (prevProps.userData !== this.props.userData && this.props.userData) {
            this.setState({ data: this.props.userData })
        }

        if (prevProps.Message !== this.props.Message && this.props.Message) {
            if (this.props.Message.type === 'success') {
                this.setState({ data: initState });
                this.props.closeAddEditPopUp();
                this.props.fetchUser();
            }
            this.props.showSnack({ type: this.props.Message.type, message: this.props.Message.text });
        }
    }

    submitAddEdit = (e) => {
        this.setState({ formErr: true });
        let { data } = this.state;

        if (data.name !== '' && data.email !== '' && data.password !== '') {
            this.props.addEditUser(data);
        }
    }

    render() {
        const { classes } = this.props;
        const { data, formErr } = this.state;
        return (
            <div >
                <Drawer anchor="right" open={this.props.IsShow}>
                    <Card className={classes.root} >
                        <form autoComplete="off" noValidate >
                            <CardHeader
                                subheader="Please enter the details below"
                                title={this.props.userData.id ? 'Edit User' : 'Add User'}
                                action={
                                    <IconButton aria-label="settings" onClick={this.props.closeAddEditPopUp}>
                                        <CloseIcon />
                                    </IconButton>
                                }
                            />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3} >
                                    <Grid item md={12} xs={12} >
                                        <TextField
                                            fullWidth
                                            label="Name"
                                            margin="dense"
                                            name="name"
                                            onChange={this.handleChange}
                                            value={data.name}
                                            required
                                            variant="outlined"
                                            error={!data.name && formErr}
                                            helperText={!data.name && formErr ? 'Name is required' : ''}
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12} >
                                        <TextField
                                            fullWidth
                                            label="Email Address / Username"
                                            margin="dense"
                                            name="email"
                                            value={data.email}
                                            onChange={this.handleChange}
                                            required
                                            variant="outlined"
                                            error={!data.email && formErr}
                                            helperText={!data.email && formErr ? 'Email is required' : ''}
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12} >
                                        <TextField
                                            fullWidth
                                            label="Password"
                                            margin="dense"
                                            name="password"
                                            value={data.password}
                                            onChange={this.handleChange}
                                            required
                                            variant="outlined"
                                            error={!data.password && formErr}
                                            helperText={!data.password && formErr ? 'Password is required' : ''}
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12} >
                                        <TextField
                                            fullWidth
                                            label="Address"
                                            margin="dense"
                                            name="address"
                                            type="text"
                                            value={data.address}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12} >
                                        <TextField
                                            fullWidth
                                            label="Phone Number"
                                            margin="dense"
                                            name="phone"
                                            value={data.phone}
                                            onChange={this.handleChange}
                                            type="number"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12} >
                                        <TextField
                                            fullWidth
                                            label="Status"
                                            margin="dense"
                                            name="status"
                                            onChange={this.handleChange}
                                            required
                                            select
                                            SelectProps={{ native: true }}
                                            variant="outlined"
                                            value={data.status}
                                        >
                                            <option value={1}>Active</option>
                                            <option value={0}>DeActive</option>
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </CardContent>

                            <CardActions>
                                <Button color="primary" variant="contained" onClick={this.submitAddEdit} >
                                    {this.props.userData.id ? 'Update' : 'Save'}
                                </Button>
                            </CardActions>
                        </form>
                    </Card>
                </Drawer>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        IsShow: state.UserView.IsShow,
        Message: state.UserView.Message,
        userData: state.UserView.userData,
    }
};

const mapDispatchToProps = {
    fetchUser: UserAction.fetchUser,
    addEditUser: UserAction.addEditUser,
    closeAddEditPopUp: UserAction.closeAddEditPopUp,
    showSnack: SnackbarAction.showSnack,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(AddEditUser));