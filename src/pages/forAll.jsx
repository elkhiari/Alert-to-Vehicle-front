import React, { useEffect, useState } from 'react'
import { fetchData } from '../components/apiData';

function Vehicules() {
    const token = localStorage.getItem("token")
    const [me,setMe] = useState() 
    useEffect(()=>{
        console.log(token)
        fetchData("http://localhost:8000/api/v1/vehicule/me", token)
        .then((myv) => {
        setMe(myv)
        })
        .catch((err) => {
        localStorage.removeItem("token")
        window.location.href = "/connexion"
        });
    },[])
  return (
    <div>Vehicules</div>
  )
}

export default Vehicules