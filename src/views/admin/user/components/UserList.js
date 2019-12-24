import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import UserAction from '../../../../redux/user/UserAction';

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
    title: {
        flex: '10 10 100%',
        marginRight: '80%'
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

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            table: {
                limit: 5,
                offset: 0,
                search: ''
            }
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(() => ({ table: { ...this.state.table, [name]: value } }))
    }

    handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.fetchUser(this.state.table);
        }
    }

    componentDidMount() {
        this.props.fetchUser(this.state.table);
    }

    render() {
        const { classes } = this.props;
        const page = 0;
        const rowsPerPage = this.state.table.limit;
        const handlePageChange = (event, page) => {
            //this.state.table.offset = page * this.state.table.limit;
        };

        const handleRowsPerPageChange = event => {
            this.setState({
                table: {
                    ...this.state.table,
                    limit: event.target.value,
                }
            }, () => this.props.fetchUser(this.state.table));
        };

        return (
            <Card className={classes.root} >
                <CardContent className={classes.content}>
                    <Grid container spacing={3} style={{ marginTop: '5px' }}>
                        <Grid item xs={4} >
                            <Typography className={classes.tableTitle} variant="h6" id="tableTitle">
                                Users
                            </Typography>
                        </Grid>
                        <Grid item xs={8} >
                            <div className={classes.tools}>
                                <TextField className={classes.input}
                                    id="standard-search"
                                    label="Search User"
                                    type="search"
                                    value={this.state.table.search}
                                    name="search"
                                    onChange={this.handleChange}
                                    onKeyPress={this.handleEnterKeyPress}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <div className={classes.inner}>
                        <Table>
                            <TableHead>
                                <TableRow >
                                    <TableCell  >Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Created date</TableCell>
                                    <TableCell>Applications</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell align="center" >Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
                                    <TableRow className={classes.tableRow} hover key={user.id} >
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>
                                            {user.created_datetime}
                                        </TableCell>
                                        <TableCell>
                                            <Button size="small" variant="outlined" color="primary">
                                                12
                                        </Button>
                                        </TableCell>
                                        <TableCell>
                                            {user.status === 0 ? 'Deactive' : 'Active'}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton aria-label="edit" onClick={event => this.props.showAddEditPopUp(user)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete" onClick={event => this.props.deleteUser(user.id)} >
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
                        count={this.props.userList.length}
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handleRowsPerPageChange}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 20, 50, 100]}
                    />
                </CardActions>
            </Card>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userList: state.UserView.userList
    }
};

const mapDispatchToProps = {
    fetchUser: UserAction.fetchUser,
    showAddEditPopUp: UserAction.showAddEditPopUp,
    deleteUser: UserAction.deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(UserList));