import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import ProductBoard from "./ProductBoard.jsx";

const sample = [
  { id: 1, name: "Desk Lamp", category: "Home", price: 39.5 },
  { id: 2, name: "Notebook", category: "Stationery", price: 6.25 },
  { id: 3, name: "Mechanical Keyboard", category: "Electronics", price: 129.99 },
  { id: 4, name: "USB-C Hub", category: "Electronics", price: 49.0 },
];

describe("ProductBoard", () => {
  it("filters by search query (case-insensitive)", async () => {
    const user = userEvent.setup();
    render(<ProductBoard products={sample} />);

    await user.type(screen.getByLabelText("Search"), "usb");

    expect(screen.getByText(/USB-C Hub/)).toBeInTheDocument();
    expect(screen.queryByText(/Desk Lamp/)).not.toBeInTheDocument();
  });

  it("filters by category", async () => {
    const user = userEvent.setup();
    render(<ProductBoard products={sample} />);

    await user.selectOptions(screen.getByLabelText("Category"), "Home");

    expect(screen.getByText(/Desk Lamp/)).toBeInTheDocument();
    expect(screen.queryByText(/Notebook/)).not.toBeInTheDocument();
  });

  it("sorts by price descending", async () => {
    const user = userEvent.setup();
    render(<ProductBoard products={sample} />);

    await user.selectOptions(screen.getByLabelText("Sort"), "price-desc");

    const items = screen.getAllByRole("listitem").map((li) => li.textContent);
    expect(items[0]).toMatch(/Mechanical Keyboard/);
    expect(items[items.length - 1]).toMatch(/Notebook/);
  });

  it("formats prices and shows empty state", async () => {
    const user = userEvent.setup();
    render(<ProductBoard products={sample} />);

    expect(screen.getByText(/\$129\.99/)).toBeInTheDocument();
    expect(screen.getByText(/\$39\.50/)).toBeInTheDocument();

    await user.type(screen.getByLabelText("Search"), "zzzz");
    expect(screen.getByText("No products found")).toBeInTheDocument();
  });

  it("combines search and category", async () => {
    const user = userEvent.setup();
    render(<ProductBoard products={sample} />);

    await user.selectOptions(screen.getByLabelText("Category"), "Electronics");
    await user.type(screen.getByLabelText("Search"), "key");

    expect(screen.getByText(/Mechanical Keyboard/)).toBeInTheDocument();
    expect(screen.queryByText(/USB-C Hub/)).not.toBeInTheDocument();
  });
});
