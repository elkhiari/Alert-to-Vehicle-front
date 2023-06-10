import axios from 'axios';

export async function postData(url, data) {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error posting data');
  }
}


export async function fetchData(url,token) {

  const headers = {
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer '+token,
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching vehicule data');
  }
}


export async function fetchDataPost(url,token,data) {

  const headers = {
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer '+token,
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching vehicule data');
  }
}
