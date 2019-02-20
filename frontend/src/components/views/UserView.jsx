import React, { Component } from "react";
import UserForm from "../UserForm";

export default class UserView extends Component {
    render() {
        return (
            <React.Fragment>
                <UserForm endpoint="/api/create_user/" />
            </React.Fragment>
        );
    }
}