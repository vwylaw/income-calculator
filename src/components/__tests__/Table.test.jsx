import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AppContext from "../GlobalContext.jsx";
import Table from "../Table.jsx";

describe("Table component", () => {
  it("should render all table headers and frequency rows", () => {
    render(
      <AppContext>
        <Table />
      </AppContext>
    );

    expect(screen.getByText("After-tax income")).toBeInTheDocument();
    expect(screen.getByText("Income Tax")).toBeInTheDocument();
    expect(screen.getByText("Base")).toBeInTheDocument();
    expect(screen.getByText("Super")).toBeInTheDocument();
    expect(screen.getByText("Package")).toBeInTheDocument();
    expect(screen.getByText("GST")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();

    expect(screen.getByText("Hour")).toBeInTheDocument();
    expect(screen.getByText("Day")).toBeInTheDocument();
    expect(screen.getByText("Week")).toBeInTheDocument();
    expect(screen.getByText("Fortnight")).toBeInTheDocument();
    expect(screen.getByText("Month")).toBeInTheDocument();
    expect(screen.getAllByText(/Year/i).length).toBeGreaterThanOrEqual(1);
  });

  it("should update table values when an hourly base income is entered", () => {
    const { container } = render(
      <AppContext>
        <Table />
      </AppContext>
    );

    const hourlyBaseInput = container.querySelector("#hourlyBaseIncome input");
    expect(hourlyBaseInput).toBeInTheDocument();

    // Enter 100 into hourly base
    fireEvent.change(hourlyBaseInput, { target: { value: "100" } });

    // Daily base should update to $800
    const dailyBaseInput = container.querySelector("#dailyBaseIncome input");
    expect(dailyBaseInput.value).toBe("$800");

    // Weekly base should update to $4,000
    const weeklyBaseInput = container.querySelector("#weeklyBaseIncome input");
    expect(weeklyBaseInput.value).toBe("$4,000");

    // Monthly base should update to $17,333
    const monthlyBaseInput = container.querySelector("#monthlyBaseIncome input");
    expect(monthlyBaseInput.value).toBe("$17,333");
  });

  it("should hide GST and Total columns when switched to Permanent employment", () => {
    const { container } = render(
      <AppContext>
        <Table />
      </AppContext>
    );

    const employmentSelect = screen.getByLabelText(/type of employment/i);
    expect(container.querySelector("#hourlyGST")).toBeInTheDocument();
    expect(container.querySelector("#hourlyTotal")).toBeInTheDocument();

    // Switch to Permanent
    fireEvent.change(employmentSelect, { target: { value: "Permanent, ongoing, full-time" } });

    expect(container.querySelector("#hourlyGST")).not.toBeInTheDocument();
    expect(container.querySelector("#hourlyTotal")).not.toBeInTheDocument();
  });
});
