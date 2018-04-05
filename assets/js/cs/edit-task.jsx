import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import Task from './task';
import { browserHistory } from 'react-router'
import { Link } from 'react-router-dom';


let loaded = false;

function EditTask(params) {


  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    params.dispatch(action);
  }

  function handleCheckbox(ev){
    let tgt = $(ev.target);
    let data = {};
    let oldVal = tgt.val();
    let newVal = false;

    if (oldVal == "true"){
      newVal = false;
    } else {
      newVal = true;
    }
    tgt.val(newVal);
    data[tgt.attr('name')] = newVal;
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    params.dispatch(action);
  }

  function submit(ev) {
    if (params.form.time_spent % 15 == 0){
      api.update_task(params.form, params.task.id);
      // api.request_tasks(params.user);
      loaded = false;
      clear(ev);
    } else {
      alert("Time Taken has to be a multiple of 15");
    }
  }

  function clear(ev) {
    params.dispatch({
      type: 'CLEAR_FORM',
    });
  }

  let checkBox = <div></div>;
  if(params.form.complete){
      checkBox =   <FormGroup check>
          <Label check>
            <Input type="checkbox" name="complete" value={params.form.complete} onChange={handleCheckbox} checked/>{' '}
            Complete
          </Label>
        </FormGroup>;
  } else {
    checkBox =   <FormGroup check>
        <Label check>
          <Input type="checkbox" name="complete" value={params.form.complete} onChange={handleCheckbox} />{' '}
          Complete
        </Label>
      </FormGroup>
  }

  // let tasks = _.map(params.tasks, (pp) => <Task key={pp.id} task={pp} />);
  let users = _.map(params.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
      return (<div style={{padding: "4ex"}}>
          <h5>Edit Task</h5>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input type="text" name="title" value={params.form.title} onChange={update}/>
          </FormGroup>
          <FormGroup>
            <Label for="desc">Description</Label>
            <Input type="text" name="desc" value={params.form.desc} onChange={update} />
          </FormGroup>
          <FormGroup>
            <Label for="user_id">Assign to:</Label>
            <Input type="select" name="user_id" value={params.form.user_id} onChange={update}>
              { users }
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="time_taken">Time Taken:</Label>
            <Input type="text" name="time_spent" value={params.form.time_spent} onChange={update} />
          </FormGroup>
          { checkBox }
          <Link to="/"><Button onClick={submit} className="btn btn-success" style={{marginRight:5, marginTop:5}}>Submit</Button></Link>
          <Button onClick={clear} style={{marginRight:5, marginTop:5}}>Clear</Button>
        </div>);
}


function state2props(state) {
  console.log("rerender", state);
  return { form: state.form };
}

// Export the result of a curried function call.
export default connect(state2props)(EditTask);
