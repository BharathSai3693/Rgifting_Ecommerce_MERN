import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const items = [
  { id: 1, src: "https://imgcdn.floweraura.com/DSC_5155_0.jpg", link: "https://example.com/page1" },
  { id: 2, src: "https://m.media-amazon.com/images/I/51QFqmt1QaL._AC_UF1000,1000_QL80_.jpg", link: "https://example.com/page2" },
  { id: 3, src: "https://cdn.cdnparenting.com/articles/2019/03/07154015/617801630-H.webp", link: "https://example.com/page3" },
  { id: 4, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvl1rklWyvF0ynpzGcuVAlAgCf0QJMK5osbQ&s", link: "https://example.com/page4" },
  { id: 5, src: "https://imgcdn.floweraura.com/DSC_5155_0.jpg", link: "https://example.com/page1" },
  { id: 6, src: "https://m.media-amazon.com/images/I/51QFqmt1QaL._AC_UF1000,1000_QL80_.jpg", link: "https://example.com/page2" },
  { id: 7, src: "https://cdn.cdnparenting.com/articles/2019/03/07154015/617801630-H.webp", link: "https://example.com/page3" },
  { id: 8, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvl1rklWyvF0ynpzGcuVAlAgCf0QJMK5osbQ&s", link: "https://example.com/page4" },
  { id: 9, src: "https://imgcdn.floweraura.com/DSC_5155_0.jpg", link: "https://example.com/page1" },
  { id: 10, src: "https://m.media-amazon.com/images/I/51QFqmt1QaL._AC_UF1000,1000_QL80_.jpg", link: "https://example.com/page2" },
  { id: 11, src: "https://cdn.cdnparenting.com/articles/2019/03/07154015/617801630-H.webp", link: "https://example.com/page3" },
  { id: 12, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvl1rklWyvF0ynpzGcuVAlAgCf0QJMK5osbQ&s", link: "https://example.com/page4" },
];

const Carousel2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-center overflow-hidden">
        <button
          onClick={handlePrev}
          className="absolute left-0 z-30 flex items-center justify-center h-full p-4 text-white bg-gray-800/50 hover:bg-gray-800/70 focus:outline-none"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="flex space-x-4 px-16">
          {items.map((item, index) => (
            <a
              key={item.id}
              href={item.link}
              className={`min-w-[200px] p-4 bg-gray-200 rounded-md transition-transform duration-700 ease-in-out ${
                index === currentIndex ? "scale-110" : "scale-100"
              }`}
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              <img
                src={item.src}
                alt={`Carousel item ${item.id}`}
                className="w-full h-auto rounded-md"
              />
            </a>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="absolute right-0 z-30 flex items-center justify-center h-full p-4 text-white bg-gray-800/50 hover:bg-gray-800/70 focus:outline-none"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default Carousel2;
