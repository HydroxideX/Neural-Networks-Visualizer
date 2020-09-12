import React from 'react';
import ResizePanel from "react-resize-panel";
import classNames from 'classnames/bind';
import style from './style.css';
import Buttons from './Buttons';
let cx = classNames.bind(style);

class Sidebar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={cx('container')}>
        <div className={cx('body')}>
          <ResizePanel direction="e" style={{ flexGrow: '1' }} >
            <div className={cx('sidebar', 'withMargin', 'panel')}>
              <Buttons />
            </div>
          </ResizePanel>
          <div className={cx('content', 'panel')}>content</div>
        </div>
      </div>);
  }
}

export default Sidebar;
