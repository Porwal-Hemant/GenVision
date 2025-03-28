import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Navbar = () => {

    // const [user, setUser] = useState(true);
    // we will manage state with the help of context 

    const{user , setShowLogin , logout , credit } = useContext(AppContext)
    // in the nav bar we will show user name with the help of user and credit with the help of credit 
    // comment out code is the logout function implementation written in appContext.js 
    /* 
        const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        setUser(null)
    }
    */
    const navigate = useNavigate()     
    // use for navigating to other pages 
    
    return (
        <div className='flex items-center justify-between py-4'>
            <Link to='/'><img className='w-28 sm:w-32 lg:w-40' src={assets.logo} alt="" /></Link>
            {/* Image par Home page ka link lagaya hai   */}
            <div >
                {
                    user
                        ? <div className='flex items-center gap-2 sm:gap-3'>
                            <button onClick={() => navigate('/buy')} className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>
                                <img className='w-5' src={assets.credit_star} alt="" />
                                <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits left : {credit}</p>
                            </button>
                            <p className='text-gray-600 max-sm:hidden pl-4'>Hi, {user.name}</p>
                            <div className='relative group'>
                                <img className='w-10 drop-shadow' src={assets.profile_icon} alt="" />
                                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded  pt-12'>
                                    <ul className='list-none m-0 p-2 bg-white rounded-md border  text-sm'>
                                
                                    <li onClick ={logout} className='py-0 px-1 text-xs cursor-pointer w-fit leading-none'>Logout</li>

                                    </ul>
                                </div>
                            </div>
                        </div>

                        : <div className='flex items-center gap-2 sm:gap-5'>
                            <p onClick={() => navigate('/buy')} className='cursor-pointer'>Pricing</p>
                            <button onClick={() => setShowLogin(true)} className='bg-zinc-800 text-white px-7 py-2 sm:px-10 sm:py-2 text-sm rounded-full'>
                                Login
                            </button>
                        </div>
                }
            </div>

        </div>
    )
}

export default Navbar






/* 

Explaination -> 

This uses Tailwind CSS to control the image width based on screen size:
w-28 → Default width (small screens).
sm:w-32 → Medium screens (sm breakpoint, ≥ 640px): Wider logo.
lg:w-40 → Large screens (lg breakpoint, ≥ 1024px): Even bigger logo.


Navbar mai jo login button hai na usme fucntionality add karne honge ab 

*/