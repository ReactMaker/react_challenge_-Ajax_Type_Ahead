import React, { Component } from 'react';

import './Home.less';

export default class Home extends Component {
  state = {
    endpoint: 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json',
    cities: [],
    filteredCities: [],
    searchWord: ''
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { endpoint } = this.state;
    fetch(endpoint)
      .then(blob => blob.json())
      .then(data => this.setState({cities: data}));
  }

  numberWithCommas = value => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  findMatches = (e) => {
    const { cities } = this.state;
    const filteredCities = cities.filter((place) => {
      const regex = new RegExp(e.target.value, 'gi');
      return place.city.match(regex) || place.state.match(regex);
    });
    this.setState({filteredCities, searchWord: e.target.value});
  }

  render() {
    const { filteredCities, searchWord } = this.state;
    return (
      <div className="pageHome">
        <form className="search-form">
          <input type="text" className="search" placeholder="City or State" onChange={this.findMatches} />
          <ul className="suggestions">
            {
              filteredCities.map((place) => {
                const regex = new RegExp(searchWord, 'gi');
                const cityName = <span dangerouslySetInnerHTML={{__html: place.city.replace(regex, `<span class="hl">${searchWord}</span>`)}} />;
                const stateName = <span dangerouslySetInnerHTML={{__html: place.state.replace(regex, `<span class="hl">${searchWord}</span>`)}} />;
                return (
                  <li>
                    <span className="name">
                      {cityName}, {stateName}
                    </span>
                    <span className="population">{this.numberWithCommas(place.population)}</span>
                  </li>
                );
              })
            }
          </ul>
        </form>
      </div>
    );
  }
}
