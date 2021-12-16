import MovieService from "./Services/MovieService";
import axios from "axios";
import {cleanup} from "@testing-library/react";

jest.mock('axios');
afterAll(() => {
    cleanup()
})

describe('get movies service', () => {
    it('should return all movies', async () => {
        const data = {
            _id: "61b82ba297069d03e8491e1d",
            name: "Avengers",
            total: "80",
            booked: "0"
        };
        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(MovieService.list()).resolves.toEqual(data);
        expect(axios.get).toHaveBeenCalledTimes(1);
    })
})

describe('update movies service', () => {
    it('should update all movies', async () => {
        const requestData = {
            name: "Avengers",
            total: "80",
            booked: "0"
        };
        axios.put.mockImplementationOnce();
        await expect(MovieService.update(requestData, "61b82ba297069d03e8491e1d")).resolves.toEqual(undefined)

        expect(axios.put).toHaveBeenCalledTimes(1);
    })
})