import store from './store';

class TheServer {

  request_tasks(uid) {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        // let finData = _.filter(resp.data, (pp) =>
        //               uid == pp.user.id )
        store.dispatch({
          type: 'TASKS_LIST',
          tasks: resp.data,
        });
      },
    });
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'USERS_LIST',
          users: resp.data,
        });
      },
    });
  }

  submit_register(data) {
    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        alert("User created successfully");
        store.dispatch({
          type: 'ADD_USER',
          users: resp.data,
        });
      },
    });
  }



  submit_task(data, id) {
    $.ajax("/api/v1/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, task: data }),
      success: (resp) => {

        if (resp.data.user.id == id){
        store.dispatch({
          type: 'ADD_TASK',
          task: resp.data,
        });
      }
      },
    });
  }

  update_task(data, id){
    console.log("THIS IS ID")
    console.log(id)
    $.ajax("/api/v1/tasks/"+id, {
    method: "patch",
    data: JSON.stringify({ token: data.token, task: data }),
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    success: (resp) => {
        store.dispatch({
        type: 'UPDATE_TASK',
        task: resp.data,
      });
     },
    error: function(e){
      console.log(e);
    },
  });
}

  delete_task(id){
    $.ajax("/api/v1/tasks/"+id, {
    method: "delete",
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    success: (resp) => {
      console.log("DELETED")
        store.dispatch({
        type: 'TASK_DELETED',
      });
     },
    error: function(e){
      console.log(e);
    },
  });
  }

  submit_login(data) {
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
      },
    });
  }
}

export default new TheServer();
