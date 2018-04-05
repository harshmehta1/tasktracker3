import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';


function TaskForm(params) {

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
    console.log(oldVal)

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
      api.submit_task(params.form, params.user);
      clear(ev);
    } else {
      alert("Time Spent has to be in intervals of 15");
    }
    console.log(params.form);
  }

  function clear(ev) {
    params.dispatch({
      type: 'CLEAR_FORM',
    });
  }

  let users = _.map(params.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  return <div style={{padding: "4ex"}}>
    <h2>New Task</h2>
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
      <Input type="number" name="time_spent" value={params.form.time_spent} onChange={update} />
    </FormGroup>
    <FormGroup check>
      <Label check>
        <Input type="checkbox" name="complete" value={params.form.complete} onChange={handleCheckbox} />{' '}
        Complete
      </Label>
    </FormGroup>
    <Button onClick={submit} className="btn btn-success" style={{marginRight: 5, marginTop: 5}}>Create</Button>
    <Button onClick={clear} style={{marginRight: 5, marginTop: 5}}>Clear</Button>
  </div>;
}

function state2props(state) {
  console.log("rerender", state);
  return { form: state.form };
}

// Export the result of a curried function call.
export default connect(state2props)(TaskForm);
