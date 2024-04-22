import { useState } from "react";
import "./Carousel.css";
import Card from "./Card";


/** Carousel: displays images and arrows to navigate through them
 * 
 * Props:
 * - photos: array of {src, caption} objects
 * - title: string describing the collection of images
 * 
 * State:
 * - currCardIdx: integer for current card index
 * 
 * App --> Carousel --> Card
 */
 // Update Carousel component to hide arrows on first and last images
function Carousel({ photos, title }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);
  const total = photos.length;

  function navigate(direction) {
    if (direction === 'forward' && currCardIdx < total - 1) {
      setCurrCardIdx(currCardIdx + 1);
    } else if (direction === 'backward' && currCardIdx > 0) {
      setCurrCardIdx(currCardIdx - 1);
    }
  }

  function goBackward() {
    navigate('backward');
  }

  function goForward() {
    navigate('forward');
  }

  return (
    <div className="Carousel">
      <h1>{title}</h1>
      <div className="Carousel-main">
        {currCardIdx > 0 && (
          <i
            className="bi bi-arrow-left-circle"
            data-testid="left-arrow"
            onClick={goBackward}
          />
        )}
        <Card
          caption={photos[currCardIdx].caption}
          src={photos[currCardIdx].src}
          currNum={currCardIdx + 1}
          totalNum={total}
        />
        {currCardIdx < total - 1 && (
          <i
            className="bi bi-arrow-right-circle"
            data-testid="right-arrow"
            onClick={goForward}
          />
        )}
      </div>
    </div>
  );
}

export default Carousel;
