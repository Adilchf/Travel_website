import axios from "axios";

const URL ='https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'


    


 

export const getPlacesData = async(sw, ne)=> {
    try {
        const { data: { data } } = await axios.get(URL ,    { params: {
            bl_latitude: sw.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
            tr_latitude: ne.lat,
    
        },
        headers: {
          'x-rapidapi-key': 'a62510f3dfmsha4c2985f0113101p12fcb3jsn01a78b438ce9',
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
        }
      });
      
        return data;
    } catch (error) {
        console.log('error')
        
    }
}