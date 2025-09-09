import React from 'react'
import SimpleSlider from './UIcomponents/secgtion1/SectionSlider'
import Productmodal from './UIcomponents/Section2/Section2'
import Navbar1 from './UIcomponents/heder1/Heder1'
import RecommendedProducts from './UIcomponents/Recomended/Recomended'
import HappyCustomers from './UIcomponents/Happy Customers/Happ'
import Slider from 'react-slick'
import Header from './UIcomponents/heder/Heder'
                          
const App = () => {
  return (
    <div>
      <Header/>
      <Navbar1/>
      <Slider/>
      <RecommendedProducts/>
      <SimpleSlider/>
      <Productmodal/>
      <HappyCustomers/>
    </div>
  )
}

export default App