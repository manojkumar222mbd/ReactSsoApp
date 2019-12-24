import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {
    Card,
    CardActions,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination
} from '@material-ui/core';

const useStyles = {
    root: {},
    content: {
        padding: 0
    },
    inner: {

    },
    nameContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        marginRight: 2
    },
    actions: {
        justifyContent: 'flex-end'
    },
    toolbar: {
        paddingLeft: 20,
        paddingRight: 10,
    },
    tableTitle: {
        float: 'left',
        marginLeft: 20
    },
    btn: {
        marginRight: 20,
    },
    input: {
        marginTop: -12,
        marginRight: 10
    },
    tools: {
        float: 'right'
    }
};
class TenantList extends React.Component {
    render() {
        const { classes } = this.props;
        const { users } = this.props;
        const [rowsPerPage, setRowsPerPage] = [20, 20];
        const [page, setPage] = [0, 25];
        const handlePageChange = (event, page) => {

        };

        const handleRowsPerPageChange = event => {

        };

        return (
            <Card className={classes.root} >
                <CardContent className={classes.content}>
                <Grid container spacing={3} style={{ marginTop: '5px' }}>
                        <Grid item xs={4} >
                            <Typography className={classes.tableTitle} variant="h6" id="tableTitle">
                                Tenant
                            </Typography>
                        </Grid>
                        <Grid item xs={8} >
                            <div className={classes.tools}>
                                <TextField className={classes.input} id="standard-search" label="Search Tenant" type="search" />
                            </div>
                        </Grid>
                    </Grid>
                    <div className={classes.inner}>
                        <Table>
                            <TableHead>
                                <TableRow >
                                    <TableCell>Tenant Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Created date</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.slice(0, rowsPerPage).map(user => (
                                    <TableRow className={classes.tableRow} hover key={user.id} >
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            {user.address}
                                        </TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>
                                            {'10-12-2019'}
                                        </TableCell>
                                        <TableCell>
                                            Active
                                        </TableCell>
                                        <TableCell>
                                            <IconButton aria-label="edit" onClick={this.props.showDrawer}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete">
                                                <DeleteOutlineIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
                <CardActions className={classes.actions}>
                    <TablePagination
                        component="div"
                        count={users.length}
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handleRowsPerPageChange}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                </CardActions>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(TenantList));