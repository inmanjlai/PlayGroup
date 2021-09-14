import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Events from "./components/Events";
import CreateEventForm from "./components/CreateEventForm";
import EditFormPage from "./components/Events/EditEventPage";
import { getAllEvents } from "./store/events";

function App() {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getAllEvents())
  }, [dispatch]);

  const events = useSelector((state) => state.events)

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/events">
            <Events events={events}/>
          </Route>
          <Route exact path="/events/new">
            <CreateEventForm />
          </Route>
          <Route exact path="/events/:eventId/edit">
            <EditFormPage />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;