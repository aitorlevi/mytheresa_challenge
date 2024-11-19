import { render, screen, act, waitFor } from "@testing-library/react";
import { useContext } from "react";
import { describe, it, expect, vi } from "vitest";
import AlertProvider, { AlertContext } from "../../src/contexts/AlertContext";

// Mock Component to test context
const MockComponent = () => {
  const { alert, showAlert, clearAlert } = useContext(AlertContext);

  return (
    <div>
      <p data-testid="alert-type">{alert.type}</p>
      <p data-testid="alert-message">{alert.message}</p>
      <button
        data-testid="show-alert-button"
        onClick={() => showAlert("success", "Test alert message")}
      >
        Show Alert
      </button>
      <button data-testid="clear-alert-button" onClick={clearAlert}>
        Clear Alert
      </button>
    </div>
  );
};

describe("AlertProvider", () => {
  it("provides default alert values", () => {
    render(
      <AlertProvider>
        <MockComponent />
      </AlertProvider>
    );

    //Expect nothing by alert
    expect(screen.getByTestId("alert-type").textContent).toBe("");
    expect(screen.getByTestId("alert-message").textContent).toBe("");
  });

  it("check functionality works", () => {
    render(
      <AlertProvider>
        <MockComponent />
      </AlertProvider>
    );

    const showAlertButton = screen.getByTestId("show-alert-button");
    const clearAlertButton = screen.getByTestId("clear-alert-button");

    act(() => {
      showAlertButton.click();
    });

    waitFor(() => {
      // Expect success message
      expect(screen.getByTestId("alert-type").textContent).toBe("success");
      expect(screen.getByTestId("alert-message").textContent).toBe(
        "Test alert message"
      );
    });

    act(() => {
      clearAlertButton.click();
    });

    waitFor(() => {
      // Expect hide message
      expect(screen.getByTestId("alert-type").textContent).toBe("");
      expect(screen.getByTestId("alert-message").textContent).toBe("");
    });
  });
});
