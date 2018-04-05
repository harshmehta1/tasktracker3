import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';


function tasks(state = [], action) {
  switch (action.type) {
   case 'TASKS_LIST':
     return [...action.tasks];
   case 'ADD_TASK':
     return [action.task, ...state];
    case 'UPDATE_TASK':
      let newstate = _.filter(state, (pp) =>
        action.task.id != pp.id
      );
      return [action.task, ...newstate];
   default:
     return state;
   }}


function users(state = [], action) {
  switch (action.type) {
    case 'USERS_LIST':
      return [...action.users];
    default:
      return state;
    }}

let empty_form = {
  user_id: "",
  title: "",
  desc: "",
  complete: false,
  time_spent: "",
  token: "",
};

let empty_form_w_token = {
  user_id: "",
  title: "",
  desc: "",
  complete: false,
  time_spent: "",
}

function form(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return Object.assign({}, state, action.data);
    case 'UPDATE_USERID':
    return Object.assign({}, state, action.data);
    case 'CLEAR_FORM':
      return Object.assign({}, state, empty_form_w_token);
    case 'SET_TOKEN':
      return Object.assign({}, state, action.token);
    case 'CLEAR_TOKEN':
      return empty_form;
    default:
      return state;
  }
}

function register(state = empty_reg, action){
  switch(action.type){
    case 'UPDATE_REGISTER_FORM':
      return Object.assign({},state, action.data);
    case 'ADD_USER':
      return [action.task, ...state];
    default:
      return state;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    case 'CLEAR_TOKEN':
      return "";
    default:
      return state;
  }
}

let empty_login = {
  name: "",
  pass: "",
};

let empty_reg = {
  email: "",
  name: "",
  password: "",
}

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", action);
  // {posts, users, form} is ES6 shorthand for
  // {posts: posts, users: users, form: form}
  let reducer = combineReducers({tasks, users, form, token, login, register});
  let state1 = reducer(state0, action);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
// Attribution - http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/20-redux/notes.html
