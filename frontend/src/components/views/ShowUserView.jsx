import React, { Component } from "react";
import DataProvider from "../DataProvider";
import Table from "../Table";

export default class ShowUserView extends Component {
    render() {
        return (
            <React.Fragment>
                <DataProvider endpoint="/api/list_users/" render={data => <Table data={data} />} />
            </React.Fragment>
        );
    }
}