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
    setImageUrls([
      "https://i.pinimg.com/originals/41/91/32/419132ba0957c02818f58bd4aa3969ab.jpg",
      "https://i.pinimg.com/564x/ba/f4/75/baf475329fa3549592617baba9ba89cd.jpg",
      "https://i.pinimg.com/564x/0b/c3/1b/0bc31b69d5219c035bd79583af935651.jpg",
      "https://i.pinimg.com/564x/99/28/73/9928737a3504c5fc8269377d8ba5a122.jpg",
      "https://i.pinimg.com/564x/28/41/e8/2841e85c2e445552a5f9b95a88d63e11.jpg",
      "https://www.guidingtech.com/wp-content/uploads/Top-N-PUBG-Wallpapers-in-Full-HD-for-PC-and-Phone-2_4d470f76dc99e18ad75087b1b8410ea9.jpg",
    ]);

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
