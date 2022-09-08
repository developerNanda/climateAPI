import API from "../API";

class ClimateService {
    async getAll(data, isF) {
        const apiData = {
            countryCode: 'US',
            limit: 5,
            location: data || 'austin',
            lat: 30.4417,
            lon: -97.6811,
            units: isF ? "imperial" : "metric"
        }
        let url = `/geo/1.0/direct?q=${apiData.location}&limit=${apiData.limit}&`;
        if (data && !isNaN(data)) {
            url = `/geo/1.0/zip?zip=${apiData.location},${apiData.countryCode}&limit=${apiData.limit}&`;
        }
        //  geo location api
        // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
        //US for time being

        await API.get(url + "appid=46e4cb16b5740600f921a099e0c21ade").then((response) => {
            console.log(response)
            if (response?.data?.lat) {
                apiData.lat = response?.data?.lat;
                apiData.lon = response?.data?.lon;
            } else if (response?.data[0]?.lat) {
                apiData.lat = response?.data[0]?.lat;
                apiData.lon = response?.data[0]?.lon;
            } else {
                alert("invalid City or Some Unexpected Error please refresh and try");
            }
        }).catch(e => {
            alert("invalid City or Some Unexpected Error please refresh and try")
        });
        let forecastUrk = `/data/2.5/forecast?lat=${apiData.lat}&lon=${apiData.lon}&id=524901&appid=46e4cb16b5740600f921a099e0c21ade&units=${apiData.units}`;
        return API.get(forecastUrk);
    }
}
export default new ClimateService();