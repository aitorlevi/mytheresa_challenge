import { render, screen, waitFor } from "@testing-library/react";
import { describe, vi } from "vitest";
import Carousel from "../../src/components/Carousel";
import { MemoryRouter } from "react-router-dom";
import useAlert from "../../src/hooks/useAlert";
import useLoading from "../../src/hooks/useLoading";

// Mocking useAlert and useLoading hooks
vi.mock("../../src/hooks/useAlert", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    showAlert: vi.fn(),
  })),
}));

vi.mock("../../src/hooks/useLoading", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    showLoading: vi.fn(),
    hideLoading: vi.fn(),
  })),
}));

describe("Carousel Component", () => {
  const mockShowAlert = vi.fn();
  const mockShowLoading = vi.fn();
  const mockHideLoading = vi.fn();

  beforeEach(() => {
    useAlert.mockReturnValue({ showAlert: mockShowAlert });
    useLoading.mockReturnValue({
      showLoading: mockShowLoading,
      hideLoading: mockHideLoading,
    });
  });

  it("should render the category title", async () => {
    render(
      <MemoryRouter>
        <Carousel category="popular" />
      </MemoryRouter>
    );

    // Verify that the category title is rendered in uppercase
    await waitFor(() => screen.getByText("POPULAR"));
    expect(screen.getByText("POPULAR")).toBeInTheDocument();
  });
  describe("CALL FETCH", () => {
    it("should call the correct URL with fetch", async () => {
      const mockMovies = [
        { id: 1, title: "Movie 1", backdrop_path: "/path1.jpg" },
        { id: 2, title: "Movie 2", backdrop_path: "/path2.jpg" },
      ];

      // Mock fetch to resolve with a mock movie list
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValueOnce({ results: mockMovies }),
      });

      // Render the component
      render(
        <MemoryRouter>
          <Carousel category="popular" />
        </MemoryRouter>
      );

      await waitFor(() => global.fetch);

      // Check that fetch was called with the correct URL
      const expectedUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`;
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
    });

    it("should not render anything when there are no movies", () => {
      // Mock fetch response for empty movie list
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValueOnce({ results: [] }),
      });

      const { container } = render(
        <MemoryRouter>
          <Carousel category="popular" />
        </MemoryRouter>
      );

      // The component should return null (nothing rendered)
      expect(container.firstChild).toBeNull();
    });

    it("should thrown a new error when response.ok is not true", async () => {
      // Mock a failed fetch request
      global.fetch = vi.fn().mockReturnValue({
        ok: false,
        status: 400,
        statusText: "Error statusText",
      });

      render(
        <MemoryRouter>
          <Carousel category="popular" />
        </MemoryRouter>
      );

      // Wait for the alert function to be called with the error message
      await waitFor(() =>
        expect(mockShowAlert).toHaveBeenCalledWith(
          "error",
          "Error 400: Error statusText"
        )
      );
    });
  });

  it("should display loading spinner when fetching data", async () => {
    // Mock the fetch call and delay it to simulate loading
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({ results: [] }),
    });

    render(
      <MemoryRouter>
        <Carousel category="popular" />
      </MemoryRouter>
    );

    // Check that showLoading was called
    expect(mockShowLoading).toHaveBeenCalled();

    // Wait until the fetch resolves and hideLoading is called
    await waitFor(() => expect(mockHideLoading).toHaveBeenCalled());
  });
});
