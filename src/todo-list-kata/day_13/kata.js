import React from 'react';
import uuidv1 from 'uuid/v1';

class TodoList extends React.Component {
  state = {
    taskTitle: '',
    tasks: []
  };

  onTaskTitleChange = (e) => this.setState({ taskTitle: e.target.value });

  onTaskSubmit = (e) => {
    e.preventDefault();
    this.setState((prev) => {
      const tasks = prev.tasks;
      tasks.push(prev.taskTitle);
      return { tasks, taskTitle: '' };
    });
  };

  render() {
    return (
      <form>
        <ul>
          {this.state.tasks.map(title => <Task key={uuidv1()} title={title} />)}
        </ul>
        <input
          data-cy-id="task-title"
          onChange={this.onTaskTitleChange}
          value={this.state.taskTitle}
        />
        <button
          data-cy-id="submit-task"
          onClick={this.onTaskSubmit}
        >
          Submit Task
        </button>
      </form>
    );
  }
}

class Task extends React.Component {
  state = {
    status: 'TODO'
  };

  markInProgress = () => this.setState({ status: 'In Progress' });

  markInProgressDisabled = () => this.state.status !== 'TODO';

  markAsDone = () => this.setState({ status: 'DONE' });

  markAsDoneDisabled = () => this.state.status !== 'In Progress';

  render() {
    return (
      <li
        data-cy-type="task"
      >
        <span data-cy-type="title">{this.props.title}</span>
        <span data-cy-type="status">{this.state.status}</span>
        <button
          data-cy-type="mark-in-progress"
          disabled={this.markInProgressDisabled()}
          onClick={this.markInProgress}
        >
          Mark In Progress
        </button>
        <button
          data-cy-type="mark-as-done"
          disabled={this.markAsDoneDisabled()}
          onClick={this.markAsDone}
        >
          Mark As Done
        </button>
      </li>
    );
  }
}

export default TodoList;
