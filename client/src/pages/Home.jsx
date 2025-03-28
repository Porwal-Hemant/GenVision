import React from 'react'
import Header from '../components/Header'
import Header2 from '../components/Header2'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Testimonials from '../components/Testimonials'
import GenerateBtn from '../components/GenerateBtn'
import BgSlider from '../components/BgSlider'
const Home = () => {
  return (
    <div>

         <Header/>
         {/* HERE I HAVE TO INSERT SOME OTHER PAGE OR ELSE I SHOULD DO CHANGES IN HEADER ONLY  */}
         <Header2/>
         <Steps/>
         <Description/>
         {/* One more page inserted   */}
         <BgSlider/>
         <Testimonials/>
         {/* Last one is unnecessary for me  */}
         {/* <GenerateBtn/> */}

    </div>
  )
}

export default Home


