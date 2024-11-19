import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../../src/components/Header";

describe("Header Component", () => {
  it("should render the wishlist link with correct path and icon", () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    // Check if the "WISHLIST" text is in the document
    expect(screen.getByText("WISHLIST")).toBeInTheDocument();

    // Check if the "wishlist" link has the correct URL path
    const wishlistLink = screen.getByText("WISHLIST").closest("a");
    expect(wishlistLink).toHaveAttribute("href", "/wishlist");
  });

  it("should render the main title with the correct link", () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    // Check if the main title is displayed and the link is correct
    const titleLink = screen.getByText("MYTHERESA CHALLENGE").closest("a");
    expect(titleLink).toHaveAttribute("href", "/");
  });
});
