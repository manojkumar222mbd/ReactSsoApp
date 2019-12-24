import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

//Tenant Component
import TenantList from './components/TenantList';
import TenantToolbar from './components/TenantToolbar';
import AddEditTenant from './components/AddEditTenant';

const useStyles = {
    root: {
        display: 'flex',
    }
};


class Tenant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowAddEditTenant: false
        }
    }
    showAddEditDrawer = () => {
        this.setState({ isShowAddEditTenant: true });
    }

    hideAddEditDrawer = () => {
        this.setState({ isShowAddEditTenant: false });
    }

    render() {
        const userData = [
            {
                id: 1,
                name: 'Ekaterina Tankova',
                address: 'West Virginia',
                email: 'ekaterina.tankova@devias.io',
                phone: '304-428-3097',
                created_datetime: 1555016400000
            },
            {
                id: 2,
                name: 'Cao Yu',
                address: 'Bristow',
                email: 'cao.yu@devias.io',
                phone: '712-351-5711',
                created_datetime: 1555016400000
            },
            {
                id: 3,
                name: 'Alexa Richardson',
                address: 'Georgia',
                email: 'alexa.richardson@devias.io',
                phone: '770-635-2682',
                created_datetime: 1555016400000
            },
            {
                id: 4,
                name: 'Anje Keizer',
                address: 'Ohio',
                email: 'anje.keizer@devias.io',
                phone: '908-691-3242',
                created_datetime: 1554930000000
            },
            {
                id: 5,
                name: 'Clarke Gillebert',
                address: 'Texas',
                email: 'clarke.gillebert@devias.io',
                phone: '972-333-4106',
                created_datetime: 1554757200000
            },
            {
                id: 6,
                name: 'Adam Denisov',
                address: 'California',
                email: 'adam.denisov@devias.io',
                phone: '858-602-3409',
                created_datetime: 1554670800000
            },
            {
                id: 7,
                name: 'Ava Gregoraci',
                address: 'California',
                email: 'ava.gregoraci@devias.io',
                phone: '415-907-2647',
                created_datetime: 1554325200000
            },
            {
                id: 8,
                name: 'Emilee Simchenko',
                address: 'Nevada',
                email: 'emilee.simchenko@devias.io',
                phone: '702-661-1654',
                created_datetime: 1523048400000
            },
            {
                id: 9,
                name: 'Kwak Seong-Min',
                address: "Michigan",
                email: 'kwak.seong.min@devias.io',
                phone: '313-812-8947',
                created_datetime: 1523048400000
            },
            {
                id: 10,
                name: 'Merrile Burgett',
                address: "Utah",
                email: 'merrile.burgett@devias.io',
                phone: '801-301-7894',
                created_datetime: 1523048400000
            }
        ];
        return (
            <div>
                <TenantToolbar showDrawer={this.showAddEditDrawer} />
                <AddEditTenant isShowAddEditTenant={this.state.isShowAddEditTenant} hideDrawer={this.hideAddEditDrawer} />
                <TenantList users={userData} showDrawer={this.showAddEditDrawer} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Tenant));