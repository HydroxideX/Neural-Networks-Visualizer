import React from 'react';
import ResizePanel from "react-resize-panel";
import classNames from 'classnames/bind';
import style from './style.css';
import Canvas from './Canvas'
import grid from './grid.png'
import layer from './normalLayer.png'
import conv from './conv.png'
let cx = classNames.bind(style);
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.changeImgSrc = this.changeImgSrc.bind(this);
    this.setImages = this.setImages.bind(this);
    this.generateClicked = this.generateClicked.bind(this);
    this.state = {
      imgSrc : grid,
      differentLayers : [
        <img src={grid} style={{width:"200px", height:"200px", padding:"3px 3px 3px 3px"}} onClick={() =>this.changeImgSrc(grid)}/>,
        <img src={layer} style={{ width:"75px", height:"225px", padding:"3px 3px 3px 3px"}} onClick={() =>this.changeImgSrc(layer)}/>,
        <img src={conv} style={{ width:"200px", height:"200px", padding:"3px 3px 3px 3px"}} onClick={() =>this.changeImgSrc(conv)}/>,
      ],
      images :[
      ],
      chartHasName: true,
      code : '',
      localChart: '',
    };
  }

  componentDidMount(){
    if(this.props.chartName !== '') {
      let link ='http://127.0.0.1:8000/users/get_chart/'+ this.props.email+'/'+this.props.chartName
      fetch(link)
      .then(response => response.json())
      .then(data=>
        this.setState({
          images: data
        })
      );
    }
  }

  setImages = (val) => {
    this.setState({
      images:val,
    });
  }

  changeImgSrc = (val) => {
    this.setState({
      imgSrc:val,
    });
  }

  buildStateCode = async() => {
    await this.setState({
      code:'',
    });
    for (let i = 0;i<this.state.images.length;i++) {
      if(this.state.images[i].imageUrl === conv) {
          await this.setState({
            code: this.state.code + '\n' + 'Conv2D(#filters, #kernel_size, strides=? ,padding=? ,data_format= ?,dilation_rate=?,groups=?, activation=?,use_bias=?,kernel_initializer=?,bias_initializer=?,kernel_regularizer=?,bias_regularizer?,activity_regularizer=?,kernel_constraint=?,bias_constraint=?,**kwargs)',
          })
      }

      if(this.state.images[i].imageUrl === layer) {
          await this.setState({
            code: this.state.code + '\n' +'tf.keras.layers.Dense(units =?, activation=?, use_bias=?, kernel_initializer=?, bias_initializer=?, kernel_regularizer=?, bias_regularizer=?, activity_regularizer=?,  kernel_constraint=?,bias_constraint=?,**kwargs)',
          })
      }



      if(this.state.images[i].imageUrl === grid) {
          await this.setState({
            code: this.state.code + '\n' +'tf.keras.layers.MaxPooling3D( pool_size=?, strides=?, padding=?,data_format=?, **kwargs)',
          })
      }
    }
  }

  savefile = () => {
     const element = document.createElement("a");
     const file = new Blob([this.state.code], {type: 'text/plain'});
     element.href = URL.createObjectURL(file);
     element.download = "NeuralNetwork.py";
     document.body.appendChild(element);
     element.click();

  }





  generateCodeAndSaveFile = async(output) => {
    await this.buildStateCode();
    output();

  }

  generateClicked = () => {
   this.generateCodeAndSaveFile(this.savefile);

  }

  enterNewChartName = () => {
    this.props.changeChartName(this.state.localChart);
    this.state.chartHasName = true;
  }

  handleChangeLocalChartName = (event) => {
    this.state.localChart = event.target.value;
  }

  checkChartAndSave = () => {
    if(this.props.chartName === ''){
      this.state.chartHasName = false;
      this.forceUpdate();
      return;
    }
    fetch('http://127.0.0.1:8000/users/save_chart/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        "email": this.props.email,
        "password": this.props.password,
        "chart" : {
          "name": this.props.chartName,
          "drawing": this.state.images,
        },
      })
    })
  }

  render() {
    var pageView = this.state.chartHasName;
    if(pageView) {
      return (
        <div className="fullWidth">
          <div className={cx('container')}>
           <div className={cx('body')}>

             <ResizePanel direction="e">
               <div className={cx('RightSidebar', 'panel')}>
                 <div>
                 <button class="btn btn-success" style={{float:"left", margin:"5px 0px 5px 10px"}} onClick={this.checkChartAndSave}>
                   Save
                 </button>
                 <button class="btn btn-success" style={{float:"left", margin:"5px 0px 5px 10px"}} onClick={this.generateClicked}>
                   Generate Code
                 </button>
                 </div>
                 {this.state.differentLayers.map((img, i) => {
                 return (<div> {img} </div>);
                 })}

                </div>
             </ResizePanel>
                  <div className={cx('content', 'panel')}> <Canvas images={this.state.images} setImages = {this.setImages} imgSrc={this.state.imgSrc}/> </div>
           </div>
         </div>
       </div>
      );
    }
    else {
      return (
      <div class="container">
        <div class="d-flex justify-content-center h-100">
          <div class="card">
            <div class="card-header">
              <h3>Chart Name</h3>
            </div>
            <div class="card-body">
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-user"></i></span>
                </div>
                <input type="text" class="form-control" placeholder="Chart Name" onChange={this.handleChangeLocalChartName} />
              </div>


              <div class="form-group">
                <button class="btn float-right login_btn" onClick={this.enterNewChartName}> Enter </button>
              </div>

                <label> enter new Chart Name or an old one to replace the chart with the same name save again after entering a new valid name</label>
            </div>
          </div>
        </div>
      </div>
    );
    }
  }
}

export default Sidebar;
