import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import VideoCard from './VideoCard'
import { getAllVideoAPI, getCategoryAPI, updateCategoryAPI } from '../services/allApi'

function View({uploadVideoResponse,setDropVideoResponse}) {

// we cant apply user to api directly

const[allVideos,setAllVideos]=useState([])
const[deleteVideoResponse,setDeleteVideoResponse]=useState(false);

// to get the videos use api call
const getAllVideos= async() =>{
  //api calling
  const result = await getAllVideoAPI()
  console.log(result)
  if(result.status==200){
    setAllVideos(result.data)
  }
  else{
    alert("api failed")
    setAllVideos([]) // display empty array
  }
}
console.log(allVideos);


useEffect(() =>{
  getAllVideos()
  setDeleteVideoResponse(false)
},[uploadVideoResponse,deleteVideoResponse])


 const dragOver=(e)=>{
  e.preventDefault()
 }

 const videoDropped= async(e)=>{
  const{videoId,categoryId}=JSON.parse(e.dataTransfer.getData("data"))
  // console.log("videoid:",videoId,"categoryId:",categoryId);
  const {data}= await getCategoryAPI()
  const selectedCategory= data.find(item=>item.id==categoryId)
  let result= selectedCategory.allVideos.filter(video=>video.id!==videoId)
  console.log(result);

  let {id,categoryName}=selectedCategory
  let newCategory={id,categoryName,allVideos:result}
  const res = await updateCategoryAPI(categoryId,newCategory)
  setDropVideoResponse(res)
 }

  return (
    <>

       <h2>All Videos</h2>

      <Row  droppable="true" onDragOver={e=>dragOver(e)} onDrop={e=>videoDropped(e)}>
       { 
        allVideos?.length>0?allVideos.map((video,index)=>(//here we use index to avoid the warning of child in the list
          <Col key={index} sm={12} md={6} lg={4} >
             <VideoCard video={video} setDeleteVideoResponse={setDeleteVideoResponse} /> 
          </Col>
        )):<p className='text-danger'>Nothing to Display</p>
        }
        
      </Row>
    </>
  )
}

export default View