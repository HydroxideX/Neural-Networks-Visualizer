import React from 'react';
import ResizePanel from "react-resize-panel";
import classNames from 'classnames/bind';
import style from './style.css';
import Canvas from './Canvas'
import grid from './grid.png'
import layer from './normalLayer.png'
let cx = classNames.bind(style);
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.changeImgSrc = this.changeImgSrc.bind(this);
    this.state = {
      imgSrc : grid,
      differentLayers : [
        <img src={grid} style={{width:"200px", height:"200px", padding:"3px 3px 3px 3px"}} onClick={() =>this.changeImgSrc(grid)}/>,
        <img src={layer} style={{ width:"75px", height:"225px", padding:"3px 3px 3px 3px"}} onClick={() =>this.changeImgSrc(layer)}/>,
      ]
    };
  }

  changeImgSrc = (val) => {
    console.log("user clicked");
    this.setState({
      imgSrc:val,
    });
  }

  render() {
    return (
      <div className="fullWidth">
        <div className={cx('container')}>
         <div className={cx('body')}>

           <ResizePanel direction="e">
             <div className={cx('RightSidebar', 'panel')}>
               <div>
               <button class="btn btn-success" style={{float:"left", margin:"5px 0px 5px 10px"}}>
                 Save
               </button>
               <button class="btn btn-success" style={{float:"left", margin:"5px 0px 5px 10px"}}>
                 Generate Code
               </button>
               </div>
               {this.state.differentLayers.map((img, i) => {
               return (<div> {img} </div>);
               })}

              </div>
           </ResizePanel>
                <div className={cx('content', 'panel')}> <Canvas imgSrc={this.state.imgSrc}/> </div>
         </div>
       </div>
     </div>
    );
  }
}

export default Sidebar;
