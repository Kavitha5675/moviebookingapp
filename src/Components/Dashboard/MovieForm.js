import React from 'react';
import {Field, Formik} from "formik";
import '/Users/admin/Documents/Projects/personal/moviebookingapp/src/Components/Styles/Styles.scss'

const MovieForm = ({movieData}) => {

    const initialValues = {
        _id: "",
        booked: ""
    };

    const movieSchema = (values) => {
        let errors = {};
        let isIdValid = 0
        let key;
        for (key in movieData) {
            if (movieData[key]["_id"] === values._id) {
                isIdValid = 1
                break
            }
        }
        if (!isIdValid) {
            errors._id = "Enter a Valid movieId"
        } else {
            let book = (parseInt(movieData[key]["booked"], 10)) + parseInt(values.booked, 10)
            let total = (parseInt(movieData[key]["total"], 10))
            let available = (parseInt(movieData[key]["total"], 10)) - (parseInt(movieData[key]["booked"], 10))
            if (book > total) {
                console.log("hi")
                errors.booked = "Only " + available + " tickets are available"
            }
            if (available === 0) {
                errors.booked = "No tickets are available"
            }
        }
        return errors;
    }

    const submitForm = (values) => {
        console.log(values)
    }
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validate={movieSchema}
                onSubmit={submitForm}>

                {(formik) => {
                    const {
                        values,
                        handleChange,
                        handleSubmit,
                        errors,
                        touched,
                        handleBlur,
                        isValid,
                        dirty,
                        isSubmitting
                    } = formik;


                    return (
                        <div className={"container"}>
                            <h3>Booking Dashboard</h3>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor={"_id"}>Movie Id</label>
                                <Field type={"_id"} name={"_id"} id={"_id"} data-testid={"_id"} value={values._id}
                                       onChange={handleChange} onBlur={handleBlur}
                                       className={errors._id && touched._id ? "input-error" : null}/>
                                {errors._id && touched._id && (
                                    <span className={"error"}>{errors._id}</span>
                                )}

                                <label htmlFor={"booked"}>Number of tickets to book</label>
                                <Field type={"booked"} name={"booked"} id={"booked"} data-testid={"booked"}
                                       value={values.booked}
                                       onChange={handleChange} onBlur={handleBlur}
                                       className={errors.booked && touched.booked ? "input-error" : null}/>
                                {errors.booked && touched.booked && (
                                    <span className={"error"}>{errors.booked}</span>
                                )}

                                <button
                                    type={"submit"}
                                    data-testid={"button"}
                                    onClick={handleSubmit}
                                    className={!(dirty && isValid) ? "disabled-btn" : ""}
                                    disabled={!(dirty && isValid)}
                                >
                                    Book
                                </button>
                                {Object.keys(errors).length === 0 && isSubmitting && (
                                    <span>movie {values._id} booked</span>
                                )}
                            </form>
                        </div>
                    )
                }}
            </Formik>
        </div>
    )
};

export default MovieForm