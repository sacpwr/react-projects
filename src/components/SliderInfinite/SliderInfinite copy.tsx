import { useEffect, useState } from "react";
import "./styles.css";

type ImageURL = { imageUrl: string; left: string };

export default function Slider() {
  const [currentImage, setCurrentImage] = useState(0);
  const [imageUrls, setImageUrls] = useState(Array<ImageURL>);
  const defaultWidth: number = 600;

  const slideRight = () => {
    setCurrentImage((currImage) => {
      if (currImage != imageUrls.length - 1) {
        currImage = currImage + 1;
      }
      setImageUrls((imageUrls) => {
        imageUrls[currImage - 1].left = "600px";
        imageUrls[currImage - 1].left = "0px";
        return imageUrls;
      });
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
      return currImage;
    });
  };

  useEffect(() => {
    fetch(
      "https://pixabay.com/api/?key=43109059-78c704521034c20b9a6581be1&q=animals&image_type=photo&pretty=true"
    )
      .then((response) => response.json())
      .then((res) => {
        const imageURLs: ImageURL[] = res.hits.map((hit) => {
          return {
            imageUrl: hit.largeImageURL,
            left: 0,
          };
        });
        setImageUrls(imageURLs);
      });

    return () => {};
  }, []);

  return (
    <div>
      <div className="slider">
        <button className="left-arrow" onClick={slideLeft}></button>
        <button className="right-arrow" onClick={slideRight}></button>
        {imageUrls.map(({ imageUrl, left }, index) => (
          <div
            key={index}
            className="slide"
            data-index={index}
            style={{
              backgroundImage: `url(${imageUrl})`,
              left,
              order: `${index == imageUrls.length - 1 ? 1 : index + 2}`,
              transition: "left 1s",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

/* 
order 
size manage
*/
