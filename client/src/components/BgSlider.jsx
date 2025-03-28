
import React, { useState } from 'react';
import { assets } from '../assets/assets';

const BgSlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50); // Initial slider position

    const handleSliderChange = (e) => {
        setSliderPosition(e.target.value);
    };

    return (
        <div className='pb-10 md:py-20 mx-2'>

            {/* Title */}
            <h1 className='text-center mb-12 sm:mb-20 text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-850'>
                Remove Background With High <br /> Quality and Accuracy
            </h1>


            <div className="relative w-full max-w-3xl overflow-hidden m-auto rounded-xl">
                {/* Background Image */}
                <img
                    src={assets.image_w_bg}
                    className="w-full"
                    style={{ clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)` }}
                />

                {/* Foreground Image */}
                <img
                    src={assets.image_wo_bg}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                />

                {/* Slider positioned at the bottom of the image */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-gray-900/50 to-transparent">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderPosition}
                        onChange={handleSliderChange}
                        className="w-full cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default BgSlider;
