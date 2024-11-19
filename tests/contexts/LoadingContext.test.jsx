import { render, screen, waitFor, act } from "@testing-library/react";
import { useContext } from "react";
import { describe, it, expect } from "vitest";
import LoadingProvider, {
  LoadingContext,
} from "../../src/contexts/LoadingContext";

// Mock Component to test context
const MockComponent = () => {
  const { isLoading, showLoading, hideLoading } = useContext(LoadingContext);

  return (
    <div>
      <p data-testid="loading-state">{isLoading ? "Loading" : "Not Loading"}</p>
      <button data-testid="show-loading-button" onClick={showLoading}>
        Show Loading
      </button>
      <button data-testid="hide-loading-button" onClick={hideLoading}>
        Hide Loading
      </button>
    </div>
  );
};

describe("LoadingProvider", () => {
  it("provides default loading value", () => {
    render(
      <LoadingProvider>
        <MockComponent />
      </LoadingProvider>
    );

    // Expect not loading when is called because loading is false
    expect(screen.getByTestId("loading-state").textContent).toBe("Not Loading");
  });

  it("set isLoading to true when showLoading is called", () => {
    render(
      <LoadingProvider>
        <MockComponent />
      </LoadingProvider>
    );

    const showLoadingButton = screen.getByTestId("show-loading-button");

    act(() => {
      showLoadingButton.click();
    });

    // Expect loading when is called because loading is sett to true clicking the mock button
    waitFor(() => {
      expect(screen.getByTestId("loading-state").textContent).toBe("Loading");
    });
  });

  it("check functionality works", () => {
    render(
      <LoadingProvider>
        <MockComponent />
      </LoadingProvider>
    );

    const showLoadingButton = screen.getByTestId("show-loading-button");
    const hideLoadingButton = screen.getByTestId("hide-loading-button");

    act(() => {
      showLoadingButton.click();
    });

    // Expect loading when is called because loading is set to true clicking the mock button
    waitFor(() => {
      expect(screen.getByTestId("loading-state").textContent).toBe("Loading");
    });

    act(() => {
      hideLoadingButton.click();
    });

    // Expect hide loading when is called because loading is set to false clicking the mock hide button
    waitFor(() => {
      expect(screen.getByTestId("loading-state").textContent).toBe(
        "Not Loading"
      );
    });
  });
});
