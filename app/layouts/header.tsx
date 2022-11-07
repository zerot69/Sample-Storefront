import { BiShoppingBag } from "react-icons/bi";
import { Link, NavLink } from "@remix-run/react";

export default function Header() {
  const links = [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "Products",
      url: "/products",
    },
    {
      label: "Categories",
      url: "/category",
    },
    {
      label: "About",
      url: "/about",
    },
  ];
  return (
    <nav className="fixed top-0 left-0 z-20 flex w-full items-center justify-between border-b border-gray-200 px-8 pt-2 shadow-md dark:border-gray-600">
      {/* Site Logo */}
      <div className="font-mono text-3xl font-extrabold uppercase">
        <Link to="/">
          <img className="w-10" src="/eco-logo.png" alt="Eco" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="m-auto hidden space-x-6 sm:flex">
        {links.map((link, index) => (
          <NavLink key={index} to={link.url} className="navlink">
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Shopping Cart Indicator/Checkout Link */}
      <div className="font-semibold text-gray-600 hover:text-gray-50">
        <NavLink
          to="/checkout"
          className="inline-flex items-center space-x-1 transition-colors duration-300"
        >
          <BiShoppingBag className="text-xl" /> <span>0</span>
        </NavLink>
      </div>
    </nav>
  );
}
