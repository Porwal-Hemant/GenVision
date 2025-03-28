// import React from 'react'
// import { assets, testimonialsData } from '../assets/assets'

// const Testimonials = () => {
//     return (
//         <div
//             className="flex flex-col items-center justify-center my-20 py-12"
//             initial={{ opacity: 0.2, y: 100 }}
//             transition={{ duration: 1 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//         >
//             <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Customer testimonials</h1>
//             <p className='text-gray-500 mb-12'>What Our Users Are Saying</p>
//             <div className='flex flex-wrap gap-6'>
//                 {testimonialsData.map((testimonial, index) => (
//                     <div key={index} className='bg-white/20 p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all duration-300'>
//                         <div className='flex flex-col items-center'>
//                             <img src={testimonial.image} alt='' className='rounded-full w-14' />
//                             <h2 className='text-xl font-semibold mt-3'>{testimonial.name}</h2>
//                             <p className='text-gray-500 mb-4'>{testimonial.role}</p>
//                             <div className='flex mb-4'>
//                                 {Array(testimonial.stars).fill('').map((item, index) => (
//                                     <img key={index} src={assets.rating_star} alt='' />
//                                 ))}
//                             </div>
//                             <p className='text-center text-sm text-gray-600'>{testimonial.text}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Testimonials

// import React from 'react';
// import { assets, testimonialsData } from '../assets/assets';

// const Testimonials = () => {
//     return (
//         <div className="flex flex-col items-center justify-center my-20 py-12 px-4 md:px-16">
//             {/* Heading Section */}
//             <h1 className="text-3xl sm:text-4xl font-semibold mb-2 text-center">
//                 Customer Testimonials
//             </h1>
//             <p className="text-gray-500 mb-12 text-center">What Our Users Are Saying</p>

//             {/* Testimonials Grid (Only 2 Testimonials) */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:grid-cols-2">
//                 {testimonialsData.slice(0, 2).map((testimonial, index) => (  // Sliced to show only 2
//                     <div 
//                         key={index} 
//                         className="bg-white p-8 rounded-xl shadow-lg border border-gray-300 w-96 mx-auto transition-transform duration-300 hover:scale-105"
//                     >
//                         <div className="flex flex-col items-center space-y-2">
//                             {/* Profile Image */}
//                             <img src={testimonial.image} alt='' className="rounded-full w-16 border-2 border-gray-300" />

//                             {/* Name & Role */}
//                             <h2 className="text-xl font-semibold">{testimonial.name}</h2>
//                             <p className="text-gray-500">{testimonial.role}</p>

//                             {/* Star Ratings */}
//                             <div className="flex">
//                                 {Array(testimonial.stars).fill('').map((_, i) => (
//                                     <img key={i} src={assets.rating_star} alt="star" className="w-5" />
//                                 ))}
//                             </div>

//                             {/* Review Text */}
//                             <p className="text-center text-sm text-gray-600 mt-2">
//                                 {testimonial.text}
//                             </p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Testimonials;


import React from 'react';
import { assets, testimonialsData } from '../assets/assets';

const Testimonials = () => {
    return (
        <div className="flex flex-col items-center justify-center my-20 py-12 px-4 md:px-16">
            {/* Heading Section */}
            <h1 className="text-3xl sm:text-4xl font-semibold mb-2 text-center">
                Customer Testimonials
            </h1>
            <p className="text-gray-500 mb-12 text-center">What Our Users Are Saying</p>

            {/* Responsive Testimonials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {testimonialsData.map((testimonial, index) => (  
                    <div 
                        key={index} 
                        className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-300 transition-transform duration-300 hover:scale-105"
                    >
                        <div className="flex flex-col items-center space-y-2">
                            {/* Profile Image */}
                            <img src={testimonial.image} alt='' className="rounded-full w-16 border-2 border-gray-300" />

                            {/* Name & Role */}
                            <h2 className="text-lg sm:text-xl font-semibold">{testimonial.name}</h2>
                            <p className="text-gray-500 text-sm sm:text-base">{testimonial.role}</p>

                            {/* Star Ratings */}
                            <div className="flex">
                                {Array(testimonial.stars).fill('').map((_, i) => (
                                    <img key={i} src={assets.rating_star} alt="star" className="w-4 sm:w-5" />
                                ))}
                            </div>

                            {/* Review Text */}
                            <p className="text-center text-sm sm:text-base text-gray-600 mt-2">
                                {testimonial.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
