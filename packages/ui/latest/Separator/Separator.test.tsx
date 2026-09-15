import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Separator from "./Separator";


function setup() {
  const user = userEvent.setup();
  const scope = {
    user,
    props: {},
    mocks: [],
    result: undefined,
    run: undefined,
  };

  scope.run = (options = {}) => {
    scope.result = render(<div>Bla<Separator role="separator" {...scope.props} /></div>, options);

    return scope.result;
  };

  return scope;
}

function teardown() {
  cleanup();
}

test("shared/ui/Separator", async() => {
  const scope = setup();
  scope.run();
  await screen.findByText("Bla");

  expect(screen.getByText("Bla")).toHaveTextContent("Bla");

  teardown();
});
