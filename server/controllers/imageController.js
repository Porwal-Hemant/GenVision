import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'
import userModel from '../models/userModel.js'

// Controller function to generate image from prompt
// http://localhost:4000/api/image/generate-image
const generateImage = async (req, res) => {

  try {
   // Now writing logic for creating image with the help of prompt  
    const { userId, prompt } = req.body

    // Fetching User Details Using userId
    const user = await userModel.findById(userId)
    
    if (!user || !prompt) {
      return res.json({ success: false, message: 'Missing Details' })
    }

    // Checking User creditBalance
    if (user.creditBalance === 0 || userModel.creditBalance < 0) {
      return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance })
    }

    // Creation of new multi/part formdata
    const formdata = new FormData()
    formdata.append('prompt', prompt)

    // Calling Clipdrop API
    // https://clipdrop-api.co/text-to-image/v1  -> API endpoint 
    const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formdata, {
      headers: {
        'x-api-key': process.env.CLIPDROP_API,
      },
      responseType: "arraybuffer"
    })

    // When we convert the image binary data to a Base64 string, it becomes a Data URL that the browser can directly use to display the image without needing a file or separate API request.

    // Convertion of arrayBuffer to base64
    const base64Image = Buffer.from(data, 'binary').toString('base64');   // Converts binary image data to Base64.  
    const resultImage = `data:image/png;base64,${base64Image}`   //   Creates a Base64 Data URL for direct use in HTML or JSON.

    // Deduction of user credit 
    await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 })

    // Sending Response
    res.json({ success: true, message: "Background Removed", resultImage, creditBalance: user.creditBalance - 1 })

  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}

// function for removing the image background 

const removeBgImage = async (req, res) => {

  try {
    // form data to get images from frontend to backend 
    const { userId } = req.body

    // Fetching User Details Using userId
    // one error is coming over here  
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: 'User Not Found' })
    }

    // Checking User creditBalance
    if (user.creditBalance === 0 || userModel.creditBalance < 0) {
      return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance })
    }
    
    // till here i have done all the necessary changes and i am sure about the changes as well  

    // Getting Image Path
    const imagePath = req.file.path;

    // // Read the image file
    const imageFile = fs.createReadStream(imagePath)

    // Creation of new multi/part formdata
    const formdata = new FormData()
    formdata.append('image_file', imageFile)

    // Calling Clipdrop API
    const { data } = await axios.post('https://clipdrop-api.co/remove-background/v1', formdata, {
      headers: {
        'x-api-key': process.env.CLIPDROP_API,
      },
      responseType: "arraybuffer"
    })

    // Conversion of arrayBuffer to base64
    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`

    // Deduction of user credit 
    await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 })

    // Sending Response
    res.json({ success: true, message: "Background Removed", resultImage, creditBalance: user.creditBalance - 1 })

  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}

export {generateImage , removeBgImage}

