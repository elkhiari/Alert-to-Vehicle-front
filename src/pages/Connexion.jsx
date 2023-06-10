import React, { useContext, useEffect, useState } from 'react'
import { Si1Password } from 'react-icons/si';
import { AiTwotoneCar } from 'react-icons/ai';
import { IoMdLogIn } from 'react-icons/io';
import { LoadingAnimation } from '../components/looooooooooo';
import { postData } from '../components/apiData';
import { Navigate } from 'react-router-dom';



function Connexion() {
    const [looo,setLooo] = useState(true)

    useEffect(()=>{
        setLooo(false);
        if(localStorage.getItem("token") != null) window.location.href = "/vehicules"
    },[])
    const HandleSubmit = async (e)=>{
        e.preventDefault();
        setLooo(true)
        try {
            const data = {
                matricule:e.target[0].value,
                password:e.target[1].value
            }
            const response = await postData('http://localhost:8000/api/v1/connexion',data);
            console.log(response)
            localStorage.setItem("token",response.token)
            window.location.href = "/vehicules"
        } catch (error) {
            console.log(error)
        }
        setLooo(false)
      }
  return (
    <>
    <form onSubmit={HandleSubmit}>
    <div className='w-full min-h-screen flex place-content-center place-items-center'>
    {looo == true?<LoadingAnimation/>:
        <div className='sm:w-1/2 sm:p-10 p-6 min-h-1/2  rounded '>
        <div className='mb-3'>
            <label for="Matricule" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Matricule</label>
            <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <AiTwotoneCar  className='text-blue-700'/>
                    </span>
                    <input type="text"  id="Matricule"  className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1234A57" required/>
            </div>
        </div>
        <div className='mb-3'>
            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
            <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <Si1Password  className='text-blue-700'/>
                    </span>
                    <input type="password"  id="password"  className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" required/>
            </div>
        </div>
        <button type="submit" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 flex place-content-center place-items-center ">Connexion <IoMdLogIn size={25} className="ml-3 hover:ml-5 duration-200"/></button>
        </div>}
    </div>
</form></>
  )
}

export default Connexion