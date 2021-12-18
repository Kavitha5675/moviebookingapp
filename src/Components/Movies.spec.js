import React from 'react';
import {cleanup, render, screen} from '@testing-library/react'
import Movies from "./Dashboard/Movies";
import MovieService from "./Services/MovieService";

afterAll(() => {
    cleanup()
})

it('checks if the movie details columns are rendered', () => {
    render(<Movies/>)
    expect(screen.getByText("Movie Name")).toBeInTheDocument()
    expect(screen.getByText("ID")).toBeInTheDocument()
    expect(screen.getByText("Total tickets")).toBeInTheDocument()
    expect(screen.getByText("Booked")).toBeInTheDocument()
});

it('check if the empty Movies list is rendered', () => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    jest.spyOn(MovieService, 'list')
    render(<Movies/>)
    expect(MovieService.list).toHaveBeenCalledTimes(1)
})

