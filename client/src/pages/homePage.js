import React from 'react';
import API from '../utils/API';
import EventCard from '../components/eventcard';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import './style.css';


class HomePage extends React.Component {

  state = {
    events: [],
  }

  componentDidMount() {
    API.findAllEvents()
      .then(res => {
        this.setState({ events: res.data });
      })
      .catch(err => console.log(err));
  }

  renderEventCards = () => {

    return this.state.events.map(event => (
      <EventCard
        title={event.title}
        description={event.description}
        date={event.date}
        location={event.street_address}
        key={event._id}
        id={event._id}
        creator={event.creator}
        // use for month/day/time am/pm format
        format={event.dateFormatted}
      />
    ));
  }

  render() {

    return (
      <div>
        <div>
          <Jumbotron className="jumbotron__homepage" fluid>
            <Container id="bannerText" fluid>
              <h1 className="brand" style={{color: 'white', marginTop: '4.5rem', fontSize: '8vw'}}>
                <div id="title">
                  <span>&#60;</span>
                rendezvous
                  <span> &#8725;</span>
                  <span>&#62;</span>
                </div>
              </h1>
              <h3 id="titleDesc" style={{fontSize: '3.3vw', marginTop: '.6rem'}}>A meet up application where you can create events to network and code.</h3>
            </Container>
          </Jumbotron>
        </div>
        <div>
          <Row style={{ marginBottom: '5rem' }}>
            <Col>
              {this.renderEventCards()}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}


export default HomePage;