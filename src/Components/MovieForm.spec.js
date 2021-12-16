import React from 'react';
import MovieForm from "./Dashboard/MovieForm";
import {act, cleanup, fireEvent, render, screen} from '@testing-library/react'
import user from '@testing-library/user-event'

afterAll(()=>{
    cleanup()
})

it('checks if title booking dashboard and input fields are rendered', () => {
    render(<MovieForm/>)
    expect(screen.getByText("Booking Dashboard")).toBeInTheDocument()
    expect(screen.getByTestId("_id")).toBeInTheDocument()
    expect(screen.getByTestId("booked")).toBeInTheDocument()
})

it("check if the book button is rendered", async () => {
    const handleSubmit = jest.fn()
    const {getByTestId, getByRole} = render(<MovieForm handleSubmit={handleSubmit}/>)
    let idInput = getByTestId("_id");
    let bookInput = getByTestId("booked");
    await act(async () => {
        fireEvent.change(idInput, {target: {value: "123456"}})
        fireEvent.change(bookInput, {target: {value: "3"}})
    })
    await act(async () => {
        try {
            fireEvent.click(getByRole("button"))
            expect(handleSubmit).toHaveBeenCalledTimes(1);
        } catch (e) {
        }
    })
})

it("check if the id validation is rendered", async () => {
    const {getByTestId, container} = render(<MovieForm movieData={[]}/>)
    await act(async () => {
        let idInput = getByTestId("_id");
        fireEvent.change(idInput, {target: {value: "123456456"}})
        fireEvent.blur(idInput)
    })

    expect(container.innerHTML).toMatch("Enter a Valid movieId")
})

it("checks if the tickets validation is rendered", async () => {
    const movieData = jest.fn()
    movieData.mockClear()
    const data = {
        _id: "61b82ba297069d03e8491e1d",
        name: "Avengers",
        total: "50",
        booked: "6"
    };
    const {container} = render(<MovieForm movieData={data}/>)
    const id = screen.getByText(/movie id/i)
    user.type(id, "61b82ba297069d03e8491e1d")
    const book = screen.getByText(/number of tickets to book/i)
    user.type(book, "56")

    const button = screen.getByRole('button', {
        name: /book/i
    });
    fireEvent.blur(button)
    await act(async () => {
        try {
            expect(movieData).toHaveBeenCalledTimes(1)
            expect(button).toBeInTheDocument()
            expect(container.innerHTML).toMatch(/only 44 tickets are available/i)
        } catch (e) {
        }
    })
})

it("checks for the successful message after booking", async () => {
    const movieData = jest.fn()
    movieData.mockClear()
    const data = {
        _id: "61bb79d897069d03e8492466",
        name: "Avengers",
        total: "50",
        booked: "6"
    };
    const {container} = render(<MovieForm movieData={data}/>)
    await act(async () => {
        const id = screen.getByText(/movie id/i)
        user.type(id, "61bb79d897069d03e8492466")
        const book = screen.getByText(/number of tickets to book/i)
        user.type(book, "6")
        user.click(screen.getByRole('button', {
            name: /book/i
        }));

    })
    // fireEvent.blur(button)
    await act(async () => {
        try {
            expect(movieData).toHaveBeenCalledTimes(1)
            expect(container.innerHTML).toMatch(/movie 61bb79d897069d03e8492466 booked /i)
        } catch (e) {
        }
    })

})


// it("check if the book button is rendered",async()=>{
//     const handleSubmit = jest.fn()
//     handleSubmit.mockClear()
//     render(<MovieForm handleSubmit={handleSubmit}/>)
//
//     const id=screen.getByText(/movie id/i)
//     user.type(id,"1bb0fd997069d03e84923cd")
//     const book=screen.getByText(/number of tickets to book/i)
//     user.type(book,"3")
//     const button = screen.getByRole('button', {
//         name: /book/i
//     });
//     await waitFor(()=>{
//         // expect(handleSubmit).toHaveBeenCalledTimes(1)
//         expect(button).toBeInTheDocument()
//     })
// })