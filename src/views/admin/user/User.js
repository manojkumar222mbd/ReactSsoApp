import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

//User Component
import UserList from './components/UserList';
import UserToolbar from './components/UserToolbar';
import AddEditUser from './components/AddEditUser';

//import UserAction from '../../../redux/user/UserAction';

const useStyles = {
    root: {
        display: 'flex',
    }
};


class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <UserToolbar />
                <AddEditUser />
                <UserList />
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(User));