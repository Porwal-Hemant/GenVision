import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
const Login = () => {
    const [state, setState] = useState('Login')
    const { setShowLogin , backendUrl , setToken , setUser} = useContext(AppContext)
    // this setShowLogin is a state for tracking whether the login in page will going to be shown or not  


    // Now we have to add functionality for login and registeration 
    // now for this we have to create 3 state variables ( name email and password ) 

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {

            if (state === 'Login') {

                const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)   // storing it in browser local storage 
                    setShowLogin(false)   // making the login form hidden 
                } else {
                    toast.error(data.message)
                }

            } else {

                const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
                
                // if statement will corresponds to that we are successfully logged in
                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                } else {
                    toast.error(data.message)
                }

            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // whenever the login form has been loaded I have to disable scrolling  
    // this arrow function will going to be executed whenever the component gets loaded 
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])

    return (
        <div className=' fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>
                <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
                <p className='text-sm'> Welcome Back! Please Sign in to continue </p>

                {state !== 'Login' && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4' >
                    <img src={assets.lock_icon} alt="" />
                    <input onChange={e => setName(e.target.value)} value={name} type="text" className='outline-none text-sm' placeholder='Full Name' required />
                </div>}

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4' >
                    <img src={assets.email_icon} alt="" />
                    <input onChange={e => setEmail(e.target.value)} value={email} type="email" className='outline-none text-sm' placeholder='Enter Your Email' required />
                </div>

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4' >
                    <img src={assets.lock_icon} alt="" />
                    <input onChange={e => setPassword(e.target.value)} value={password} type="password" className='outline-none text-sm' placeholder='Enter Password' required />
                </div>

                <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>
                <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state === 'Login' ? 'login' : 'Create Account'}</button>

                {state === 'Login' ? <p className='mt-5 text-center'>Don't have an account ? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign Up')}>Sign up</span> </p>
                    : <p className='mt-5 text-center'>Already have an account ? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Login')}>Login</span> </p>
                }

                <img onClick={() => setShowLogin(false)} className=' absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} alt="" />
            </form>
        </div>
    )
}

export default Login


/* 

When Did useEffect Run?
Since useEffect has an empty dependency array [], it runs only once when the component is mounted (added to the DOM).
The cleanup function inside return () => { ... } runs when the component unmounts (removed from the DOM).

document.body.style.overflow = 'hidden';
This disables scrolling for the entire webpage.
overflow: hidden prevents the page from scrolling vertically or horizontally.

return () => {
    document.body.style.overflow = 'unset';
};
This restores the default scrolling behavior when the component is removed.


onClick ={()=>setShowLogin(false)}

this means after clicking on that cut button it will get close 
*/



