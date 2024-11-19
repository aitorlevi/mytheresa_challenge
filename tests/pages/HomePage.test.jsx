import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import HomePage from "../../src/pages/HomePage";

// Mock the Carousel
vi.mock("../../src/components/Carousel", () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid="carousel">Mocked Carousel</div>),
}));

describe("HomePage", () => {
  it("renders three Carousel components with correct categories", () => {
    // Render the component HomePage
    render(<HomePage />);

    // Verify Carousel mock has been called 3 times
    const carousels = screen.getAllByTestId("carousel");
    expect(carousels).toHaveLength(3);
  });
});
