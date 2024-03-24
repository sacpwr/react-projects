import React from "react";
import "./styles.css";

class WeatherDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherDataByLocation: null,
      isDataFetched: false,
    };
  }

  getWetherData = () => {
    fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timelinemulti?key=PNFNCXQWN4FKFJJF7AQ4HV3S4&locations=London%2CUK%7CParis%2CFrance%7CTokyo%2CJapan%7CCape%20Town%2C%20South%20Africa%7CPune%2CIndia"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((res) => {
        this.setState({
          weatherDataByLocation: res.locations,
          isDataFetched: true,
        });
      });
  };

  render(): React.ReactNode {
    return (
      <>
        <div>
          <button className="load-data" onClick={this.getWetherData}>
            Load Data
          </button>

          <table border={2} className="weather-data">
            <tr>
              <th>Location Name</th>
              <th>Date</th>
              <th>Max Temperature</th>
              <th>Min Temperature</th>
              <th>Humidity</th>
              <th>Wind Speed</th>
            </tr>
            {this.state?.weatherDataByLocation?.map((data: any) => (
              <tr>
                <td>{data.address}</td>
                <td>{data.days[1].datetime}</td>
                <td>{data.days[1].tempmax}</td>
                <td>{data.days[1].tempmin}</td>
                <td>{data.days[1].humidity}</td>
                <td>{data.days[1].windspeed}</td>
              </tr>
            ))}
          </table>
        </div>
      </>
    );
  }
}
export default WeatherDetails;
