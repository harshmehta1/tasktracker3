import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

let RegisterForm = connect(({register}) => {return {register};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_REGISTER_FORM',
      data: data,
    });
  }

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function add_user(ev) {
    if (props.register.name == "" || props.register.name == null
        || props.register.email == "" || props.register.email == null
        || props.register.password == "" || props.register.password == null
      ){
          alert("Please enter all values before pressing Register");
          console.log("ERROR!")
    } else {

        if(props.register.password.length < 8){
          alert ("Password must be of 8 characters");
        } else if(!validateEmail(props.register.email)){
          alert("Enter a valid email ID");
        } else {
          api.submit_register(props.register);
        }
    }
    console.log(props.register);
  }

  return <div className="navbar-text" style={{marginLeft: "auto", marginRight: "auto", width: 100+"%", marginTop: 5+"%"}}>
    <Form>
      <h4>Register</h4>
      <FormGroup>
        <Input type="text" name="name" placeholder="Name"
               value={props.register.name} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="text" name="email" placeholder="Email"
               value={props.register.email} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="password" placeholder="Password"
               value={props.register.password} onChange={update} />
      </FormGroup>
      <Button onClick={add_user}>Register</Button>
    </Form>
  </div>;
});

function Register(props){
  console.log("INSIDE REGISTER")
  let session_info = <RegisterForm />

  return (
    <div>
       { session_info }
    </div>

  );
}

function state2props(state) {
  return {
    register: state.register,
  };
}

export default connect(state2props)(Register);
