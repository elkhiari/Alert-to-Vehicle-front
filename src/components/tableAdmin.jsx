import React, { useEffect, useState } from 'react'
import { fetchData } from '../components/apiData';
import PDfDownloadBtn from './PDF';
import {MdLockReset} from 'react-icons/md'


function TableAdmin() {
    const token = localStorage.getItem("token")
    const [data, setData] = useState([])
    const [notif,setNotif] = useState(false)
    useEffect(()=>{
        console.log(token)
        fetchData("http://localhost:8000/api/v1/vehicule", token)
        .then((d) => {
            setData(d.Vehicules)
        })
        .catch((err) => {
            localStorage.removeItem("token")
            window.location.href = "/connexion"
        });
    }, [])

    const handleReset= (id)=>{
        fetchData("http://localhost:8000/api/v1/vehicule/reset/"+id, token)
        .then((d) => {
            console.log(d)
            setNotif(true)
        })
        .catch((err) => {
            localStorage.removeItem("token")
            window.location.href = "/connexion"
        });
    }
    useEffect(() => {
        let timeoutId;
    
        if (notif) {
          timeoutId = setTimeout(() => {
            setNotif(false);
          }, 5000);
        }
    
        return () => clearTimeout(timeoutId);
      }, [notif]);
  return (
    <div>
        {notif == true ?<div class="flex p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800 duration-300" role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Info</span>
            <div>
                <span class="font-medium">Warning alert!</span> la réinitialisation du mot de passe a réussi, veuillez actualiser la page avant de télécharger les données.
            </div>
        </div>: ''}
        <div className='mb-4'>
            <a href="vehicules/ajoute" className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 duration-300'>Ajouté Vehicule</a>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 duration-300">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            matricule
                        </th>
                        <th scope="col" className="px-6 py-3">
                            capacite
                        </th>
                        <th scope="col" className="px-6 py-3">
                            action
                        </th>
                        
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((d) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {d.name}
                            </th>
                            <td className="px-6 py-4">
                                {d.type}
                            </td>
                            <td className="px-6 py-4">
                                {d.matricule}
                            </td>
                            <td scope="col" className="px-6 py-3">
                                {d.capacite}
                            </td>   
                            <td className="px-6 py-4 text-right">
                                <PDfDownloadBtn data={d} />
                                <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded inline-flex items-center ml-2" onClick={()=>{handleReset(d._id)}}>
                                    <MdLockReset className="fill-current w-4 h-4 mr-2"  />
                                    <span>Réinitialiser</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default TableAdmin
