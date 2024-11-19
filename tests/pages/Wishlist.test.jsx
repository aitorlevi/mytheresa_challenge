import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi } from "vitest";
import WishlistPage from "../../src/pages/WishlistPage";
import { MemoryRouter } from "react-router-dom";
import useLoading from "../../src/hooks/useLoading";
import useAlert from "../../src/hooks/useAlert";

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

describe("WishlistPage", () => {
  const mockShowAlert = vi.fn();
  const mockShowLoading = vi.fn();
  const mockHideLoading = vi.fn();
  beforeEach(() => {
    // localStorage mock
    vi.spyOn(Storage.prototype, "getItem");
    vi.spyOn(Storage.prototype, "setItem");
    vi.spyOn(Storage.prototype, "clear");
    useAlert.mockReturnValue({ showAlert: mockShowAlert });
    useLoading.mockReturnValue({
      showLoading: mockShowLoading,
      hideLoading: mockHideLoading,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("renders wishlist items when localStorage has data", () => {
    const mockWishlist = [
      {
        id: 1,
        title: "Movie 1",
        poster_path: "/movie1.jpg",
      },
    ];
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockWishlist));

    render(
      <MemoryRouter>
        <WishlistPage />
      </MemoryRouter>
    );

    // Verify mock movie is in the document and has the correct url
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 1").closest("a")).toHaveAttribute(
      "href",
      "/details/1"
    );

    expect(screen.getByText("CLEAR WISHLIST")).toBeInTheDocument();
  });

  it("shows message when wishlist is empty", () => {
    localStorage.getItem.mockReturnValueOnce(null);

    render(
      <MemoryRouter>
        <WishlistPage />
      </MemoryRouter>
    );

    // Verify render is without items
    expect(screen.getByText("There are no items yet!")).toBeInTheDocument();
    expect(screen.queryByText("CLEAR WISHLIST")).not.toBeInTheDocument();
  });

  it("clears the wishlist when 'CLEAR WISHLIST' button is clicked", () => {
    const mockWishlist = [
      {
        id: 1,
        title: "Movie 1",
        poster_path: "/movie1.jpg",
      },
    ];
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockWishlist));

    render(
      <MemoryRouter>
        <WishlistPage />
      </MemoryRouter>
    );

    // Simulate click in add to wishlist button
    act(() => {
      const button = document.querySelector(".cta");
      fireEvent.click(button);
    });

    // Verify alert is displayed
    expect(useAlert().showAlert).toHaveBeenCalledWith(
      "success",
      `Wishlist cleared!`
    );

    // Verify that there are no more items in the wishlist
    expect(screen.getByText("There are no items yet!")).toBeInTheDocument();
  });
});
