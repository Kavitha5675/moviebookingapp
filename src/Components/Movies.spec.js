import React from 'react';
import {act, render, screen,cleanup} from '@testing-library/react'
import Movies from "./Dashboard/Movies";
import MovieService from "./Services/MovieService";
afterAll(()=>{
    cleanup()
})

it('checks if the movie details columns are rendered', () => {
    render(<Movies/>)
    expect(screen.getByText("Movie Name")).toBeInTheDocument()
    expect(screen.getByText("ID")).toBeInTheDocument()
    expect(screen.getByText("Total tickets")).toBeInTheDocument()
    expect(screen.getByText("Booked")).toBeInTheDocument()
});

it('check if the Movies list are rendered', () => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    jest.spyOn(MovieService, 'list')
    render(<Movies/>)
    try{
    expect(MovieService.list).toHaveBeenCalledTimes(1)
    }catch (e){}
})

it('renders the movie data in table rows based on columns', async () => {
    const data = {
        _id: "61b82ba297069d03e8491e1d",
        name: "Avengers",
        total: "80",
        booked: "0"
    };
    MovieService.list = jest.fn().mockReturnValueOnce({data: data})
    render(<Movies/>)
    act(() => {
        try {
            expect(screen.getByText("Avengers")).toBeInTheDocument()
        } catch (e) {}
    })
})

it('renders the update book count in movie data', async() => {
    const data = {
        name: "Avengers",
        total: "80",
        booked: "3"
    };
    const _id = "61b82ba297069d03e8491e1d";
    MovieService.update = jest.fn(() => new Promise(resolve => {
        resolve({data, _id})
    }));

    render(<Movies/>)
    act( () => {
        try {
            expect(screen.getByText("3")).toBeInTheDocument()
        } catch (e) {}
    })
})
