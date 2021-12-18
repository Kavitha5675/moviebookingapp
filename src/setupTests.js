// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// import user from '@testing-library/user-event'
// import {configure, mount, render, shallow} from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
// configure({adapter: new Adapter()});
// it.skip("check if the book button is rendered",  async () => {
//     const handleSubmit = jest.fn()
//     render(<button onClick={handleSubmit}>Book</button>)
//     const {getByTestId,container} = render(<MovieForm movieData={[datum]} handleSubmit={handleSubmit}/>)
//     act(() => {
//         let idInput = getByTestId("_id");
//         fireEvent.change(idInput, {target: {value: "61b82ba297069d03e8491e1d"}})
//         fireEvent.blur(idInput)
//     })
//     expect(container.innerHTML).toMatch("")
//
//     act(() => {
//         let bookInput = getByTestId("book");
//         fireEvent.change(bookInput, {target: {value: "3"}})
//         fireEvent.blur(bookInput)
//     })
//     expect(container.innerHTML).toMatch("")
//
//     await act(async ()=>{
//         let bookButton=getByTestId("button");
//         fireEvent.click(bookButton)
//     })
//     expect(handleSubmit).toHaveBeenCalledTimes(1)
// })
//
// it("check if the movie id validation is rendered", async () => {
//     const {getByTestId, container} = render(<MovieForm movieData={[]}/>)
//     await act(async () => {
//         let idInput = getByTestId("_id");
//         fireEvent.change(idInput, {target: {value: "123456456"}})
//         fireEvent.blur(idInput)
//     })
//
//     expect(container.innerHTML).toMatch("Enter a valid id")
// })
//
// it("check if the movie booking tickets  validation is rendered", async () => {
//     const {getByTestId, container} = render(<MovieForm movieData={[datum]}/>)
//     act(() => {
//         let idInput = getByTestId("_id");
//         fireEvent.change(idInput, {target: {value: "61b82ba297069d03e8491e1d"}})
//         fireEvent.blur(idInput)
//     })
//     expect(container.innerHTML).toMatch("")
//
//     act(() => {
//         let bookInput = getByTestId("book");
//         fireEvent.change(bookInput, {target: {value: "345"}})
//         fireEvent.blur(bookInput)
//     })
//     expect(container.innerHTML).toMatch("Booking with 61b82ba297069d03e8491e1d cannot be done")
// })
// it("check if the success movie booking validation is rendered", async () => {
//     const handleSubmit=jest.fn()
//     const {container} = render(<MovieForm movieData={[datum]} handleSubmit={handleSubmit}/>)
//     act(() => {
//         let idInput = screen.getByTestId("_id");
//         fireEvent.change(idInput, {target: {value: "61b82ba297069d03e8491e1d"}})
//         fireEvent.blur(idInput)
//     })
//     expect(container.innerHTML).toMatch("")
//
//     act(() => {
//         let bookInput = screen.getByTestId("book");
//         fireEvent.change(bookInput, {target: {value: "3"}})
//         fireEvent.blur(bookInput)
//     })
//     expect(container.innerHTML).toMatch("")
//
//     await act(async ()=>{
//         let bookButton=screen.getByRole("button");
//         fireEvent.click(bookButton)
//     })
//         await expect(container.innerHTML).toMatch("movie 61b82ba297069d03e8491e1d booked")
// })