import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DetailPage from "../../src/pages/DetailPage";
import useLoading from "../../src/hooks/useLoading";
import useAlert from "../../src/hooks/useAlert";

// Mock de los hooks personalizados y de fetch
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

// Mock de datos de película
const movieData = {
  id: 1,
  title: "Movie Title",
  tagline: "Movie Tagline",
  overview: "Movie Overview",
  poster_path: "/poster.jpg",
  vote_average: 7,
  genres: [{ name: "Action" }, { name: "Adventure" }],
  release_date: "2024-12-12",
  production_companies: [{ name: "Production Company 1" }],
};

describe("DetailPage", () => {
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

  afterEach(() => {
    localStorage.clear();
  });

  it("should fetch movie data and display the movie details", async () => {
    // Mock de la respuesta de fetch
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(movieData),
    });

    render(
      <MemoryRouter initialEntries={["/details/1/popular"]}>
        <Routes>
          <Route path="/details/:id/:category" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Esperar a que se cargue la película
    await waitFor(() => screen.getByText(movieData.title));

    // Verificar que los detalles de la película se muestran
    expect(screen.getByText(movieData.title)).toBeInTheDocument();
    expect(screen.getByText(movieData.tagline)).toBeInTheDocument();
    expect(screen.getByText(movieData.overview)).toBeInTheDocument();
  });

  describe("FETCH ERROR", () => {
    it("should show an error message by response", async () => {
      // Simulate an error in the fetch call
      global.fetch = vi.fn().mockReturnValue({
        ok: false,
        status: 400,
        statusText: "Failed to fetch",
      });

      render(
        <MemoryRouter initialEntries={["/details/1/popular"]}>
          <Routes>
            <Route path="/details/:id/:category" element={<DetailPage />} />
          </Routes>
        </MemoryRouter>
      );

      // Verify that the movie is not displayed, but the error message is displayed
      await waitFor(() => {
        expect(screen.queryByText("Movie Title")).not.toBeInTheDocument();
        expect(mockShowAlert).toHaveBeenCalled();
      });
    });
    it("should show the common error message", async () => {
      global.fetch = vi.fn().mockReturnValue({
        ok: false,
        status: 400,
        statusText: undefined,
      });

      render(
        <MemoryRouter initialEntries={["/details/1/popular"]}>
          <Routes>
            <Route path="/details/:id/:category" element={<DetailPage />} />
          </Routes>
        </MemoryRouter>
      );

      // Verify that the movie is not displayed, but the error message is displayed
      await waitFor(() => {
        expect(screen.queryByText("Movie Title")).not.toBeInTheDocument();
        expect(mockShowAlert).toHaveBeenCalled();
      });
    });
  });

  it("should add the movie to wishlist when clicking the button", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(movieData),
    });
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    render(
      <MemoryRouter initialEntries={["/details/1/popular"]}>
        <Routes>
          <Route path="/details/:id/:category" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(movieData.title));

    act(() => {
      const button = document.querySelector(".cta");
      fireEvent.click(button);
    });

    // Verify that setItem has been called to add the movie
    expect(setItemSpy).toHaveBeenCalled();
    expect(mockShowAlert).toHaveBeenCalled();
  });

  it("should show an alert when the movie is already in the wishlist", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(movieData),
    });

    render(
      <MemoryRouter initialEntries={["/details/1/popular"]}>
        <Routes>
          <Route path="/details/:id/:category" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(movieData.title));

    // Mock localStorage to already have the movie
    global.localStorage.setItem("wishlist", JSON.stringify([movieData]));

    // Simulate the click on the "Add to Wishlist" button
    act(() => {
      const button = document.querySelector(".cta");
      fireEvent.click(button);
    });

    // Check that an alert has been displayed that the movie is already in the list
    expect(useAlert().showAlert).toHaveBeenCalledWith(
      "warning",
      `${movieData.title} is already added in the wishlist!`
    );
  });

  describe("should change the section classname by category", async () => {
    it("category = POPULAR", async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(movieData),
      });

      render(
        <MemoryRouter initialEntries={["/details/1/popular"]}>
          <Routes>
            <Route path="/details/:id/:category" element={<DetailPage />} />
          </Routes>
        </MemoryRouter>
      );

      // Wait to movie info loads
      await waitFor(() => screen.getByText(movieData.title));

      const section = document.querySelector("section");
      expect(section.classList.contains("popular")).toBe(true);
    });

    it("category = UPCOMING", async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(movieData),
      });

      render(
        <MemoryRouter initialEntries={["/details/1/upcoming"]}>
          <Routes>
            <Route path="/details/:id/:category" element={<DetailPage />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => screen.getByText(movieData.title));

      const section = document.querySelector("section");
      expect(section.classList.contains("upcoming")).toBe(true);
    });

    it("category = TOP_RATED", async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(movieData),
      });

      render(
        <MemoryRouter initialEntries={["/details/1/top_rated"]}>
          <Routes>
            <Route path="/details/:id/:category" element={<DetailPage />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => screen.getByText(movieData.title));

      const section = document.querySelector("section");
      expect(section.classList.contains("top-rated")).toBe(true);
    });
  });
});
