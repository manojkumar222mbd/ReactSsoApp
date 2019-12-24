import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
    actions: {
        justifyContent: 'flex-end'
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
class GroupList extends React.Component {
    render() {
        const { classes } = this.props;
        const { groups } = this.props;
        const rowsPerPage = 20;
        //const setRowsPerPage = 20;
        const page = 0;
        //const setPage = 20;
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
                                Groups
                            </Typography>
                        </Grid>
                        <Grid item xs={8} >
                            <div className={classes.tools}>
                                <Button className={classes.btn} color="primary" variant="contained" onClick={this.props.showGroupModal}> Add Group </Button>
                                <TextField className={classes.input} id="standard-search" label="Search Group" type="search" />
                            </div>
                        </Grid>
                    </Grid>
                    <div className={classes.inner}>
                        <Table>
                            <TableHead >
                                <TableRow >
                                    <TableCell>Group Name</TableCell>
                                    <TableCell>Users</TableCell>
                                    <TableCell>Applications</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {groups.slice(0, rowsPerPage).map(user => (
                                    <TableRow hover key={user.id} >
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>
                                            <Button size="small" variant="outlined" color="primary">
                                                124
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button size="small" variant="outlined" color="primary">
                                                101
                                        </Button>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton aria-label="edit" onClick={this.props.showGroupModal}>
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
                        count={groups.length}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(GroupList));