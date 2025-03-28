import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'


const GenerateBtn = () => {

    const { user, setShowLogin } = useContext(AppContext)

    const navigate = useNavigate()

    const onClickHandler = () => {
        if (user) {
            navigate('/result')
            scrollTo(0,0)
        } else {
            scrollTo(0,0)
            setShowLogin(true)
        }
    }

    return (
        <div
            className='pb-16 text-center'
        >
            {/* Title */}
            <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>See the magic. Try now</h1>

            <button onClick={onClickHandler} className='inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500'>
                Generate Images <img className='h-6' src={assets.star_group} alt="" />
            </button>

        </div>
    )
}

export default GenerateBtn


