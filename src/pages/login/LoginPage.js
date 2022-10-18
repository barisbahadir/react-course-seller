import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './LoginPage.css';
import React from "react";
import User from "../../models/user";
import {setCurrentUser} from "../../store/actions/user-actions";
import AuthenticationService from "../../services/authentication-service";

function LoginPage(props) {

  const [user, setUser] = useState(new User('', '', ''));
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentUser = useSelector(state => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  //mounted
  useEffect(() => {
    if (currentUser && currentUser.id) {
      navigate('/profile');
    }
  }, []);

  //<input onChange=(event => handleChange(event))>
  const handleChange = (e) => {
    const {name, value} = e.target;

    setUser((prevState => {
      //E.g: prevState ({user: abc, pass: abc}) + newKeyValue ({user: abcd}) => ({user: abcd, pass: abc})
      return {
        ...prevState,
        [name]: value
      };
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setSubmitted(true);

    if (!user.username || !user.password) {
      return;
    }

    setLoading(true);

    AuthenticationService.login(user).then(response => {
      //set user in session.
      dispatch(setCurrentUser(response.data));
      navigate('/profile');
    }).catch(error => {
      console.log(error);
      setErrorMessage('username or password is not valid.');
      setLoading(false);
    })
  };

  return (
      <div className="container mt-5">
        <div className="card ms-auto me-auto p-3 shadow-lg custom-card">

          <FontAwesomeIcon icon={faUserCircle} className="ms-auto me-auto user-icon"/>

          {errorMessage &&
              <div className="alert alert-danger">
                {errorMessage}
              </div>
          }

          <form
              onSubmit={(e) => handleLogin(e)}
              noValidate
              className={submitted ? 'was-validated' : ''}
          >
            <div className="form-group">
              <label htmlFor="username">Username: </label>
              <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="username"
                  value={user.username}
                  onChange={(e) => handleChange(e)}
                  required
              />
              <div className="invalid-feedback">
                Username is required.
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="password"
                  value={user.password}
                  onChange={(e) => handleChange(e)}
                  required
              />
              <div className="invalid-feedback">
                Password is required.
              </div>
            </div>

            <button
                className="btn btn-info w-100 mt-3"
                disabled={loading}>
              Sign In
            </button>

          </form>

          <Link to="/register" className="btn btn-link" style={{color: 'darkgray'}}>
            Create New Account!
          </Link>

        </div>
      </div>
  );
}

export default LoginPage;
