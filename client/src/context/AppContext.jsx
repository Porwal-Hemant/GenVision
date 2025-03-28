import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// import userAuth from "../../../server/middlewares/auth";

export const AppContext = createContext()

// This creates and exports a new context object named appContext

const AppContextProvider = (props) => {
    const [user, setUser] = useState(false);
        // const { getToken } = userAuth()
    const navigate = useNavigate()   // this has been taken because I have to go to the Result_bg page 
    const [showLogin, setShowLogin] = useState(false);
    // const [showLogin1, setShowLogin1] = useState(false);    
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [credit, setCredit] = useState(false)
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [resultImage, setResultImage] = useState(false)
    // for the new feature  
    const [image, setImage] = useState(false);

        const removeBG = async (image) => {
            try {
                
              console.log( image )         

                // when the user is logged in, I will setImage 
                setImage(image)
                setResultImage(false)    
                navigate('/result_bg')  // result_bg is the endpoint of the Result_bg page  
    
                // const token = await getToken()
    
                const formData = new FormData()
                image && formData.append('image', image)
    
                const { data } = await axios.post(backendUrl + '/api/image/remove-bg', formData, { headers: { token } })
    
                if (data.success) {
                    setResultImage(data.resultImage)
                    data.creditBalance && setCredit(data.creditBalance)
                } else {
                    toast.error(data.message)
                    data.creditBalance && setCredit(data.creditBalance)
                    if (data.creditBalance === 0) {
                        navigate('/buy')
                    }
                }
    
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
    
        }

    const loadCreditsData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/user/credits', { headers: { token } })
            if (data.success) {
                setCredit(data.credits)
                setUser(data.user)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // API FOR GENERATING IMAGE  

    const generateImage = async (prompt) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/image/generate-image', { prompt }, { headers: { token } })

            if (data.success) {
                loadCreditsData()
                return data.resultImage
            } else {
                toast.error(data.message)
                loadCreditsData()
                if (data.creditBalance === 0) {
                    navigate('/buy')
                }
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        setUser(null)
    }

    // useEffect state corresponds that whenever the eleemnts of the dependencies array change ( eleemnts writtenin bracket [] ) loadCreditsData function will going to be called 
    useEffect(() => {
        if (token) {
            loadCreditsData()
        }
    }, [token])
    const value = {

        user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditsData, logout, generateImage , image , setImage , removeBG , resultImage , setResultImage
    }

    return (
        <AppContext.Provider value={value}>
            {
                props.children
            }
            {/* {props.children} ensures that any child component inside AppContextProvider can access the context.         */}
            {/* Why we are doing this because we have to export it to other pages and there we have to list these global values and aur pages par hum iss AppContext ko call kar lenge   */}
        </AppContext.Provider>
    )
}

export default AppContextProvider



