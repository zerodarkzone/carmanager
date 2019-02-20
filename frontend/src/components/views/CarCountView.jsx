import React, { Component } from "react";
import DataProvider from "../DataProvider";
import Table from "../Table";

export default class CarCountView extends Component {
    render() {
        return (
            <React.Fragment>
                <DataProvider endpoint="/api/count_cars/" render={data => <Table data={data} />} />
            </React.Fragment>
        );
    }
}