import React, { useEffect, useState } from 'react'
import { gethistory } from '../services/allApi'

function Watchhistory() {
    const [history,setHistory] = useState([])

    const getwatchhistory = async ()=>{
       const {data} = await gethistory()
       setHistory(data)
    }
    useEffect(()=>{
        getwatchhistory()
    },[])

  return (
    <>
    <h1>Watchhistory</h1>
    <table className='table shadow m-3 rounded border'>
    <thead>
        <tr>
            <th>No</th>
            <th>Name</th>
            <th>URL</th>
            <th>Time</th>
        </tr>
    </thead>
    <tbody>
        {
            history?.map((item,index)=>(
        <tr>
            <td>{index+1}</td>
            <td>{item?.cardname}</td>
            <td>{item?.url}</td>
            <td>{item?.date}</td>
        </tr>
            ))
        }
        
    </tbody>
    </table>
    </>
  )
}

export default Watchhistory