import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

//Group Component
import GroupList from './components/GroupList';
import AddEditGroup from './components/AddEditGroup';
import AssignUser from '../user/components/AssignUser';
const useStyles = {
    root: {
        display: 'flex',
    }
};


class Group extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowGroupModal: false
        }
    }
    showGroupModal = () => {
        this.setState({ isShowGroupModal: true });
    }

    hideGroupModal = () => {
        this.setState({ isShowGroupModal: false });
    }

    render() {
        const groupData = [
            {
                id: 1,
                name: 'Manager',
            },
            {
                id: 2,
                name: 'Assistant Manager',
            },
            {
                id: 3,
                name: 'Operations',
            },
            {
                id: 4,
                name: 'Sales',
            }
        ];
        return (
            <div>
                <AddEditGroup isShowGroupModal={this.state.isShowGroupModal} hideGroupModal={this.hideGroupModal} />
                <GroupList groups={groupData} showGroupModal={this.showGroupModal} AssignUserDialog={this.props.AssignUserDialog} />
                <AssignUser AssignUserDialog={this.props.AssignUserDialog} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Group));