import './taskPanel.scss';
import 'react-day-picker/lib/style.css';

import ActionForm from './../components/ActionForm';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Popup from '../components/Popup';
import React from 'react';
import Task from '../components/Task';
import { addTask } from '../store/actions';
import { connect } from 'react-redux';

function groupBy(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

class TaskPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      taskList: null
    };
  }

  componentDidMount() {
    this.setState({
      date: new Date(),
      taskList: groupBy(this.props.taskList, 'dueDate')
    });
  }

  dayOfWeek = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY'
  ];

  handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
    this.setState({ date: new Date(dayPickerInput.getInput().value) });
  };

  getSelectorFromDate = date => {
    let month =
      date.getMonth() > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    return month + '/' + day + '/' + date.getFullYear();
  };

  render() {
    console.log(this.state);

    if (this.state.date && this.state.taskList) {
      let date = this.state.date;
      let list = this.state.taskList;
      let dateSelector = this.getSelectorFromDate(date);
      if (!list[dateSelector]) {
        list[dateSelector] = [];
      }
      return (
        <div className="panel">
          <div className="header">
            <DayPickerInput
              onDayChange={this.handleDayChange}
              ref={input => (this.datePicker = input)}
            />
            <span
              onClick={e => this.datePicker.input.focus()}
              className="date noselect"
            >
              <span className="day">{date.getDate()}</span>
              <div className="inline-block">
                {date.toLocaleString('en-us', { month: 'short' })}
                <br />
                <span className="year">{date.getFullYear()}</span>
              </div>
            </span>
            <span className="day-of-week">{this.dayOfWeek[date.getDay()]}</span>
          </div>
          <div className="content">
            {list[dateSelector].map(x => {
              console.log(x);
              return <Task key={x.id} task={x} />;
            })}
          </div>
          <div className="footer">
            <div className="circle" onClick={e => this.popup.open()}>
              <img
                className="noselect"
                src="https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/btw_ic_speeddial_white_24dp_2x.png"
                alt=""
              />
            </div>
          </div>
          <Popup ref={popup => (this.popup = popup)}>
            <ActionForm
              inputs={[
                'title',
                {
                  id: 'description',
                  title: 'description',
                  placeholder: 'some description for your TODO task'
                }
              ]}
              action={addTask}
              buttonText={'add'}
              additionalParams={{ dueDate: dateSelector }}
            />
          </Popup>
        </div>
      );
    }

    return <div>Error</div>;
  }
}

const mapStateToProps = function(state) {
  return {
    taskList: state.tasks
  };
};

export default connect(mapStateToProps)(TaskPanel);
