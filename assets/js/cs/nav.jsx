import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

let LoginForm = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
    api.submit_login(props.login);
    console.log(props.login);
  }

  return <div className="navbar-text">
    <Form inline>
      <FormGroup>
        <Input type="text" name="name" placeholder="name"
               value={props.login.name} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="pass" placeholder="password"
               value={props.login.pass} onChange={update} style={{marginLeft: 10}}/>
      </FormGroup>
      <Button onClick={create_token} style={{marginLeft: 10}}>Log In</Button>
    </Form>
  </div>;
});

let Session = connect(({token}) => {return {token};})((props) => {

  function logout(){
    props.dispatch({
      type: 'CLEAR_TOKEN',
    });
  }

  return <div className="navbar-text">
    User id = { props.token.user_id } | <Button className="btn btn-primary" onClick={logout}>Log out</Button>
  </div>;
});

function Nav(props) {
  let session_info;

 if (props.token) {
   session_info = <Session token={props.token} />;
    api.request_tasks();
 }
 else {
   session_info = <LoginForm />
 }

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <span className="navbar-brand">
        Tasktracker
      </span>
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">TaskFeed</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/users" href="#" className="nav-link">All Users</NavLink>
        </NavItem>
      </ul>
      { session_info }
    </nav>
  );
}

function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props)(Nav);
