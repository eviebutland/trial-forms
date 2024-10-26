import { describe, it, expect, vi } from "vitest";
import Login from "./Login";
import {
  cleanup,
  fireEvent,
  getAllByTestId,
  getByTestId,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { act } from "react";

global.fetch = vi.fn();

describe("LoginForm", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render the form", () => {
    render(<Login />);
    // screen.debug(); // This is like wrapper.html()
    const email = screen.getByTestId("email");
    const name = screen.getByTestId("name");
    const phone = screen.getByTestId("phone");
    const numberOfPeople = screen.getByTestId("numberOfPeople");
    const dayOfBooking = screen.getByTestId("dayOfBooking");

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(numberOfPeople).toBeInTheDocument();
    expect(dayOfBooking).toBeInTheDocument();

    act(() => {
      fireEvent.change(email, { target: { value: "testing@email.com" } });
      fireEvent.change(phone, { target: { value: "01234567890" } });
      fireEvent.change(name, { target: { value: "Tester" } });
      fireEvent.change(numberOfPeople, { target: { value: 1 } });
      fireEvent.change(dayOfBooking, { target: { value: "2024-10-26T00:00" } });
    });

    expect(email.value).toBe("testing@email.com");
    expect(name.value).toBe("Tester");
    expect(phone.value).toBe("01234567890");
    expect(numberOfPeople.value).toBe("1");
    expect(dayOfBooking.value).toBe("2024-10-26T00:00");
  });

  it("should trigger validation on incorrect fields", async () => {
    render(<Login />);

    const email = screen.getByTestId("email");

    const phone = screen.getByTestId("phone");
    const numberOfPeople = screen.getByTestId("numberOfPeople");
    const dayOfBooking = screen.getByTestId("dayOfBooking");

    act(() => {
      fireEvent.change(email, { target: { value: "temail.com" } });
      fireEvent.change(phone, { target: { value: "012" } });
      fireEvent.change(numberOfPeople, { target: { value: 12 } });
      fireEvent.change(dayOfBooking, { target: { value: "2024-10-01T00:00" } });
    });

    expect(email.value).toBe("temail.com");
    expect(phone.value).toBe("012");
    expect(numberOfPeople.value).toBe("12");
    expect(dayOfBooking.value).toBe("2024-10-01T00:00");

    const submitBtn = screen.getByTestId("submitBtn");
    expect(submitBtn).toBeInTheDocument();
    fireEvent.click(submitBtn);

    // fetch.mockReturnValue({ status: 201 });
    // vi.fn().mockResolvedValue(createFetchResponse({}));

    await waitFor(() => {
      const errors = screen.getAllByTestId("validationError");
      expect(errors.at(0)).toHaveTextContent("Please enter more letters");
      expect(errors.at(1)).toHaveTextContent(
        "Please enter a valid phone number",
      );
      expect(errors.at(2)).toHaveTextContent("Invalid email");
      expect(errors.at(3)).toHaveTextContent("Date cannot be in the past");
    });
  });

  it.skip("should show a success message on API success", async () => {
    render(<Login />);

    const email = screen.getByTestId("email");
    const name = screen.getByTestId("name");
    const phone = screen.getByTestId("phone");
    const numberOfPeople = screen.getByTestId("numberOfPeople");
    const dayOfBooking = screen.getByTestId("dayOfBooking");

    act(() => {
      fireEvent.change(email, { target: { value: "testing@email.com" } });
      fireEvent.change(phone, { target: { value: "01234567890" } });
      fireEvent.change(name, { target: { value: "Tester" } });
      fireEvent.change(numberOfPeople, { target: { value: 1 } });
      fireEvent.change(dayOfBooking, { target: { value: "2024-10-27T00:00" } });
    });

    const submitBtn = screen.getByTestId("submitBtn");

    fireEvent.click(submitBtn);
    // vi.fn().mockResolvedValue(createFetchResponse({}));

    await waitFor(() => {
      const successMessage = screen.getByTestId("success-block");
    });
  });

  it("should show an error message on API fail", async () => {
    render(<Login />);

    const email = screen.getByTestId("email");
    const name = screen.getByTestId("name");
    const phone = screen.getByTestId("phone");
    const numberOfPeople = screen.getByTestId("numberOfPeople");
    const dayOfBooking = screen.getByTestId("dayOfBooking");

    act(() => {
      fireEvent.change(email, { target: { value: "testing@email.com" } });
      fireEvent.change(phone, { target: { value: "01234567890" } });
      fireEvent.change(name, { target: { value: "Tester" } });
      fireEvent.change(numberOfPeople, { target: { value: 1 } });
      fireEvent.change(dayOfBooking, { target: { value: "2024-10-27T00:00" } });
    });

    const submitBtn = screen.getByTestId("submitBtn");

    fireEvent.click(submitBtn);

    // vi.fn().mockResolvedValue(createFetchResponse({}));

    await waitFor(() => {
      const errors = screen.getAllByTestId("validationError");
      expect(errors.at(0)).toHaveTextContent(
        "Something went wrong, please come back again later",
      );
    });
  });
});
