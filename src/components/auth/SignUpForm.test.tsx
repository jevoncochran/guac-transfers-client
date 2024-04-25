import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SignUpForm from "./SignUpForm";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

test("Renders the sign up form", () => {
  render(
    <Provider store={store}>
      <SignUpForm />
    </Provider>
  );
  expect(true).toBeTruthy();
});
