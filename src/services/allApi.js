import {BASE_URL} from './baseUrl';
import {commonRequest } from './commonRequest';

//addvideo
export const addVideo = async (body)=>{
  return await commonRequest("POST",`${BASE_URL}/videos`,body)
}

//getvideos
export const getVideos = async ()=>{
    return await commonRequest("GET",`${BASE_URL}/videos`,"")
}

//DELETVIDEO
export const deletevideo = async (id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/videos/${id}`,{})
}

//addCategory
export const addCategory = async (body)=>{
    return await commonRequest("POST",`${BASE_URL}/categories`,body)
}

//getallcategory
export const getallcategory = async ()=>{
    return await commonRequest("GET",`${BASE_URL}/categories`,"")
}

//delete category
export const deletecategory = async (id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/categories/${id}`,{})
}

//gethistory
export const gethistory = async ()=>{
    return await commonRequest("GET",`${BASE_URL}/watchhistory`,"")
}

//addhistory
export const addhistory = async (body)=>{
    return await commonRequest("POST",`${BASE_URL}/watchhistory`,body)
}

//getsinglevideo
export const getavideo = async (id)=>{
    return await commonRequest("GET",`${BASE_URL}/videos/${id}`,"")
}

//updateCategory
export const updateCategory = async (id,body)=>{
    return await commonRequest("PUT",`${BASE_URL}/categories/${id}`,body)
}