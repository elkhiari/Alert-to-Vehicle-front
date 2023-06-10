import React, { useEffect, useState } from 'react'
import 'flowbite'
import { ImLocation2 } from 'react-icons/im';
import { TiDelete } from 'react-icons/ti';
import {useCurrentLocation} from '../components/GetAccesLocal';
import {fileToBase64} from '../components/FileTobase'
import { postData } from '../components/apiData';
import { LoadingAnimation } from '../components/looooooooooo';
import { SuccesAlert } from '../components/succesAlert';

function Alert() {
    const {latitude,longitude}= useCurrentLocation();
    const [base64Data, setBase64Data] = useState('');
    const [images,setImages] = useState([])
    const [looo,setLooo] = useState(true)
    const [goodSend,setGoodSend] = useState(false)

    useEffect(()=>{
        setLooo(false);
    },[])

    function handleFileUpload(event) {
        const file = event.target.files[0];
    
        fileToBase64(file)
          .then((data) => {
            setImages([...images, data]);
        
          })
          .catch((error) => {
            console.error('Error converting file to base64:', error);
          });
      }

      function handleDeleteImage(index) {
        const newImages = [...images.slice(0, index), ...images.slice(index + 1)];
    
        setImages(newImages);
      }

      const HandleSubmit = async (e)=>{
        e.preventDefault();
        setLooo(true)
        try {
            const data = {
                "localisation":{
                    "coordinates":[latitude,longitude]
                },
                "type_urgence":e.target[1].value
                ,"nv_urgence":e.target[3].value
                ,"description":e.target[4].value
                ,"mobile_phone":e.target[2].value
                ,"images":images
            }
            const response = await postData('http://localhost:8000/api/v1/alert',data);
            console.log(response)
            setGoodSend(true)
        } catch (error) {
            console.log(error)
        }
        setLooo(false)
      }
      
  return (
    <div className='w-full min-h-screen flex place-content-center place-items-center'>
    {goodSend == true ?<><SuccesAlert /></>:<>{looo == true?<LoadingAnimation/>:
    <div className='sm:w-1/2 sm:p-3 p-6 '>   
    <form onSubmit={HandleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
            <label for="Localisation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Localisation</label>
            <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <ImLocation2  className='text-blue-700'/>
                    </span>
                    <input type="text" value={latitude+','+longitude} id="Localisation" disabled={true} className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="61234567" />
            </div>
            </div>

            <div>
                <label for="Type d'urgence" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type d'urgence</label>
                <input type="text" id="Type d'urgence" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="incendie" required />
            </div>  
            <div>
                <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                {/* <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required /> */}
                <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        +212
                    </span>
                    <input type="text" id="phone" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="61234567" />
                </div>

            </div>
            <div className="">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nivau d'urgence</label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="ELEVE">Élevé</option>
                    <option value="MOYEN">Moyen</option>
                    <option value="FAIBLE">Faible</option>
                </select>
        </div>
        </div>
        
            <div className="mb-6">
                <label for="Description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea type="password" id="Description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
            </div>
            {images.length < 3 ?
            <div className="mb-6">

            <div className="flex items-center justify-center w-full">
            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileUpload}/>
            </label>
        </div> 
            </div>:
            <div class="border-2 border-gray-400 flex p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Info</span>
            <div>
            <span class="font-medium">Alerte d'avertissement!</span> vous avez accès pour ajouter seulement 3 images.
            </div>
        </div>
        
            }
        <div className="flex items-center justify-center w-full mb-6 ">
    {images && (
        images.map((image, index) => (
            <div key={index} className="relative inline-block">
            <img className="w-20 mx-10 rounded" src={`data:image/jpeg;base64,${image}`} alt="Uploaded file" />
            <button className='absolute top-0 left-0 p-1 text-red-600' onClick={() => handleDeleteImage(index)}>
                <TiDelete />
            </button>
            </div>)) 
    )}
    </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>

    </div>}</>}
    </div>
  )
}

export default Alert