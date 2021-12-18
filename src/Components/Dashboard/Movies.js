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
                console.log(movies)
                setMovieData(movies.data)
            })
        } catch (e) {
        }
    }

    const getUpdatedMovies = async (id, booked) => {
        let data;
        movieData.forEach((movie) => {
            if (id === movie["_id"]) {
                movie["booked"] = (parseInt(movie["booked"], 10) + parseInt(booked, 10)).toString();
                console.log(movie["booked"])
                data = {
                    "name": movie.name,
                    "total": movie["total"],
                    "booked": movie["booked"]
                }
            }
        })
        await MovieService.update(data, id).then()
        getMovies()
    };

    return (
        <div className={{class: "movie"}}>
            <MovieForm movieData={movieData} onSubmit={getUpdatedMovies}/>
            <Table aria-label="simple table" id="table">
                <TableHead>
                    <TableRow>
                        <TableCell key={"movieName"} id="name1" align="center">Movie Name</TableCell>
                        <TableCell id="id1" align="center">ID</TableCell>
                        <TableCell id="total1" align="center">Total tickets</TableCell>
                        <TableCell id="booked1" align="center">Booked</TableCell>
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