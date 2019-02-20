import React, { Component } from "react";
import PropTypes from "prop-types";
class CarForm extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired
  };
  state = {
    owner: "",
    brand: "",
    model: "",
    year: "",
    plate: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { owner, brand, model, year, plate } = this.state;
    const lead = { owner, brand, model, year, plate };
    const conf = {
      method: "post",
      body: JSON.stringify(lead),
      headers: new Headers({ "Content-Type": "application/json" })
    };
    fetch(this.props.endpoint, conf).then(response => console.log(response));
  };
  render() {
    const { owner, brand, model, year, plate } = this.state;
    return (
      <div className="column">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Owner</label>
            <div className="control">
              <input
                className="input"
                type="number"
                name="owner"
                onChange={this.handleChange}
                value={owner}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Brand</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="brand"
                onChange={this.handleChange}
                value={brand}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Model</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="model"
                onChange={this.handleChange}
                value={model}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Year</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="number"
                onChange={this.handleChange}
                value={year}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Plate</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="plate"
                onChange={this.handleChange}
                value={plate}
                required
              />
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-info">
              Send message
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default CarForm;