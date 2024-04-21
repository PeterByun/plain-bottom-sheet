import type { Meta, StoryObj } from "@storybook/react";
import {
  BottomSheet,
  createPlaceholderBottomSheet,
} from "plain-bottom-sheet-core";
import { useRef } from "react";
import { BottomSheetReact } from "../../src/BottomSheetReact";
import { ExampleForm } from "../../src/examples/ExampleForm";

import miles from "../../assets/images/miles.jpg";

const meta: Meta<typeof BottomSheetReact> = {
  argTypes: {},
  title: "BottomSheet",
};
export default meta;
type Story = StoryObj<typeof BottomSheetReact>;

export const Basic: Story = {
  render: function Render(args) {
    const bottomSheetRef = useRef<BottomSheet>(createPlaceholderBottomSheet());

    return (
      <section>
        <header>
          <button
            onClick={() => {
              bottomSheetRef.current.open();
            }}
          >
            Open
          </button>
          <button
            onClick={() => {
              bottomSheetRef.current.close();
            }}
          >
            Close
          </button>
        </header>
        <BottomSheetReact ref={bottomSheetRef}>
          {args.children}
        </BottomSheetReact>
      </section>
    );
  },
  name: "Basic",
  args: {
    children: "Hello",
  },
};

export const WithForm: Story = {
  render: function Render(args) {
    // Make this a custom hook and export from the React adapter.
    const bottomSheetRef = useRef<BottomSheet>(createPlaceholderBottomSheet());

    return (
      <section>
        <header>
          <button
            onClick={() => {
              bottomSheetRef.current.open();
            }}
          >
            Open
          </button>
          <button
            onClick={() => {
              bottomSheetRef.current?.close();
            }}
          >
            Close
          </button>
        </header>

        <BottomSheetReact ref={bottomSheetRef}>
          {args.children}
          <ExampleForm />
        </BottomSheetReact>
      </section>
    );
  },
  name: "WithForm",
  args: {
    children: "Args content: Edit here via args.children",
  },
};

export const WithImage: Story = {
  render: function Render(args) {
    const bottomSheetRef = useRef<BottomSheet>(createPlaceholderBottomSheet());

    return (
      <section>
        <header>
          <button
            onClick={() => {
              bottomSheetRef.current.open();
            }}
          >
            Open
          </button>
          <button
            onClick={() => {
              bottomSheetRef.current.close();
            }}
          >
            Close
          </button>
        </header>
        <BottomSheetReact ref={bottomSheetRef}>
          {args.children} <br />
          <img src={miles} alt="" />
        </BottomSheetReact>
      </section>
    );
  },
  name: "WithImage",
  args: {
    children: "Hello, Miles",
  },
};

export const WithTitleAndFixedButtons: Story = {
  render: function Render(args) {
    const bottomSheetRef = useRef<BottomSheet>(createPlaceholderBottomSheet());

    return (
      <section>
        <header>
          <button
            onClick={() => {
              bottomSheetRef.current.open();
            }}
          >
            Open
          </button>
          <button
            onClick={() => {
              bottomSheetRef.current.close();
            }}
          >
            Close
          </button>
        </header>
        <BottomSheetReact ref={bottomSheetRef}>
          <h3
            style={{
              padding: "0 16px",
            }}
          >
            Order Summary
          </h3>
          <ul>
            <li>{args.children}</li>
            <li>Coke zero🥤: $4</li>
          </ul>

          <div
            style={{
              position: "relative",
              bottom: 0,
              left: 0,

              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",

              width: "100%",
              padding: "0 20%",
              boxSizing: "border-box",
            }}
          >
            <button
              onClick={() => {
                bottomSheetRef.current.close();
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                bottomSheetRef.current.close();
              }}
            >
              Proceed To Checkout
            </button>
          </div>
        </BottomSheetReact>
      </section>
    );
  },
  name: "WithTitleAndFixedButtons",
  args: {
    children: "Fried chicken🍗: $19.5",
  },
};