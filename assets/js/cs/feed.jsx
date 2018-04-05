import React from 'react';
import Task from './task';

export default function Feed(params) {
  let tasks = _.map(params.tasks, (pp) => <Task key={pp.id} user={params.user} task={pp} />);
  return <div>
    { tasks }
  </div>;
}
// Attribution - http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/20-redux/notes.html
