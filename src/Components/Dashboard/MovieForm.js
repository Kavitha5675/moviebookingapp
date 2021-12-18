import React, {useState} from 'react';
import '/Users/admin/Documents/Projects/personal/moviebookingapp/src/Components/Styles/Styles.scss'
import {TextField} from "@material-ui/core";

const MovieForm = (props) => {

    const [idError, setIdError] = useState("")
    const [bookError, setBookError] = useState("")
    const [id, setId] = useState("")
    const [booked, setBooked] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);
    let isIdValid = 0

    const handleSubmit = (e) => {
        e.preventDefault();
        handleBlurForId(id)
        handleBlurForBook(booked)
        if (idError.length === 0 && bookError.length === 0) {
            setIsSubmitting(true)
            props.onSubmit(id, booked)
        }
    };

    const getIdValidation = (id) => {
        console.log(id)
        for (const [key, value] of props.movieData.entries()) {
            if (value._id === id) {
                isIdValid = 1
                break
            }
        }
        if (!isIdValid) {
            setIdError("Enter a valid id")
        } else {
            setIdError("")
        }
    }

    const handleBlurForId = (id) => {
        getIdValidation(id)
    }

    const getBookValidation = (booked) => {
        console.log(booked)
        let isValidBook = 0;
        for (const [key, value] of props.movieData.entries()) {
            if (value._id === id) {
                console.log(id)
                let book = (parseInt(value.booked, 10)) + parseInt(booked, 10)
                let total = (parseInt(value.total, 10))
                if (book <= total) {
                    isValidBook = 1
                    break
                }
            }
        }
        if (!isValidBook) {
            setBookError("Booking with " + id + " cannot be done")
        } else {
            setBookError("")
        }
    }

    const handleBlurForBook = (booked) => {
        getBookValidation(booked);
    }

    return (
        <div className={"container"}>
            <form onSubmit={handleSubmit}>
                <h3>Booking Dashboard</h3>
                <label htmlFor={"movie-id"}>Movie Id</label>
                <TextField type={"_id"} name="movie-id" id="movie-id" value={id}
                           onChange={event => setId(event.target.value)}
                           inputProps={{"data-testid": "_id"}}
                           onBlur={event => handleBlurForId(event.target.value)}/>
                {idError.length !== 0 && (
                    <span className={"error"}>{idError}</span>
                )}

                <label htmlFor={"booked"}>Number of tickets to book</label>
                <TextField type={"booked"} name={"booked"} id={"booked"} inputProps={{"data-testid": "book"}}
                           value={booked}
                           onChange={event => setBooked(event.target.value)}
                           onBlur={event => handleBlurForBook(event.target.value)}/>
                {bookError.length !== 0 && (
                    <span className={"error"} id={"book-error"}>{bookError}</span>)}

                <button
                    type={"submit"}
                    role={"button"}
                    onClick={handleSubmit}
                >
                    Book
                </button>
                {idError.length === 0 && bookError.length === 0 && isSubmitting && (
                    <span>movie {id} booked</span>
                )}
            </form>
        </div>
    )
};

export default MovieForm