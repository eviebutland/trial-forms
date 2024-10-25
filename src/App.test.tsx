import { describe, it, expect, vi } from "vitest";
import { Nav } from "./App";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Movies", () => {
  /**... */
  it("should render the the list of movies", () => {
    /**... */
    const { getByTestId } = render(<Nav />);
    screen.debug(); // This is like wrapper.html()
    expect(getByTestId("movies-list").children.length).toBe([]);
  });
});
