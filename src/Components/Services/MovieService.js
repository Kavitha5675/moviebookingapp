import axios from "axios";
import "regenerator-runtime/runtime";

const MovieService = () => {
    return {
        list: async () => {
            return await axios.get(`https://crudcrud.com/api/31370db2d35d4b03a0558f8b05fdc346/movies/`);
        },
        update: async (requestData, _id) => {
            await axios.put(`https://crudcrud.com/api/31370db2d35d4b03a0558f8b05fdc346/movies/${_id}`, requestData)
        }
    }
};

export default MovieService();


