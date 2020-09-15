import React from 'react';
import ResizePanel from "react-resize-panel";
import classNames from 'classnames/bind';
import style from './style.css';
import AceEditor from "react-ace";
import "brace/mode/python";
import "brace/theme/solarized_dark";
import 'brace/snippets/c_cpp';
import 'brace/ext/language_tools';
import Canvas from './Canvas'
let cx = classNames.bind(style);
class Sidebar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={cx('container')}>
        <div className={cx('body')}>

            <div>
            </div>
          <div className={cx('content', 'panel')}> <Canvas> </Canvas> </div>

          <ResizePanel direction="w" >
            <AceEditor
             ref="aceEditor"
             width="100%"
             height="100%"
             fontSize="14pt"
             mode="python"
             theme="solarized_dark"
             showPrintMargin={false}
             onChange={this.updateData}
             showGutter={true}
             highlightActiveLine={true}
             setOptions={{
               enableBasicAutocompletion: true,
               enableLiveAutocompletion: true,
               enableSnippets: true,
               showLineNumbers: true,
               tabSize: 2
             }}
             zzz
           />
            </ResizePanel>
        </div>
      </div>);
  }
}

export default Sidebar;
