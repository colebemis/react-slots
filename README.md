# react-slots

## Install

```shell
npm install @colebemis/react-slots
```

## Usage

```jsx
import { useSlots } from "@colebemis/react-slots";

function Layout({ children }: { children?: React.ReactNode }) {
  const [slots, rest] = useSlots(children, {
    header: Header,
    footer: Footer,
  });

  return (
    <div>
      {slots.header}
      <main>{rest}</main>
      {slots.footer}
    </div>
  );
}

function Header() {
  return <header>Header</header>;
}

function Footer() {
  return <footer>Footer</footer>;
}

function App() {
  return (
    <Layout>
      <Header />
      <h1>Hello, slots!</h1>
      <Footer />
    </Layout>
  );
}
```
