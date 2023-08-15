import axios from 'axios';

export const commonRequest = async (method,url,body)=>{
    let reqConfig = {
        method,
        url,
        data:body,
        headers:{
            "Content-Type":"application/json"
        }
    }
    return await axios(reqConfig).then(
        (response)=>{
            return response
        }
    ).catch((err)=>{
        return err
    })
}