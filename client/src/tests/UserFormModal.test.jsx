import { render, screen } from "@testing-library/react";
import UserFormModal from "../components/UserFormModal";

describe("UserFormModal", () => {
  test("renders modal when open", () => {
    render(
      <UserFormModal
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
        initialData={null}
        title="Add User"
      />,
    );

    expect(screen.getByText("Add User")).toBeInTheDocument();
  });
});
