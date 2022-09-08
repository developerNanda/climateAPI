import './App.css';
import React from 'react';
import { getClimateData } from './redux/actions/ClimateActions'
import { connect } from "react-redux";
import { Container, Row, Col, Input, Button } from 'reactstrap';
import LineChart from './components/LineChart';

class App extends React.Component {

  constructor(props) {
    super(props);
    // this.onChangeSearchWeatherIO = this.onChangeSearchWeatherIO.bind(this);
    this.searchWeather = this.searchWeather.bind(this);
    this.changeMetrics = this.changeMetrics.bind(this);
    this.inputSearchRef = React.createRef();
    this.isF = true;
    this.state = {
      climateData: {},
    };

  }

  searchWeather() {
    this.props.getClimateData(this.inputSearchRef.current.value, this.state.isF);
  }

  changeMetrics(event) {
    console.log(event);
    this.setState(
      {
        isF: event.target.checked
      }
    )
  }

  componentDidMount() {
  }
  render() {
    console.log("in render");
    return (<>
      <div className="container">
        <div className="row mt-4 pt-4">
          <div className="col-9">
            <input type="text" className="form-control" ref={this.inputSearchRef} />
          </div>
          <div className='col-1'>
            <div class="form-check">
              <input
                className="form-check-input mr-2"
                type="checkbox"
                value=""
                id="metricsInput"
                onClick={this.changeMetrics}
              />

              <label for="metricsInput" className="text-middle form-check-label ml-2">{this.state.isF ? "Fahrenheit" : "Celsius"}</label>
            </div>
          </div>
          <div className="col-2">
            <Button
              color="primary"
              onClick={this.searchWeather}
            >
              Weather Search
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <LineChart></LineChart>
          </div>
        </div>
      </div>
    </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    climateData: state.climateData,
  };
};

export default connect(mapStateToProps, { getClimateData })(App);