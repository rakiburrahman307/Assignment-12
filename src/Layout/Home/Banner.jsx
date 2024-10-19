import { useState } from 'react';
import image1 from "../../assets/banner/image1.jpg"
import image2 from "../../assets/banner/image2.jpg"
import image3 from "../../assets/banner/image3.jpg"
import image4 from "../../assets/banner/image4.jpg"
const Banner = () => {

  const [isLoaded, setIsLoaded] = useState(false);


  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const textField = (
    <div>
      <div className='absolute flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)]'>
        <div
          className='w-1/2 text-white pl-10 space-y-8'
          data-aos='zoom-in-left'
        >
          <h2 className='text-6xl font-bold'>Radiance in Student Living</h2>
          <p>
            UniStayHub Where Every Student Discovers More than a Stay—A Home
            Where Connections Thrive and Memories Flourish. Experience Unmatched
            Comfort, Community, and Convenience. Your Journey Begins Here, at
            the Heart of Student Living.
          </p>
          <div className='flex' data-aos='flip-left'>
            <input
              type='text'
              placeholder='Type here'
              className='input input-bordered input-md w-48 max-w-md text-black rounded-none rounded-s-lg'
            />
            <button className='btn btn-outline btn-accent rounded-e-full'>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSlide = (imgSrc, slideId, prevSlide, nextSlide) => (
    <div id={slideId} className='carousel-item relative h-screen w-full'>
      <img
        src={imgSrc}
        alt={`Slide ${slideId}`}
        className={`w-full transition-all duration-700 ${
          isLoaded ? 'blur-0' : 'blur-lg'
        }`}
        loading='lazy'
        onLoad={handleImageLoad}
      />
      <div className='absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0 z-10'>
        <a href={prevSlide} className='btn btn-circle mr-5'>
          ❮
        </a>
        <a href={nextSlide} className='btn btn-circle'>
          ❯
        </a>
      </div>
      {textField}
    </div>
  );

  return (
    <div className='carousel w-full'>
      {renderSlide(
        `${image1}`,
        'slide1',
        '#slide4',
        '#slide2'
      )}
      {renderSlide(
        `${image2}`,
        'slide2',
        '#slide1',
        '#slide3'
      )}
      {renderSlide(
        `${image3}`,
        'slide3',
        '#slide2',
        '#slide4'
      )}
      {renderSlide(
        `${image4}`,
        'slide4',
        '#slide3',
        '#slide1'
      )}
    </div>
  );
};

export default Banner;
