import { Link, useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: { params: any }) => {
  const product = await fetch(
    `https://635739669243cf412f94ec88.mockapi.io/Products/${params.productId}`
  );
  return await product.json();
};

export default function ProductReviewsRoute() {
  const product = useLoaderData();

  return (
    <div className="w-full pt-16">
      <div className="grid items-baseline md:grid-cols-2">
        <div>
          <img
            className="m-16 aspect-square h-4/5 w-4/5 justify-center overflow-hidden rounded-2xl object-cover object-center shadow-xl hover:border-yellow-500"
            src={product.image}
            alt={product.shortDesc}
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
            /{" "}
            <Link to={`/products/${product.id}`} className="font-semibold">
              {product.name}{" "}
            </Link>{" "}
            / Reviews
          </h6>
          <h1 className="text-3xl font-semibold text-gray-800">
            <Link to={`/products/${product.id}`} className="font-semibold">
              {product.name}
            </Link>
          </h1>
          {product.reviews.length === 0 ? (
            <p>There is no comments for this product.</p>
          ) : (
            <>
              {product.reviews.map((review: any) => (
                <div key={review.id}>
                  <article>
                    <div className="mb-4 flex items-center space-x-6">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={review.avatar}
                        alt={review.name}
                      />
                      <div className="flex-grow space-y-1 font-medium">
                        <p>
                          {review.name}
                          <time
                            dateTime="2014-08-16 19:00"
                            className="block text-sm text-gray-700"
                          >
                            {new Date(review.createdAt).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </time>
                        </p>
                      </div>
                      <div>
                        <svg
                          aria-hidden="true"
                          className="inline-block h-5 w-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>First star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="inline-block h-5 w-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Second star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="inline-block h-5 w-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Third star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="inline-block h-5 w-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Fourth star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="inline-block h-5 w-5 text-yellow-400"
                          fill="gray"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Fifth star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="my-4 text-sm font-semibold text-gray-900">
                      {review.reviewTitle}
                    </h3>
                    <p className="my-4 font-light text-gray-700">
                      {review.review}
                    </p>
                  </article>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
