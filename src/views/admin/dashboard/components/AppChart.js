import * as React from 'react';
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

class AppChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <Paper>
                <Chart
                    data={this.props.data}
                >
                    <ArgumentAxis />
                    <ValueAxis max={7} />

                    <BarSeries
                        valueField="val"
                        argumentField="label"
                    />
                    <Title text={this.props.text} />
                    <Animation />
                </Chart>
            </Paper>
        );
    }
}

export default connect()(AppChart);