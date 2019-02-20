import React, { Component } from "react";
import CarForm from "../CarForm";

export default class CarView extends Component {
    render() {
        return (
            <React.Fragment>
                <CarForm endpoint="/api/add_car/" />
            </React.Fragment>
        );
    }
}