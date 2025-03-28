import React, { useContext, useRef } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Header2 = () => {
    const { user, setShowLogin, showLogin, removeBG } = useContext(AppContext); // Extract removeBG from context
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // Function to trigger file input when user clicks upload button
    const onClickHandler = () => {
        if (user) {
            fileInputRef.current.click(); // Open file picker
        } else {
            setShowLogin(true); // Show login modal if user is not logged in
        }
    };

    // Function to handle file selection
    const onFileChangeHandler = (event) => {
        const selectedFile = event.target.files[0]; // Get uploaded file
        if (selectedFile) {
            removeBG(selectedFile); // Call removeBG with the uploaded file
        }
    };

    return (
        <div className={`relative ${showLogin ? 'opacity-20 pointer-events-none' : 'opacity-100'} transition-opacity duration-300`}>
            <div className='flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20'>
                {/* -------- Left Side --------- */}
                <div>
                    <h1 className='text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight'>
                        Remove the <br className='max-md:hidden' />
                        <span className='bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent'>background</span>
                        from <br className='max-md:hidden' /> images for free.
                    </h1>
                    <p className='my-6 text-[15px] text-gray-500'>
                        Remove image backgrounds instantly. Create stunning, impactful visuals with ease!<br className='max-sm:hidden' />
                        Make your images stand out by removing backgrounds instantly!
                    </p>
                    <div>
                        {/* Hidden File Input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept='image/*'
                            hidden
                            onChange={onFileChangeHandler} // Handle file selection
                        />

                        {/* Custom Upload Button */}
                        <div onClick={onClickHandler} className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700'>
                            <img width={20} src={assets.upload_btn_icon} alt="" />
                            <p className='text-white text-sm'>Upload your image</p>
                        </div>
                    </div>
                </div>

                {/* -------- Right Side -------- */}
                <div className='w-full max-w-md'>
                    <img src={assets.header_img} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Header2;




/*
   explanation of this code

   working flow ->

   step1 ->

   When the user clicks this button, onClickHandler is triggered.

   step2 ->

If the user is logged in, fileInputRef.current.click(); is executed, which programmatically triggers the hidden file input (<input>).
If the user is not logged in, setShowLogin(true); opens a login modal instead.
Key Concept

Normally, clicking on <input type="file" /> opens a file selection window.
Since our file input is hidden, we use useRef (fileInputRef.current.click()) to programmatically open the file selection dialog.

  step3 ->

  <input 
    ref={fileInputRef}  // Reference to access this input programmatically
    type="file" 
    accept='image/*'  // Only allow image files
    hidden  // Hide it from the UI
    onChange={onFileChangeHandler} // Handle file selection
 />
After the file picker opens, the user chooses a file.
This triggers the onChange event in the <input> field.

const onFileChangeHandler = (event) => {
    const selectedFile = event.target.files[0]; // ✅ Get the selected image file
    if (selectedFile) {
        removeBG(selectedFile); // ✅ Call removeBG function to process the image
    }
};
The event.target.files contains an array of selected files.
Since we only need one file, we extract event.target.files[0].
If a file is selected, we call removeBG(selectedFile); to process the image.

*/

























// import React, { useContext, useRef } from 'react';
// import { assets } from '../assets/assets';
// import { useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';

// const Header2 = () => {
//     const { user, setShowLogin, showLogin } = useContext(AppContext); // Extract showLogin state
//     const {removeBG } = useContext(AppContext) ;
//     const navigate = useNavigate();
//     const fileInputRef = useRef(null);
//     // useRef stores a reference to a DOM element or a value without causing re-renders.
//     //  In your case, we used useRef to reference the hidden file input.

//     const onClickHandler = () => {
//         if (user) {
//             fileInputRef.current.click(); // Allow file upload if logged in
//         } else {
//             setShowLogin(true); // Trigger login modal
//         }
//     };

//     return (
//         <div className={`relative ${showLogin ? 'opacity-20 pointer-events-none' : 'opacity-100'} transition-opacity duration-300`}>
//             <div className='flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20'>
//                 {/* -------- Left Side --------- */}
//                 <div>
//                     <h1 className='text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight'>
//                         Remove the <br className='max-md:hidden' />
//                         <span className='bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent'>background</span>
//                         from <br className='max-md:hidden' /> images for free.
//                     </h1>
//                     <p className='my-6 text-[15px] text-gray-500'>
//                         Remove image backgrounds instantly. Create stunning, impactful visuals with ease!<br className='max-sm:hidden' />
//                         Make your images stand out by removing backgrounds instantly!
//                     </p>
//                     <div>
//                         {/* Hidden File Input */}
//                         <input ref={fileInputRef} type="file" accept='image/*' hidden />

//                         {/* Custom Upload Button */}
//                         <div onClick={onClickHandler} className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700'>
//                             <img width={20} src={assets.upload_btn_icon} alt="" />
//                             <p className='text-white text-sm'>Upload your image</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* -------- Right Side -------- */}
//                 <div className='w-full max-w-md'>
//                     <img src={assets.header_img} alt="" />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Header2;
