import React from 'react';
import MovieForm from "./Dashboard/MovieForm";
import {fireEvent, render, screen} from '@testing-library/react'

const datum = {
    _id: "61b82ba297069d03e8491e1d",
    name: "Avengers",
    total: "50",
    booked: "0"
};

describe("movie form describe statement", () => {
    it('checks if title booking dashboard and movie input fields are rendered', () => {
        render(<MovieForm/>)

        expect(screen.getByText("Booking Dashboard")).toBeInTheDocument()
        expect(screen.getByTestId("_id")).toBeInTheDocument()
        expect(screen.getByTestId("book")).toBeInTheDocument()
    })

    it('movie form should be in the document', () => {
        const component = render(<MovieForm/>)

        const idLabelNode = component.getByLabelText("Movie Id")
        const bookLabelNode = component.getByLabelText("Number of tickets to book")

        expect(idLabelNode).toBeInTheDocument()
        expect(bookLabelNode).toBeInTheDocument()
    })

    it("id field should have label", () => {
        const component = render(<MovieForm/>)

        const idInputNode = component.getByLabelText("Movie Id")
        const bookInputNode = component.getByLabelText("Number of tickets to book")

        expect(idInputNode.getAttribute("name")).toBe("movie-id")
        expect(bookInputNode.getAttribute("name")).toBe("booked")
    })

    it("id input should accept valid id", () => {
        const {getByLabelText, getByText} = render(<MovieForm movieData={[datum]}/>)

        const idInputNode = getByLabelText("Movie Id")
        fireEvent.change(idInputNode, {target: {value: "12361b82ba297069d03e8491e1d"}})
        fireEvent.blur(idInputNode)

        const errorMessage = getByText("Enter a valid id");
        expect(errorMessage).toBeInTheDocument()
    })

    it("number of tickets book input should accept valid number of tickets", () => {
        const {getByLabelText, getByText} = render(<MovieForm movieData={[datum]}/>)

        const idInputNode = getByLabelText("Movie Id")
        fireEvent.change(idInputNode, {target: {value: "61b82ba297069d03e8491e1d"}})
        fireEvent.blur(idInputNode)
        const bookInputNode = getByLabelText("Number of tickets to book")
        fireEvent.change(bookInputNode, {target: {value: "60"}})
        fireEvent.blur(bookInputNode)

        const errorMessage = getByText("Booking with 61b82ba297069d03e8491e1d cannot be done");
        expect(errorMessage).toBeInTheDocument()
    })

    it("should be able to submit form", () => {
        const mockFn = jest.fn()
        const {getByRole} = render(<MovieForm movieData={[datum]} onSubmit={mockFn}/>)

        const buttonNode = getByRole("button")
        fireEvent.submit(buttonNode)

        expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it("should able to submit form with successful booked message", () => {
        const mockFn = jest.fn()
        const {getByLabelText, getByText, getByRole} = render(<MovieForm movieData={[datum]} onSubmit={mockFn}/>)

        const idInputNode = getByLabelText("Movie Id")
        fireEvent.change(idInputNode, {target: {value: "61b82ba297069d03e8491e1d"}})
        fireEvent.blur(idInputNode)
        const bookInputNode = getByLabelText("Number of tickets to book")
        fireEvent.change(bookInputNode, {target: {value: "30"}})
        fireEvent.blur(bookInputNode)
        const buttonNode = getByRole("button")
        fireEvent.submit(buttonNode)

        expect(mockFn).toHaveBeenCalledTimes(1)
        const successMessage = getByText("movie 61b82ba297069d03e8491e1d booked");
        expect(successMessage).toBeInTheDocument()
    })
})
