import axios from "axios";
import "regenerator-runtime/runtime";

const MovieService = () => {
    return {
        list: async () => {
            return await axios.get(`https://crudcrud.com/api/9be4851dde1546549990cb5a413176c4/movies`);
        },
        update: async (requestData, _id) => {
            await axios.put(`https://crudcrud.com/api/9be4851dde1546549990cb5a413176c4/movies/${_id}`, requestData)
        }
    }
};

export default MovieService();


