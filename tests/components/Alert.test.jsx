import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import { vi } from "vitest";
import Alert from "../../src/components/Alert";
import useAlert from "../../src/hooks/useAlert";

const ALERT_MESSAGE = "Alert message",
  ALERT_TYPE = "error";

// Mocking the useAlert hook
vi.mock("../../src/hooks/useAlert");

describe("Alert Component", () => {
  const mockClearAlert = vi.fn();

  beforeEach(() => {
    // Mock the return value of useAlert
    useAlert.mockReturnValue({
      alert: { message: ALERT_MESSAGE, type: ALERT_TYPE },
      clearAlert: mockClearAlert,
    });
  });

  it("should render the alert message", () => {
    render(<Alert />);

    // Check if the alert message is displayed
    expect(screen.getByText(ALERT_MESSAGE)).toBeInTheDocument();
  });

  it("should render nothing if alert is null", () => {
    useAlert.mockReturnValue({
      alert: { message: "", type: "" },
      clearAlert: mockClearAlert,
    });
    const { container } = render(<Alert />);

    // The component should return null (nothing rendered)
    expect(container.firstChild).toBeNull();
  });

  it("should apply the correct class based on alert type", () => {
    render(<Alert />);

    // Check if the correct class based on alert type is applied
    const alert = screen.getByText(ALERT_MESSAGE).closest(".alert");
    expect(alert).toHaveClass(ALERT_TYPE);
  });

  it("should hide the alert after 3 seconds", async () => {
    render(<Alert />);

    // Initially, the alert should be visible
    expect(screen.getByText(ALERT_MESSAGE)).toBeInTheDocument();

    // Wait for the alert to disappear after 3 seconds
    await waitFor(
      () => {
        const alert = screen
          .getByText(ALERT_MESSAGE)
          .closest(".alert-container");
        expect(alert).not.toHaveClass("show");
      },
      { timeout: 4000 }
    );
  });

  it("should call clearAlert when close button is clicked", () => {
    render(<Alert />);

    // Find the close button and click it
    act(() => {
      const closeButton = document.querySelector(".close-button");
      fireEvent.click(closeButton);
    });

    // Check if the clearAlert function was called
    expect(mockClearAlert).toHaveBeenCalled();
  });
});
