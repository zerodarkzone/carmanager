import React, { Component } from "react";
import {Route, Switch, BrowserRouter, Redirect} from "react-router-dom";
import UserView from "./views/UserView";
import CarView from "./views/CarView";
import CarCountView from "./views/CarCountView";
import ShowCarView from "./views/ShowCarView";
import ShowUserView from "./views/ShowUserView";
import PropTypes from "prop-types";
import {Button, Container, Form, Nav, Navbar} from "react-bootstrap";
import SearchView from "./views/SearchView";



//const App = () => (
//    <React.Fragment>
//        <DataProvider endpoint="get_cars/"
//                      render={data => <Table data={data} />} />
//        <CarForm endpoint="add_car/" />
//    </React.Fragment>
//);
//const wrapper = document.getElementById("app");
//wrapper ? ReactDOM.render(<App />, wrapper) : null;
export default class App extends Component {

    constructor(props)
    {
        super(props)
    }

    static contextTypes = {
        router: PropTypes.object
    };

    state = {
        my_text: ""
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    getCsv = () => {
        const conf = {
            method: "get",
            headers: new Headers({ "Content-Type": "application/json" })
        };
        return fetch("/api/cvs_car/", conf).then(response => response.json());
    };



    downloadCsv = (eventKey) => {
        console.log(eventKey);

        Promise.all([this.getCsv()]).then(response => {
            let element = document.createElement("a");
            let file = new Blob([response[0]["csv"]], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = "carlist.csv";
            element.click();
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { my_text } = this.state;
        console.log(my_text);
        let element = document.createElement("a");
        element.href = "/search/" + my_text;
        console.log(element.href);
        element.click();
    };

    render() {
        const { my_text } = this.state;
        return (
            <React.Fragment>
                <Container>
                    <Navbar bg="light" expand="lg" sticky="top">
                        <Navbar.Brand href="/" style={{marginLeft: 1}}>CarManager</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link href="/create_user/">Add User</Nav.Link>
                            <Nav.Link href="/show_users/">Users</Nav.Link>
                            <Nav.Link href="/add_car/">Add Car</Nav.Link>
                            <Nav.Link href="/car_count/">Count Cars</Nav.Link>
                            <Nav.Link href="/car_list/">Cars Per Brand</Nav.Link>
                        </Nav>
                        <Form inline onSubmit={this.handleSubmit}>
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                className="mr-sm-2"
                                name="my_text"
                                onChange={this.handleChange}
                                value={my_text}
                                required
                            />
                            <Button type="submit" variant="outline-primary">Search</Button>
                        </Form>
                        <Nav onSelect={this.downloadCsv}>
                            <Nav.Link eventKey="download">Download</Nav.Link>
                        </Nav>
                    </Navbar>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" render={() => <div>Sample App to manage cars.</div>}/> />
                            <Route path="/create_user/" component={UserView} />
                            <Route path="/add_car/" component={CarView} />
                            <Route path="/car_count/" component={CarCountView} />
                            <Route path="/car_list/" component={ShowCarView} />
                            <Route path="/show_users/" component={ShowUserView} />
                            <Route path="/search/:search" component={SearchView} />
                        </Switch>
                    </BrowserRouter>
                </Container>
            </React.Fragment>
        );
    }
}