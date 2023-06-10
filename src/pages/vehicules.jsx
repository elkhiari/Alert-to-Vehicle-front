import React, { useEffect, useState } from 'react'
import { fetchData } from '../components/apiData';
import { LoadingAnimation } from '../components/looooooooooo';
import TableAdmin from '../components/tableAdmin';
import TableUser from '../components/tableUser';


function Vehicules() {
    const [looo,setLooo] = useState(true)
    const token = localStorage.getItem("token")
    const [me,setMe] = useState()
    useEffect(()=>{
        fetchData("http://localhost:8000/api/v1/vehicule/me", token)
        .then((myv) => {
        setMe(myv.me)
        })
        .catch((err) => {
        console.log(err);
        localStorage.removeItem("token")
        window.location.href = "/connexion"
        });
        setLooo(false);
    },[])
  return (
    <>
        <div className="absolute top-7 left-10">
        <button type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={()=>{
          localStorage.removeItem("token")
          window.location.href = "/connexion"
        }}>Se déconnecter</button>
      </div>
    <div className='w-full min-h-screen flex place-content-center place-items-center bg-blue-200 mt-15'>

    {
    looo == true?<LoadingAnimation/>:
    <>{me && me.type_permission === 'ADMIN' ?<TableAdmin />:<TableUser />}</>
    }
    </div>
    </>
  )
}

export default Vehicules