import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { fetchDataPost,fetchData } from '../components/apiData';
export default function ViewAlert()
{
    const { id } = useParams();
    const token = localStorage.getItem("token")
    const [data, setData] = useState([])
    
    useEffect(()=>{
        console.log(token)
        fetchData("http://localhost:8000/api/v1/vehicule/alert", token)
        .then((d) => {
            setData(d)
        })
        .catch((err) => {
            // localStorage.removeItem("token")
            // window.location.href = "/connexion"
        });
    }, [])

    const handleRoute= (id)=>{
        fetchDataPost("http://localhost:8000/api/v1/alert/"+id, token,null)
        .then((d) => {
            console.log(d)
        })
        .catch((err) => {
            // localStorage.removeItem("token")
            // window.location.href = "/connexion"
        });
    }

    return(

        <div className="flex place-content-center place-items-center md:p-10">
            {data && data.map((d)=>(
                <>
                {d._id != id ?'':
            <>
            
          
                <div calassName="flex">
                    <div className="flex place-content-center place-items-center">{d.images && d.images.map((i)=>(
                        <><img className="h-full" src={'data:image/jpeg;base64,'+i} /></>
                    ))}</div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 duration-300">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                    Type urgence
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Nivau d'urgence
                    </th>
                    <th scope="col" className="px-6 py-3">
                    mobile phone
                    </th>
                    <th scope="col" className="px-6 py-3">
                        action
                    </th>
                    
                </tr>
            </thead>
            <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {d.type_urgence }
                        </th>
                        <td className="px-6 py-4">
                            {d.nv_urgence}
                        </td>
                        <td className="px-6 py-4">
                            +212 {d.mobile_phone}
                        </td>
                        <td className="px-6 py-4 text-right">
                            <button onClick={()=>handleRoute(d._id)} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded inline-flex items-center ml-2" >
                                <span>{d.status = "pending"?"En Route":"traité"}</span>
                            </button>
                        </td>
                    </tr>
                        <tr className="text-center"><span className="px-6 py-4  font-bold text-gray-900 whitespace-nowrap dark:text-white">Description :</span> {d.description}</tr>
            </tbody>
        </table>
    </div>
            



                </div>
                
            
            </>
            }
                </>
            ))}
        </div>
    )
}