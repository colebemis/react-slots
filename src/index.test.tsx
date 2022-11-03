import { expect, it } from "@jest/globals";
import { render } from "@testing-library/react";
import * as React from "react";
import { useSlots } from ".";

function Layout({ children }: { children?: React.ReactNode }) {
  const [slots, rest] = useSlots(children, {
    header: Header,
    footer: Footer,
  });

  return (
    <div>
      {slots.header
        ? // Pass props to slot with cloneElement()
          React.cloneElement(slots.header, { padding: "large" })
        : null}
      <main>{rest}</main>
      {slots.footer}
    </div>
  );
}

const paddingMap = {
  none: 0,
  small: 4,
  medium: 8,
  large: 16,
};

function Header({ padding = "none" }: { padding?: keyof typeof paddingMap }) {
  return <header style={{ padding: paddingMap[padding] }}>Header</header>;
}

function Footer({ padding = "none" }: { padding?: keyof typeof paddingMap }) {
  return <footer style={{ padding: paddingMap[padding] }}>Footer</footer>;
}

function App() {
  return (
    <Layout>
      <Footer padding="small" />
      <h1>Hello, slots!</h1>
      <Header />
    </Layout>
  );
}

it("works as expected", () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});
