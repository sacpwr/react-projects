import { useEffect, useState } from "react";
import "./styles.css";

type IImageData = { imageUrl: string; flexOrder: number; index: number };
export default function Slider() {
  const [currentImage, setCurrentImage] = useState(2);
  // const [currentLeftPX, setCurrentLeftPX] = useState(0);
  const [imageUrls, setImageUrls] = useState(Array<IImageData>);
  const [transition, setTransition] = useState(true);
  const defaultWidth: number = 1200;

  const slideRight = () => {
    setTransition(true);
    setCurrentImage(currentImage + 1);
    setTimeout(() => {
      setTransition(false);
      setImageUrls((imgUrls: IImageData[]) => {
        imgUrls = JSON.parse(JSON.stringify(imageUrls)).sort(
          (a: IImageData, b: IImageData) => (a.flexOrder > b.flexOrder ? 1 : -1)
        );
        const newImgUrls = imgUrls.map((imgUrl: IImageData, index) => {
          return index == 0
            ? { ...imgUrl, flexOrder: imgUrls.length }
            : { ...imgUrl, flexOrder: imgUrl.flexOrder - 1 };
        });
        // console.table(
        newImgUrls.sort((a: IImageData, b: IImageData) =>
          a.index > b.index ? 1 : -1
        );
        // );
        return newImgUrls;
      });
      setCurrentImage(currentImage);
    }, 500);
  };

  const slideLeft = () => {
    setTransition(true);
    setCurrentImage(currentImage - 1);
    setTimeout(() => {
      setTransition(false);
      setImageUrls((imgUrls: IImageData[]) => {
        imgUrls = JSON.parse(JSON.stringify(imageUrls)).sort(
          (a: IImageData, b: IImageData) => (a.flexOrder > b.flexOrder ? 1 : -1)
        );
        const newImgUrls = imgUrls.map((imgUrl: IImageData, index) => {
          return index == imgUrls.length - 1
            ? { ...imgUrl, flexOrder: 1 }
            : { ...imgUrl, flexOrder: imgUrl.flexOrder + 1 };
        });
        // console.table(
        newImgUrls.sort((a: IImageData, b: IImageData) =>
          a.index > b.index ? 1 : -1
        );
        // );
        return newImgUrls;
      });
      setCurrentImage(currentImage);
    }, 500);
  };

  useEffect(() => {
    fetch(
      "https://pixabay.com/api/?key=43109059-78c704521034c20b9a6581be1&q=animals&image_type=photo&pretty=true"
    )
      .then((response) => response.json())
      .then((res) => {
        const imageURLs: IImageData[] = res.hits.map((hit, index) => {
          return {
            imageUrl: hit.largeImageURL,
            index,
            flexOrder:
              index + 3 > res.hits.length
                ? index + 3 - res.hits.length
                : index + 3,
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
        {imageUrls.map(({ imageUrl, flexOrder }, index) => (
          <div
            key={index}
            className="slide"
            data-index={index}
            style={{
              backgroundImage: `url(${imageUrl})`,
              fontSize: "30px",
              left: `-webkit-calc(0% - ${defaultWidth * currentImage}px)`,
              order: flexOrder,
              transition: `${transition ? "left 0.5s" : ""}`,
              textAlign: "center",
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

/* 
<div
            key={index}
            className="slide"
            style={{
              backgroundImage: `url(${url})`,
              left: `-webkit-calc(0% - ${currentLeftPX}px)`,
              order: `${index == imageUrls.length - 1 ? 1 : index + 2}`,
              transition: "left 1s",
            }}
          ></div>
*/
