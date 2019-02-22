import './ActionForm.scss';

import React from 'react';
import { connect } from 'react-redux';

class ActionForm extends React.Component {
  constructor(props) {
    super(props);
    this.actionParams = { ...this.props.additionalParams };
  }
  render() {
    return (
      <div className="task-input">
        {this.props.inputs.map(x => (
          <div className="input-core">
            <label htmlFor={x.id ? x.id : x}>{x.title ? x.title : x}</label>
            <input
              id={x.id ? x.id : x}
              placeholder={x.placeholder ? x.placeholder : ''}
              onChange={e =>
                (this.actionParams[x.id ? x.id : x] = e.target.value)
              }
            />
          </div>
        ))}
        <div className="button">
          <button
            className="btn btn--primary uppercase"
            onClick={e => {
              this.props.dispatch(this.props.action(this.actionParams));
            }}
          >
            {this.props.buttonText}
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(ActionForm);
