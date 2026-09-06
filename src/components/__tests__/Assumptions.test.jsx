import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AppContext from "../GlobalContext.jsx";
import Assumptions from "../Assumptions.jsx";

describe("Assumptions component", () => {
  it("should render working hours and GST assumptions", () => {
    render(
      <AppContext>
        <Assumptions />
      </AppContext>
    );

    expect(screen.getByText(/52 weeks in a year/i)).toBeInTheDocument();
    expect(screen.getByText(/Country: Australia/i)).toBeInTheDocument();
    expect(screen.getByText(/GST: 10%/i)).toBeInTheDocument();
    expect(screen.getByText(/Super guarantee:/i)).toBeInTheDocument();
  });

  it("should display super rates for all configured financial years", () => {
    render(
      <AppContext>
        <Assumptions />
      </AppContext>
    );

    expect(screen.getByText(/- FY2324: 11%/i)).toBeInTheDocument();
    expect(screen.getByText(/- FY2425: 11.5%/i)).toBeInTheDocument();
    expect(screen.getByText(/- FY2526: 12%/i)).toBeInTheDocument();
    expect(screen.getByText(/- FY2627: 12%/i)).toBeInTheDocument();
    expect(screen.getByText(/- FY2728: 12%/i)).toBeInTheDocument();
  });
});
