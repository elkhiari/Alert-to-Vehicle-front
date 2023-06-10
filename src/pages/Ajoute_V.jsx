import React ,{useState,useEffect} from 'react'
import { ImLocation2 } from 'react-icons/im'
import { AiTwotoneCar } from 'react-icons/ai'
import Map from '../components/map'
import { fetchDataPost,fetchData } from '../components/apiData';

function Ajoute_V() {
    const [cor,setCor] = useState([])
    const token = localStorage.getItem("token")
    const [me,setMe] = useState()
    useEffect(()=>{
        fetchData("http://localhost:8000/api/v1/vehicule/me", token)
        .then((myv) => {
        setMe(myv.me)
        if(myv.me.type_permission != 'ADMIN') {
            window.location.href = "/vehicules"
        }
        // console.log(myv)
        })
        .catch((err) => {
        console.log(err);
        localStorage.removeItem("token")
        window.location.href = "/connexion"
        });
    },[])

    const HandleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const data = {
                "localisation":{
                    "coordinates":[cor.lat,cor.lng]
                },
                "name":e.target[1].value
                ,"matricule":e.target[2].value
                ,"capacite":e.target[3].value
                ,"type":e.target[4].value
                ,"type_permission":e.target[5].value
            }
            const response = await fetchDataPost('http://localhost:8000/api/v1/vehicule',token,data);
            window.location.href = "/vehicules"
            console.log(response)
        } catch (error) {
            console.log(error)
        }
      }
    

  return (
    <div className='w-full min-h-screen md:flex place-content-center place-items-center p-5'>
    <div className='md:w-1/2 p-3'>
            <form onSubmit={HandleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                <label for="Localisation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Localisation</label>
                <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <ImLocation2  className='text-blue-700'/>
                        </span>
                        <input type="text" value={cor.lat + ',' + cor.lng} id="Localisation" disabled={true} className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="61234567" />
                </div>
                </div>

                <div>
                    <label for="Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" id="Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Police..." required />
                </div>  
                <div>
                    <label for="matricule" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Matricule</label>
                    {/* <input type="tel" id="matricule" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required /> */}
                    <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <AiTwotoneCar  className='text-blue-700'/>
                        </span>
                        <input type="text" id="matricule" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1234A57" />
                    </div>

                </div>
                <div className="">
                    <label for="capacite" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Capacite</label>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="ELEVE">Élevé</option>
                        <option value="MOYEN">Moyen</option>
                        <option value="FAIBLE">Faible</option>
                    </select>
            </div>
            <div className="">
                    <label for="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="POMPIERS">Pompiers</option>
                        <option value="POLICE">Police</option>
                        <option value="AMBULANCE">Ambulance</option>
                    </select>
            </div>
            <div className="">
                    <label for="Role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="ADMIN">admin</option>
                        <option value="USER">user</option>
                    </select>
            </div>
                            </div>
            <div className="flex items-center justify-center w-full mb-6 ">
        </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
    </div>
    <div className='md:w-1/2 rounded -lg p-3'>
        <Map  setCor={setCor} />
    </div>
    </div>
  )
}

export default Ajoute_V