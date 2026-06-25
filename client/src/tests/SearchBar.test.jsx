import { render, screen } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar", () => {
  test("renders search input", () => {
    render(
      <SearchBar
        searchTerm=""
        setSearchTerm={() => {}}
        onAddUser={() => {}}
        onFilter={() => {}}
        sortBy=""
        setSortBy={() => {}}
      />,
    );

    expect(screen.getByPlaceholderText(/Search users/i)).toBeInTheDocument();
  });
});
