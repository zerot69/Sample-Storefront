import { Suspense, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiShoppingBag } from "react-icons/bi";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Link, useLoaderData } from "@remix-run/react";
import { proxy, useSnapshot } from "valtio";

export const loader = async ({ params }: { params: any }) => {
  try {
    const product = await fetch(
      `https://635739669243cf412f94ec88.mockapi.io/Products/${params.productId}`
    );

    return product.json();
  } catch (error) {
    throw new Error("No product found!");
  }
};

// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.
const state = proxy({
	current: null,
	items: {
		laces: "#000000",
		mesh: "#ad3241",
		caps: "#000000",
		inner: "#000000",
		sole: "#000000",
		stripes: "#ad3241",
		band: "#000000",
		patch: "#ad3241",
	},
})

function Shoe() {
  const ref = useRef();
  const snap = useSnapshot(state);
  // Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
  // { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
  // nodes is a named collection of meshes, materials a named collection of materials
  const { nodes, materials } = useGLTF("shoe-draco.glb");

  // Animate model
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current!.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 60;
    ref.current!.rotation.x = Math.cos(t / 4) / 8;
    ref.current!.rotation.y = Math.sin(t / 4) / 8;
    ref.current!.position.y = (1 + Math.sin(t / 1.5)) / 10;
  });

  // Cursor showing current color
  const [hovered, set] = useState(null);
  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="white" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
    const auto =
      '<svg width="64" height="64" fill="white" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2' +
      '2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>';
    if (hovered) {
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(
        cursor
      )}'), auto`;
      return () =>
        (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(
          auto
        )}'), auto`);
    }
  }, [hovered]);

  // Using the GLTFJSX output here to wire in app-state and hook up events
  return (
    <group
      ref={ref}
      dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onClick={(e) => (
        e.stopPropagation(), (state.current = e.object.material.name)
      )}
    >
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe.geometry}
        material={materials.laces}
        material-color={snap.items.laces}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_1.geometry}
        material={materials.mesh}
        material-color={snap.items.mesh}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_2.geometry}
        material={materials.caps}
        material-color={snap.items.caps}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_3.geometry}
        material={materials.inner}
        material-color={snap.items.inner}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_4.geometry}
        material={materials.sole}
        material-color={snap.items.sole}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_5.geometry}
        material={materials.stripes}
        material-color={snap.items.stripes}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_6.geometry}
        material={materials.band}
        material-color={snap.items.band}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_7.geometry}
        material={materials.patch}
        material-color={snap.items.patch}
      />
    </group>
  );
}

export default function ProductRoute() {
  const product = useLoaderData();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (action: any) => {
    switch (action) {
      case "+":
        if (quantity < product.stock) setQuantity(quantity + 1);
        break;

      case "-":
        if (quantity > 1) setQuantity(quantity - 1);
        break;

      default:
        break;
    }
  };

  const handleAddToCart = (
    id: string,
    name: string,
    quantity: number,
    price: string
  ) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")!) || [];
    const item = {
      id: id,
      name: name,
      quantity: quantity,
      price: parseInt(price) * 1000,
    };
    if (currentCart.length === 0) {
      currentCart.push(item);
    } else {
      let temp = -1;
      for (let i = 0; i < currentCart.length; i++) {
        if (currentCart[i].id === id) temp = i;
      }
      if (temp >= 0) {
        currentCart[temp].quantity += quantity;
      } else {
        currentCart.push(item);
      }
    }
    localStorage.setItem("cart", JSON.stringify(currentCart));
  };

  const openFullScreen = () => {
    document.getElementById("productImage")?.requestFullscreen();
  };

  return (
    <div className="w-full pt-16">
      <div className="grid items-start md:grid-cols-2">
        <div className="overflow-hidden">
          <img
            id="productImage"
            className="m-16 aspect-square h-4/5 w-4/5 transform justify-center overflow-hidden rounded-2xl bg-white object-scale-down object-center shadow-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:cursor-pointer hover:shadow-2xl"
            src={product.image}
            alt={product.shortDesc}
            onClick={() => {
              openFullScreen();
            }}
          />
        </div>
        <div className="flex flex-col space-y-6 pb-4 pl-6 pr-20 pt-20">
          <h6>
            <Link to="/products" className="font-semibold text-yellow-500">
              Products
            </Link>{" "}
            /{" "}
            <Link
              to={`/category/${product.category}`}
              className="font-semibold"
            >
              {product.category}{" "}
            </Link>{" "}
            / {product.name}{" "}
          </h6>
          <h1 className="text-3xl font-semibold text-gray-800">
            {product.name}{" "}
          </h1>
          <p className="text-3xl font-semibold text-yellow-500">
            {(product.price * 1000).toLocaleString()}₫
          </p>
          <div>
            <p className="font-semibold">Select Quantity</p>
            <div className="mt-2 flex items-center space-x-4 pr-4">
              <button
                className="w-10 rounded-md bg-gray-200 px-2 py-2 hover:border-yellow-500 hover:bg-yellow-500 hover:font-extrabold hover:text-yellow-700 hover:shadow-sm"
                onClick={() => handleQuantityChange("-")}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="w-10 rounded-md bg-gray-200 px-2 py-2 hover:border-yellow-500 hover:bg-yellow-500 hover:font-extrabold hover:text-yellow-700 hover:shadow-sm"
                onClick={() => handleQuantityChange("+")}
              >
                +
              </button>
            </div>
          </div>
          <div>
            <button
              className="inline-flex items-center rounded bg-yellow-500 px-4 py-2 font-semibold text-gray-50 hover:bg-yellow-600"
              onClick={() => {
                handleAddToCart(
                  product.id,
                  product.name,
                  quantity,
                  product.price
                );
                toast.success("Great! Item(s) added.");
              }}
            >
              <BiShoppingBag className="mr-2 text-lg" />{" "}
              <span>Add to Cart</span>
            </button>
          </div>
          <div>
            <p className="font-semibold">Product Description</p>
            <hr className="mt-2 w-2/3 border-t-2 border-gray-300" />
            <p className="mt-4 text-gray-700">{product.description}</p>
          </div>
          <div>
            <p className="font-semibold">Product Rating</p>
            <hr className="mt-2 w-2/3 border-t-2 border-gray-300" />
            <div className="mt-4 flex items-center space-x-1">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <p className="text-sm font-bold text-gray-700">4.95</p>
              <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500" />
              <Link
                to={`/products/${product.id}/reviews`}
                className="text-sm font-medium text-gray-700 no-underline"
                prefetch="intent"
              >
                {product.reviews?.length} reviews
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(251, 191, 36)",
            color: "#fff",
          },
          iconTheme: {
            primary: "white",
            secondary: "black",
          },
        }}
      />
    </div>
  );
}
