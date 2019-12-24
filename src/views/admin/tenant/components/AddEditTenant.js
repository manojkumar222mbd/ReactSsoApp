import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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

class AddEditTenant extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    toggleDrawer = () => {

    }
    render() {
        const { classes } = this.props;

        const [values, setValues] = [{
            firstName: 'Shen',
            lastName: 'Zhi',
            email: 'shen.zhi@devias.io',
            phone: '',
            state: 'Alabama',
            country: 'USA'
        }];

        const handleChange = event => {
            // setValues({
            //   ...values,
            //   [event.target.name]: event.target.value
            // });
        };

        const states = [
            {
                value: '1',
                label: 'Activate'
            },
            {
                value: '0',
                label: 'Deactivate'
            }
        ];

        return (
            <div >
                <Drawer anchor="right" open={this.props.isShowAddEditTenant} onClose={this.toggleDrawer('right', false)}>
                    <Card className={classes.root} >
                        <form autoComplete="off" noValidate >
                            <CardHeader
                                subheader="The information can be edited"
                                title="Add Edit Tenant"
                                action={
                                    <IconButton aria-label="settings" onClick={this.props.hideDrawer}>
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
                                            helperText="Please specify the name"
                                            label="Name"
                                            margin="dense"
                                            name="Name"
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12} >
                                        <TextField
                                            fullWidth
                                            label="Email Address / Username"
                                            margin="dense"
                                            name="email"
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12} >
                                        <TextField
                                            fullWidth
                                            label="Password"
                                            margin="dense"
                                            name="password"
                                            type="password"
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12} >
                                        <TextField
                                            fullWidth
                                            label="Address"
                                            margin="dense"
                                            name="email"
                                            type="text"
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12} >
                                        <TextField
                                            fullWidth
                                            label="Phone Number"
                                            margin="dense"
                                            name="phone"
                                            onChange={handleChange}
                                            type="text"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12} >
                                        <TextField
                                            fullWidth
                                            label="Status"
                                            margin="dense"
                                            name="state"
                                            onChange={handleChange}
                                            required
                                            select
                                            SelectProps={{ native: true }}
                                            value={values.state}
                                            variant="outlined"
                                        >
                                            {states.map(option => (
                                                <option
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </CardContent>

                            <CardActions>
                                <Button color="primary" variant="contained" > Save </Button>
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

    }
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(AddEditTenant));