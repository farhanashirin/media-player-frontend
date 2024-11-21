import { commonAPI } from "./commonApi"
 import {server_url} from "./server.url"

//add video
export const uploadVideoAPI=async(video)=>{
return await commonAPI("POST",`${server_url}/allVideos`,video)
}
//getVideo

export const getAllVideoAPI = async()=>
{
return await commonAPI("GET",`${server_url}/allVideos`,"")
}
//getAvideo
export const getAvideoAPI = async(id)=>
{
    return await commonAPI("GET",`${server_url}/allVideos/${id}`,"")
}
//delete video
export const deleteVideoAPI = async(id)=>
{
    return await commonAPI("DELETE",`${server_url}/allVideos/${id}`)
}


//delete history
export const deleteHistoryAPI= async(id)=>
{
return await commonAPI("DELETE",`${server_url}/history/${id}`,{})
}
//watch hsitory
export const getHistoryAPI = async () => {
 return await commonAPI("GET", `${server_url}/history`, "");
  }
  //add history
  export const addHistoryAPI = async (videoHistory) => {
    return await commonAPI("POST", `${server_url}/history`, videoHistory);
  };

  //add category
  export const addCategoryAPI=async(category)=>{
    return await commonAPI("POST",`${server_url}/category`,category)
    }
    //getCAtegoryAPI
    export const getCategoryAPI=async()=>{
      return await commonAPI("GET",`${server_url}/category`,"")
      }
    //deleteCategory
 export const deleteCategoryAPI=async(id)=>
 {
  return await commonAPI("DELETE",`${server_url}/category/${id}`,{})
 }
 //updateategoryAPI
 export const updateCategoryAPI=async(id,categoryDetails)=>{
  return await commonAPI("PUT",`${server_url}/category/${id}`,categoryDetails)
  }
    