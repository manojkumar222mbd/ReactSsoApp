import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = {
    root: {},
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: 1,
        marginBottom:15
    },
    spacer: {
        flexGrow: 1
    },
    importButton: {
        marginRight: 1
    },
    exportButton: {
        marginRight: 1
    },
    searchInput: {
        display: 'flex'
    }
};

class TenantToolbar extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <div className={classes.row}>
                    <span className={classes.spacer} />
                    <Button className={classes.exportButton}>Export to CSV</Button>
                    <Button color="primary" variant="contained" onClick={this.props.showDrawer} > Add Tenant </Button>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(TenantToolbar));