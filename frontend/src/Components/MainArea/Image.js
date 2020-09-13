import React from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";

const Img = ({imageUrl, x, y }) => {
  const shapeRef = React.useRef();
  const [image] = useImage(imageUrl);


  return (
    <React.Fragment>
      <Image
        x = {x}
        y = {y}
        image={image}
        ref={shapeRef}
      />
    </React.Fragment>
  );
};

export default Img;
