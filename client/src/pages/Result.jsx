import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Result = () => {

    const [image, setImage] = useState(assets.AI_IMAGE_2)
    const [isImageLoaded, setIsImageLoaded] = useState(true)
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState('')
    // [input,setInput] is used for the desired command entered by the user    

    const { generateImage } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (input) {
            const image = await generateImage(input)
            if (image) {
                setIsImageLoaded(true)
                setImage(image)
            }
        }
        setLoading(false)
    }

    return (

        <form onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center'>

            <div>
                <div className='relative'>
                    <img className='max-w-sm rounded' src={image} alt="" />
                    <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />
                </div>
                <p className={!loading ? 'hidden' : ''}>Loading.....</p>
            </div>

            {!isImageLoaded && <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
                <input onChange={e => setInput(e.target.value)} value={input} className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 grey-placeholder' type="text" placeholder='Describe what you want to generate' />
                <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>Generate</button>
            </div>}

            {isImageLoaded && <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
                <p onClick={() => { setIsImageLoaded(false) }} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
                <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
            </div>}

        </form>

    )
}

export default Result



/* 

 1 ->onClick={() => { setIsImageLoaded(false) }}     

 Explaination of this line is that we have to setImage again on the basis of the user prompt thats why on clicking on generate again button I am changing the state of the loaded image  

 2-> `absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`

 Explaiantion of this line is that if image is getting loaded in the screen we have to show full transition and if the image is not loaded we have to show 0 width 

 3-> <input onChange={e => setInput(e.target.value)} value={input} /> 
 Explaination of the above line  
 value={input}
The value of the input field is controlled by the state variable input.

This ensures the displayed value is always what’s stored in input.
onChange={e => setInput(e.target.value)}

Every time the user types something, the onChange event is triggered.
e.target.value captures what the user typed.
setInput(e.target.value) updates the state variable input with the new value.

( yeah sab mere ko tab karna hoga jab image loaded nahi huye honge )
4 -> 



*/
