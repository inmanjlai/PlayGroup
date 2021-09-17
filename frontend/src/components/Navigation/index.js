import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from '../SearchBar';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log in</NavLink>
        <NavLink to="/signup">Sign up</NavLink>
      </>
    );
  }

  return (
    <nav>
        <h2 className="logo"><NavLink exact to="/events">PlayGroup</NavLink></h2>
        <SearchBar />
        <ul>
          <li>
              {isLoaded && sessionLinks}
          </li>
        </ul>
    </nav>
  );
}

export default Navigation;