import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import Nav from './nav';
import Feed from './feed';
import Users from './users';
import TaskForm from './task-form';
import Register from './reg';
import { Provider, connect } from 'react-redux';
import EditTask from './edit-task';



export default function tasktracker_init(store) {
  let root = document.getElementById('root');
  ReactDOM.render(<Provider store={store}>
                    <Tasktracker state={store.getState()} /></Provider>, root);
}


let Tasktracker = connect((state) => state)((props) => {
  console.log("props")
  console.log(props)

  if (props.form.token != "" && props.form.token != null){
    return (
      <Router>
        <div>
          <Nav users={props.users}/>
          <Route path="/" exact={true} render={() =>
            <div>
              <TaskForm users={props.users} user={props.token.user_id}/>
              <Feed user={props.token.user_id} tasks={_.filter(props.tasks, (pp) =>
                props.token.user_id == pp.user.id )} />
            </div>
          } />
          <Route path="/users" exact={true} render={() =>
            <Users users={props.users} />
          } />
          <Route path="/users/:user_id" render={({match}) =>
            <Feed tasks={_.filter(props.tasks, (pp) =>
              match.params.user_id == pp.user.id )
            } />
          } />
        <Route path="/tasks/:task_id" render={({match}) =>
          <EditTask user={props.token.user_id} task={_.find(props.tasks, (pp) =>
            match.params.task_id == pp.id )
          } users={props.users} />
        } />
        </div>
      </Router>
    );
  } else {
    return (
      <Router>
        <div><Nav /><Register /></div>
      </Router>
    );
  }

});

// Attribution - http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/20-redux/notes.html
