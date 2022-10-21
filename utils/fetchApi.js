import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url) => {
    const {data} = await axios.get((url), {
        headers: {
            'X-RapidAPI-Key': 'e527e38febmshfc8d28063ba50fcp12da01jsn7871f9461ebf',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
          }        
    })

    return data;
}