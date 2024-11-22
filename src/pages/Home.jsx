import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import Add from '../components/Add'
import View from '../components/View'
import Category from '../components/Category'

function Home() {

  const[uploadVideoResponse,setUploadVideoResponse]=useState({}) //state lifting first we set a common state in home /parent component,then suvr pass to add and uvr pass to view
  const[dropVideoResponse,setDropVideoResponse]=useState({})
  
  return (
    <>
      <div className="container mt-5 mb-3 d-flex justify-content-between">
        <div className="add-videos">
          <Add setUploadVideoResponse={setUploadVideoResponse}/>
        </div>
        <Link to={'/watch-history'} style={{textDecoration:"none"}} className='fw-bolder fs-2 text-primary'>
        Watch-History <i className="fa-solid fa-arrow-right-to-bracket"></i></Link>
      </div>

      <div className="container-fluid mt-5 w-100 row">
        <div className="col-lg-9 all-videos">
          <View uploadVideoResponse={uploadVideoResponse} setDropVideoResponse={setDropVideoResponse}/>
        </div>
       
        <div className="col-lg-3 all-category">
          <Category dropVideoResponse={dropVideoResponse}/>
        </div>
      </div>
    </>
  )
}

export default Home