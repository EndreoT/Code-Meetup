import React from "react";
import API from "../utils/API";
import FullEvent from "../components/fullEvent";
import axios from "axios";
import { Jumbotron, Button, Container, Row, Col } from "react-bootstrap";
import { CreateBtn } from "../components/btn";
import { Form, Input, FormBtn, TextArea } from "../components/Form";
import { List, ListItem } from "../components/List";
import { Link } from "react-router-dom";
import Calendar from '../components/calendar'
import "../components/calendar/index.css"
//import '@lls/react-light-calendar/dist/index.css'

import LocationSearchInput from '../components/googleMapsSearchAutocomplete'
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';



class CreateEvent extends React.Component {
  state = {
    creator: '5d42469179ae427c10e6d2ed',
    title: '',
    description: '',
    date: '',
    address: '',
    latLng: {},
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (
      this.state.title && 
      this.state.description &&
      this.state.address
      ) {
      API.createEvent({
        title: this.state.title,
        description: this.state.description,
        creator: this.state.creator,
        street_address: this.state.address,
        location: {
          type: 'Point',
          coordinates: [
            this.state.latLng.lng,
            this.state.latLng.lat
          ]
        }
      })
        .then(event => console.log(event))
        .catch(err => console.log(err));
    }
  };

  handleLocationSearchChange = address => {
    this.setState({ address });
  };

  handleLocationSearchSelect = async address => {
    await this.setState({ address })
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(async latLng => {
        console.log(latLng)
        await this.setState({ latLng })
      })
      .catch(error => console.error('Error', error));
  };

  render() {
    return (
      <Container fluid>
        {/* {this.state.title + this.state.description} */}
        <Row>
          <Col size="md-6">

            <Jumbotron>
              <h1>Create an Event</h1>
            </Jumbotron>

            <form>

              {/* Event title */}
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />

              {/* Event description */}
              <Input
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder=" Description (required)"
              />
              
              <Calendar startDate={new Date().getTime()} displayTime />
            
              {/* <LocationSearchInput></LocationSearchInput> */}

              {/* Google Location autocomplete search */}
              {this.state.address}
              <LocationSearchInput
                value={this.state.address}
                onChange={this.handleLocationSearchChange}
                onSelect={this.handleLocationSearchSelect}
              />

              <FormBtn
                disabled={!(this.state.description && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Event
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            {/* <Jumbotron>
              <h1>My Events</h1>
            </Jumbotron> */}
            {/* {this.state.events.length ? (
              <List>
                {this.state.events.map(event => (
                  <ListItem key={eventNames._id}>
                    <Link to={"/events/" + event._id}>
                      <strong>
                        {event.title} by {event.author}
                      </strong>
                    </Link>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )} */}
          </Col>
        </Row>
      </Container>
    );
  }
}


export default CreateEvent;