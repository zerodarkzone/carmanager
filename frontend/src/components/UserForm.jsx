import React, { Component } from "react";
import PropTypes from "prop-types";
import ImageUpload from "./ImageUpload"

class UserForm extends Component {

  constructor(props) {
    super(props);
    this.image = React.createRef();
  }

  static propTypes = {
    endpoint: PropTypes.string.isRequired
  };

  state = {
    id: "",
    name: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { id, name } = this.state;
    const id_image = this.image.current.state.imagePreviewUrl.split("base64,").pop();
    const user = { id, name, id_image };


    console.log('handle uploading-', JSON.stringify(user));
    const conf = {
      method: "post",
      body: JSON.stringify(user),
      headers: new Headers({ "Content-Type": "application/json" })
    };
    fetch(this.props.endpoint, conf).then(response => {
      if (!response.ok) {

        throw Error(response.statusText);
      }
      return response;
    }).then( response => {
      console.log("ok");
    }).catch( error => {
      console.log(error);
    });
  };
  render() {
    const { id, name } = this.state;
    return (
      <div className="column">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="name"
                onChange={this.handleChange}
                value={name}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Id</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="id"
                onChange={this.handleChange}
                value={id}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Id_image</label>
            <div>
              <ImageUpload ref={this.image} required/>
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
export default UserForm;