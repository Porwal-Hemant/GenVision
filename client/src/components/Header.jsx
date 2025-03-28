import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
const Header = () => {

    const { user, setShowLogin } = useContext(AppContext)
    const navigate = useNavigate()

    const onClickHandler = () => {
        if (user) {
            navigate('/result')
        } else {
            setShowLogin(true)
        }
    }

    return (
        <div className='flex flex-col justify-center items-center text-center my-20'>
            <h1
                className='text-center mx-auto mt-10 text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px]'
            >
                Turn text to <span className='text-blue-600'>image</span>, in seconds.
            </h1>

            <p
                className='text-center max-w-xl mx-auto mt-5'
            >
                Transform words into stunning visuals—let AI bring your imagination to life in seconds!

            </p>

            <button onClick={onClickHandler}
                className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'
            // onClick={onClickHandler}
            >
                Generate Images <img className='h-6' src={assets.star_group} alt="" />
            </button>

            <div
                className='flex flex-wrap justify-center mt-16 gap-3    '
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                {Array(6).fill('').map((item, index) => (
                    <img
                        className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10'
                        width={70}
                        key={index}
                        src={index % 2 === 0 ? assets.AI_IMAGE_2 : assets.AI_4}
                        whileHover={{ scale: 1.05, duration: 0.1 }}
                    />
                ))}
            </div>
            <p
                className='mt-2 text-neutral-600'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
            >
                Generated images from GEN-VISION !
            </p>
        </div>
    )
}

export default Header
