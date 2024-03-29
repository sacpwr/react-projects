import { useEffect, useState } from "react";
import "./styles.css";
export default function Slider() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentLeftPX, setCurrentLeftPX] = useState(0);
  const [imageUrls, setImageUrls] = useState(Array<string>);
  const defaultWidth: number = 1200;

  const slideRight = () => {
    setCurrentImage((currImage) => {
      if (currImage != imageUrls.length - 1) {
        currImage = currImage + 1;
      }
      setCurrentLeftPX(defaultWidth * currImage);
      return currImage;
    });
  };

  const slideLeft = () => {
    setCurrentImage((currImage) => {
      if (currImage == 0) {
        currImage = 0;
      } else {
        currImage = currImage - 1;
      }
      setCurrentLeftPX(defaultWidth * currImage);
      return currImage;
    });
  };

  useEffect(() => {
    fetch(
      "https://pixabay.com/api/?key=43109059-78c704521034c20b9a6581be1&q=animals&image_type=photo&pretty=true"
    )
      .then((response) => response.json())
      .then((res) => {
        const largeImageURLs = res.hits.map((hit) => hit.largeImageURL);
        setImageUrls(largeImageURLs);
      });

    return () => {};
  }, []);

  return (
    <div>
      <div className="slider">
        {currentImage != 0 && (
          <button className="left-arrow" onClick={slideLeft}></button>
        )}
        {currentImage != imageUrls.length - 1 && (
          <button className="right-arrow" onClick={slideRight}></button>
        )}
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className="slide"
            style={{
              backgroundImage: `url(${url})`,
              left: `-webkit-calc(0% - ${currentLeftPX}px)`,
              transition: "left 1s",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
