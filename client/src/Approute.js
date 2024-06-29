import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Addproduct from './Component/Product/Addproduct'
import Productdetail from './Component/Product/Productdetail'
import Test from './Component/Home_page/Test'


const Approute = () => {

    return (
        <>
        <Routes>
            {/* <Route path="/" element={ <Test />} /> */}
            <Route path="/" element={ <Addproduct />} />
            <Route path="/addproduct" element={ <Addproduct />} />
            <Route path="/productdetail" element={<Productdetail />} />
            
        </Routes>
           
        </>
    )
}

export default Approute