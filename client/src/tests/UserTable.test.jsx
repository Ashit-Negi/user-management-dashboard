import { render, screen } from "@testing-library/react";
import UserTable from "../components/UserTable";

describe("UserTable", () => {
  test("shows no users message", () => {
    render(<UserTable users={[]} onEdit={() => {}} onDelete={() => {}} />);

    expect(screen.getByText(/No users found/i)).toBeInTheDocument();
  });

  test("renders user data", () => {
    const users = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@test.com",
        department: "IT",
      },
    ];

    render(<UserTable users={users} onEdit={() => {}} onDelete={() => {}} />);

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("john@test.com")).toBeInTheDocument();
    expect(screen.getByText("IT")).toBeInTheDocument();
  });
});
