import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
// import { plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const BuyCredit = () => {

    const { backendUrl, loadCreditsData, user, token, setShowLogin } = useContext(AppContext)
    const navigate = useNavigate()
// Configures Razorpay payment options.
// Opens the Razorpay payment window.
// Handles payment success by verifying it with the backend.
    const initPay = async (order) => {

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Credits Payment',
            description: "Credits Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
        // handler: A callback function that runs after payment succeeds.
                try {

                    const { data } = await axios.post(backendUrl + '/api/user/verify-razor', response, { headers: { token } })
                    if (data.success) {
                        loadCreditsData()
                        navigate('/')
                        toast.success('Credit Added')
                    }
                } catch (error) {
                    toast.error(error.message)
                }

            }
        }

        const rzp = new window.Razorpay(options)
        rzp.open()

    }

    // Calls the backend to create a new Razorpay order.
    // If successful, calls initPay(order) to start the payment.
    // paymentRazorpay(item.id)  -> this has been called with the help of the below map itterating to all the plans ( each plan corresponding one item )
    const paymentRazorpay = async (planId) => {
        try {

            if (!user) {
                setShowLogin(true)
            }

            const { data } = await axios.post(backendUrl + '/api/user/pay-razor', { planId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='min-h-[80vh] text-center pt-14 mb-10'>
            <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
            <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the plan </h1>

            <div className='flex flex-wrap justify-center gap-6 text-left'>
                {plans.map((item, index) => (
                    <div className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500' key={index}>
                        <img width={40} src={assets.logo_icon} alt="" />
                        <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
                        <p className='text-sm'>{item.desc}</p>
                        <p className='mt-6'>
                            <span className='text-3xl font-medium'>₹{item.price}</span>/ {item.credits} credits
                        </p>

                        <button onClick={() => paymentRazorpay(item.id)} className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 '>
                            {user ? 'Purchase' : "Get Started"}
                        </button>
                    </div>

                ))}
            </div>
        </div>

    )
}

export default BuyCredit



/* 

  Other than CSS properties all the other concepts will be discussed over here 

  If the user is logged in we have to show purchase option whereas if the user is not log in I have to show GET STARTED OPTION 

await axios.post(backendUrl + '/api/user/pay-razor', { planId }, { headers: { token } });
Sends a POST request to backendUrl + '/api/user/pay-razor' with:

planId → The ID of the selected subscription/credits plan.
{ headers: { token } } → User authentication token.  

razorpay returns this response ( for the razorpay verification method )
{
  "razorpay_payment_id": "pay_ABC123XYZ",
  "razorpay_order_id": "order_ABC123XYZ",
  "razorpay_signature": "123456abcdef"
}

*/