import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Events from "./components/Events";
import CreateEventForm from "./components/Events/CreateEventForm";
import EditFormPage from "./components/Events/EditEventPage";
import { getAllEvents } from "./store/events";
import Groups from "./components/Groups";
import CreateGroupPage from "./components/Groups/createGroupPage";
import EditGroupPage from "./components/Groups/EditGroupPage";
import EventPage from "./components/Events/EventPage";
import GroupPage from "./components/Groups/GroupPage";
import Results from "./components/Results";

function App() {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getAllEvents())
  }, [dispatch]);


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
            <Events />
          </Route>
          <Route exact path="/events/new">
            <CreateEventForm />
          </Route>
          <Route exact path="/events/:eventId">
            <EventPage />
          </Route>
          <Route exact path="/events/:eventId/edit">
            <EditFormPage />
          </Route>
          <Route exact path="/groups">
            <Groups />
          </Route>
          <Route exact path="/groups/new">
            <CreateGroupPage />
          </Route>
          <Route exact path="/groups/:groupId">
            <GroupPage />
          </Route>
          <Route exact path="/groups/:groupId/edit">
            <EditGroupPage />
          </Route>
          <Route exact path="/results/:searchQuery">
            <Results />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;