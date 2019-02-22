import './popup.scss';

import React from 'react';
import { createPortal } from 'react-dom';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false
    };
  }

  open() {
    this.setState({ display: true });
  }

  close() {
    this.setState({ display: false });
  }

  render() {
    if (this.state.display) {
      return createPortal(
        <div
          className="popup"
          onClick={e => {
            if (e.currentTarget === e.target) this.close();
          }}
        >
          <div className="body">{this.props.children}</div>
        </div>,
        document.getElementsByTagName('body')[0]
      );
    }

    return null;
  }
}

export default Popup;
