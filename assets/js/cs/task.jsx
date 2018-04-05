import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText, Button, FormGroup, Label, Input } from 'reactstrap';
import { update, handleCheckbox, submit, clear } from './task-form';
import api from '../api';




function Task(params) {

  function edit(ev){
    let newdata = params.task;
    let action = {
      type: 'UPDATE_FORM',
      data: newdata,
    };
    let newer = {user_id: params.user};
    let action2 = {
      type: 'UPDATE_USERID',
      data: newer,
    }
    params.dispatch(action);
    params.dispatch(action2);

  }

  function del(ev){
    api.delete_task(params.task.id);
    api.request_tasks();
  }


  let task = params.task;
  let crudBtn = <div></div>;
  if (params.user == params.task.user.id){
    crudBtn =<div>
    <Link to={`/tasks/${task.id}`}><Button className="btn btn-info" style={{marginRight: 5}} value={task.id} onClick={edit}>Edit</Button></Link>
    <Button value={task.id} className="btn btn-danger" onClick={del}>Delete</Button></div>;
  }

  return <Card>
    <CardBody>
      <CardTitle>Title: {task.title}</CardTitle>
      <CardText>Description: {task.desc} <br/>Completed: {task.complete.toString()} <br/>Time Taken: {task.time_spent} minutes <br/>Assigned to: {task.user.name}</CardText>
          { crudBtn }
    </CardBody>
  </Card>;
}

function state2props(state) {
  console.log("rerender", state);
  return { tasks: state.tasks };
}

// Export the result of a curried function call.
export default connect(state2props)(Task);
// Attribution - http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/20-redux/notes.html
