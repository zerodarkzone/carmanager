import React, { Component } from "react";
import DataProvider from "../DataProvider";
import Table from "../Table";

export default class ShowUserView extends Component {

    constructor(props)
    {
        super(props);
        console.log(props)
    }

    render() {
        return (
            <React.Fragment>
                <DataProvider
                    endpoint={"/api/list_users/?search=" + this.props.match.params.search}
                    render={data => <Table data={data} />} />
                <DataProvider
                    endpoint={"/api/list_cars/?search=" + this.props.match.params.search}
                    render={data => <Table data={data} />} />
            </React.Fragment>
        );
    }
}