/* eslint-disable no-undef */
//mostly look this from the React docs
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    //I would log this to Sentry, Azure, Monitor, New Relic, TrackJS
    console.error("ErrorBoundary caught an error", error, info);
    if (this.state.hasError) {
      setTimeout(() => {
        this.setState({ redirect: TextTrackCue });
      }, 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    if (this.state.hasError) {
      return (
        <h2>
          This listing has an error.{" "}
          <Link to="/"> Click here to bo back to the home page</Link>
        </h2>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
