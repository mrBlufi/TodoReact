import './task.scss';

import React from 'react';

function Task(props) {
  if (props.task)
    return (
      <div className="task">
        <div className="inline-block">
          <span className="task-title">{props.task.title}</span>
          <br />
          <span className="task-description">{props.task.description}</span>
        </div>
      </div>
    );
}

export default Task;
