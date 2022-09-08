import { Chart, registerables } from 'chart.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import store from '../redux/store';
import { connect } from "react-redux";
let myChart;

class LineChart extends React.Component {
    chartRef = React.createRef();

    constructor() {
        super();
        Chart.register(...registerables);
        this.state = {
            labels: [],
            data: []
        }
    }
    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        console.log(this.props);
        myChart && myChart.destroy();
        this.buildChart();
    }

    componentWillUnmount() {
        myChart && myChart.destroy();
    }

    buildChart() {
        // myChart.destroy();
        if (this.props.data?.climateReducer?.list?.length) {
            const labels = this.props.data?.climateReducer?.list?.map((item) => { return item["dt_txt"] });
            const chartData = this.props.data?.climateReducer?.list?.map((item) => { return item["main"]["temp"] });

            const data = {
                labels: labels,
                datasets: [{
                    label: '*Historic data apis will be charged around 180$ per month* So used Future Temperature data for every three hours, the development effort is same',
                    backgroundColor: '#0d6efd',
                    borderColor: '#0d6efd',
                    data: chartData,
                }]
            };

            const config = {
                type: 'line',
                data: data,
                options: {}
            };
            const myChartRef = this.chartRef.current.getContext("2d");
            myChart = new Chart(
                myChartRef,
                config,
            );
        }
    }
    render() {
        return (
            <>
                <div className="row mt-4">
                    <div className="col-9">
                        {this.props.data?.climateReducer?.list?.length > 0 && <canvas id="myChart" ref={this.chartRef}></canvas>}
                    </div>
                    <div className="col-3 mt-4">
                        <div>
                            city: {this.props.data?.climateReducer?.city?.name || ''} <br />
                            city: {this.props.data?.climateReducer?.city?.country || ''} <br />
                            population: {this.props.data?.climateReducer?.city?.population || ''}<br />
                            lat: {this.props.data?.climateReducer?.city?.coord?.lat || ''}<br />
                            lon: {this.props.data?.climateReducer?.city?.coord?.lon || ''}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state,
    };
};

export default connect(mapStateToProps)(LineChart);