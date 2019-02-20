import React, { Component } from "react";
import DataProvider from "../DataProvider";
import TableSpan from "../TableSpan";

export default class ShowCarView extends Component {
    render() {
        return (
            <React.Fragment>
                <DataProvider endpoint="/api/get_cars/" render={data => <TableSpan data={data} />} />
            </React.Fragment>
        );
    }
}