import React, { useState, useRef } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { Stage, Layer } from "react-konva";
import Image from "./Image";



function Canvas() {

  const [images, setImages] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [shapes, setShapes] = useState([]);
  const [, updateState] = React.useState();


  const forceUpdate = React.useCallback(() => updateState({}), []);


  const userClicked = (event) => {
      let x = event.currentTarget.pointerPos.x;
      let y = event.currentTarget.pointerPos.y;
      images.push({
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Noto_Emoji_KitKat_263a.svg/200px-Noto_Emoji_KitKat_263a.svg.png",
        x : x,
        y : y,
      })
      setImages(images);
      console.log(images);
      forceUpdate();
  }

  return (
    <div className="home-page">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={userClicked}
      >
        <Layer>
          {images.map((image, i) => {
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
