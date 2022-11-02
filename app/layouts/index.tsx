import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }) {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="container mx-auto flex flex-grow justify-center">
        {children}
      </main>
      <Footer />
    </>
  );
}
