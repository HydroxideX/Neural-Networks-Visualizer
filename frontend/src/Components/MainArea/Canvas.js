import React, { useState, useRef } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { Stage, Layer } from "react-konva";
import Image from "./Image";
import style from './style.css';
import classNames from 'classnames/bind';
let cx = classNames.bind(style);



function Canvas(props) {

  const [selectedId, selectShape] = useState(null);
  const [shapes, setShapes] = useState([]);
  const [, updateState] = React.useState();


  const forceUpdate = React.useCallback(() => updateState({}), []);


  const userClicked = (event) => {
      let x = event.currentTarget.pointerPos.x;
      let y = event.currentTarget.pointerPos.y;
      let images = props.images;
      images.push({
        imageUrl: props.imgSrc,
        x : x,
        y : y,
      })
      props.setImages(images);
      console.log(images);
      forceUpdate();
  }

  return (
    <div className={cx('canvas')}>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={userClicked}
      >
        <Layer>
          {props.images.map((image, i) => {
          return (<Image
                    key = {i}
                    imageUrl={image.imageUrl}
                    x = {image.x}
                    y = {image.y}
                  />
              );
          })}
        </Layer>
      </Stage>
    </div>
  );
}

export default Canvas;
