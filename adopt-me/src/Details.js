/* eslint-disable no-undef */
import React, { Component } from "react";
import { withRouter } from "react-router";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemneContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  state = { loading: true, showModal: false };
  constructor() {
    super();
  }

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();

    this.setState(
      Object.assign(
        {
          loading: false,
        },
        json.pets[0]
      )
    );
  }

  toogleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  adopt = () => (window.location = "http://bit.ly/pet-adopt");

  render() {
    if (this.state.loading) {
      return <h1>Loading</h1>;
    }
    const { animal, breed, city, state, description, images, name, showModal } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          <ThemneContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toogleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemneContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <ThemneContext.Consumer>
              {([theme]) => (
                <Modal>
                  <div>
                    <h1>Would you like to adopt {name}</h1>
                    <div className="buttons">
                      <button
                        style={{ backgroundColor: theme }}
                        onClick={this.adopt}
                      >
                        Yes
                      </button>
                      <button
                        style={{ backgroundColor: theme }}
                        onClick={this.toogleModal}
                      >
                        No, I am a monster
                      </button>
                    </div>
                  </div>
                </Modal>
              )}
            </ThemneContext.Consumer>
          ) : null}
        </div>
      </div>
    );
  }
}
/*
const Details = () => {
  return <h2>hi lololol</h2>;
};
*/

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
