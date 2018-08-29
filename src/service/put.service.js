
import axios from 'axios';

const putData = (payload) =>{
    return new Promise ( (resolve, reject)=>{
        axios.put(`http://yhchoi.iptime.org:8001/todos`,
        payload )
        .then( (result)=> {
            if( result.data.status === "error")
                reject(result.data.data);
            else resolve(result)
        })
        .catch( (err) => {
            reject(err);
        })
    })
}
export default putData;
