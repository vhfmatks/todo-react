
import axios from 'axios';

const getData = (limit, page) =>{
    return new Promise ( (resolve, reject)=>{
        axios.get(`http://localhost:8001/todos?limit=${limit}&page=${page}`)
        .then( (result)=> {
            if( result.data.status === "error")
                reject(result.data.data);
            else resolve(result);
        })
        .catch( (err) => {
            reject(err);
        })
    })
}
export default getData;
