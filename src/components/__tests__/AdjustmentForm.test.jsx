import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AppContext from "../GlobalContext.jsx";
import AdjustmentForm from "../AdjustmentForm.jsx";

describe("AdjustmentForm component", () => {
  it("should render employment type, financial year dropdown, and super rate", () => {
    render(
      <AppContext>
        <AdjustmentForm />
      </AppContext>
    );

    expect(screen.getByLabelText(/type of employment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/financial year/i)).toBeInTheDocument();
    expect(screen.getByText(/superannuation rate/i)).toBeInTheDocument();
  });

  it("should toggle number of days off field when switching employment type", () => {
    render(
      <AppContext>
        <AdjustmentForm />
      </AppContext>
    );

    const employmentSelect = screen.getByLabelText(/type of employment/i);
    expect(screen.getByLabelText(/number of days off/i)).toBeInTheDocument();

    // Switch to Permanent
    fireEvent.change(employmentSelect, { target: { value: "Permanent, ongoing, full-time" } });
    expect(screen.queryByLabelText(/number of days off/i)).not.toBeInTheDocument();

    // Switch back to Contract
    fireEvent.change(employmentSelect, { target: { value: "Contract" } });
    expect(screen.getByLabelText(/number of days off/i)).toBeInTheDocument();
  });

  it("should allow changing financial year", () => {
    render(
      <AppContext>
        <AdjustmentForm />
      </AppContext>
    );

    const fySelect = screen.getByLabelText(/financial year/i);
    fireEvent.change(fySelect, { target: { value: "FY2324" } });
    expect(fySelect.value).toBe("FY2324");
    expect(screen.getByText("11%")).toBeInTheDocument();
  });
});
