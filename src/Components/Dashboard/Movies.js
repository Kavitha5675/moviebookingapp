import React, {useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import MovieService from "../Services/MovieService";
import MovieForm from "./MovieForm";

function Movies() {
    const [movieData, setMovieData] = useState([])

    useEffect(() => {
        getMovies();
    }, [])

    function getMovies() {
        try {
            MovieService.list().then(movies => {
                setMovieData(movies.data)
            })
        } catch (e) {
        }
    }

    const handleSubmit = (values) => {
        let data;
        movieData.forEach((movie) => {
            if (values._id === movie["_id"]) {
                movie["booked"] = (parseInt(movie["booked"], 10) + parseInt(values.booked, 10)).toString();
                console.log(movie["booked"])
                data = {
                    "name": movie.name,
                    "total": movie["total"],
                    "booked": movie["booked"]
                }
                MovieService.update(data, values._id).then()
                getMovies()
            }
        })
    };

    return (
        <div className={{class: "movie"}}>
            <MovieForm movieData={movieData} handleSubmit={handleSubmit}/>
            <Table aria-label="simple table" id="table">
                <TableHead>
                    <TableRow>
                        <TableCell key={"movieName"} id="name" align="center">Movie Name</TableCell>
                        <TableCell id="_id" align="center">ID</TableCell>
                        <TableCell id="total" align="center">Total tickets</TableCell>
                        <TableCell id="booked" align="center">Booked</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {movieData.map(movies => {
                        return (
                            <TableRow key={movies["_id"]}>
                                <TableCell data-testid={"name"} align="center">{movies.name}</TableCell>
                                <TableCell data-testid={"_id"} align="center">{movies["_id"]}</TableCell>
                                <TableCell data-testid={"total"}
                                           align="center">{movies["total"]}</TableCell>
                                <TableCell data-testid={"booked"}
                                           align="center">{movies["booked"]}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

        </div>
    );
}

export default Movies;