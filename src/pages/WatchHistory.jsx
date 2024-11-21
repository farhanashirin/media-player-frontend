import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteHistoryAPI, getHistoryAPI } from '../services/allAPI'

function WatchHistory() {


  const[history,setHistory]=useState([])

  useEffect(()=>{
    getHistory()
  },[])

  const getHistory= async()=>{
    const result = await getHistoryAPI()
    if(result.status==200){
      setHistory(result.data)
    }else{
      console.log("api failed")
      setHistory(result.message)
    }
  }
  console.log(history)

  //api calling
  const removeVideoHistory= async(id)=>{
    await deleteHistoryAPI(id)
    getHistory() // to get the remaining history after deleting a video without refreshing the page
  }

  return (
    <>
      <div className="container mt-5 mb-3 d-flex justify-content-between">
        <h2>Watch history</h2>
        <Link style={{textDecoration:"none",color:"blueviolet",fontSize:"30px"}} to={"/home"}>
        Back To Home<i className="fa-solid fa-arrow-rotate-left fa-beat"></i>
        </Link>
      </div>

      <div className="container mt-5 mb-3 w-100">
        <table className="table shadow w-100 p-3 m-2">
           <tr>
            <th>#</th>
            <th>Title</th>
            <th>Video Url</th>
            <th>Time Stamp</th>
            <th>Action</th>
           </tr>
           {
  history?.length > 0 ? (
    // If history array is not empty, render table rows
    history.map((video, index) => (
      <tr key={video?.id}>
        <td>{index + 1}</td>
        <td>{video?.caption}</td>
        <td><a href={video?.link} target='_blank' rel="noopener noreferrer">{video?.link}</a></td>
        <td>{video?.timeStamp}</td>
        <td>
          <button className="text-danger btn" onClick={() => removeVideoHistory(video?.id)}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    ))
  ) : (
    // If history array is empty, display message
    <p className='text-danger fw-bolder'>Nothing to Display</p>
  )
}

        </table>
      </div>
      
    </>
  )
}

export default WatchHistory