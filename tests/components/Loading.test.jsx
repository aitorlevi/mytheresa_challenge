import { render, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Loading from "../../src/components/Loading";
import useLoading from "../../src/hooks/useLoading";

// Mock de useLoading
vi.mock("../../src/hooks/useLoading");

describe("Loading Component", () => {
  it("should show the spinner when isLoading is true", () => {
    // Mock the status of isLoading as true
    useLoading.mockReturnValue({ isLoading: true });

    render(<Loading />);

    // Verify the spinner is displayed
    const overlay = document.querySelector(".overlay");
    const overlayFadeIn = document.querySelector(".fade-in");
    const spinner = document.querySelector(".spinner");
    expect(overlay).toBeInTheDocument();
    expect(overlayFadeIn).toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
  });
  it("should hide the loading after 0.2 seconds", async () => {
    // Mock the status of isLoading as false
    useLoading.mockReturnValue({ isLoading: false });

    render(<Loading />);

    // Wait for the loading to disappear after 0.2 seconds
    await waitFor(
      () => {
        // Verify the spinner is not displayed
        const overlay = document.querySelector(".overlay");
        const spinner = document.querySelector(".spinner");
        const overlayFadeOut = document.querySelector(".fade-out");
        expect(overlay).not.toBeInTheDocument();
        expect(overlayFadeOut).not.toBeInTheDocument();
        expect(spinner).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
});
