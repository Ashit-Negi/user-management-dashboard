import { render, screen } from "@testing-library/react";
import Pagination from "../components/Pagination";

describe("Pagination", () => {
  test("renders rows per page dropdown", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        rowsPerPage={10}
        setRowsPerPage={() => {}}
        setCurrentPage={() => {}}
      />,
    );

    expect(screen.getByText(/Rows per page/i)).toBeInTheDocument();

    expect(screen.getByDisplayValue("10")).toBeInTheDocument();
  });
});
