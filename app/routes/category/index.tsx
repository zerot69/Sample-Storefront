import { Link } from "@remix-run/react";

export default function CategoryIndexPage() {
  return (
    <div className="mt-8 w-full pb-40">
      <h1 className="text-gray-00 p-8 pt-20 pl-24 text-5xl">
        Featured Categories
      </h1>
      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div className="aspect-w-3 aspect-h-4 relative hidden overflow-hidden rounded-lg lg:block">
          <Link to="/category/Clothing">
            <img
              src={`https://media.istockphoto.com/photos/display-of-elegant-silk-clothes-on-rack-luxurious-garments-in-fashion-picture-id1393893314?b=1&k=20&m=1393893314&s=170667a&w=0&h=ziWanOx35kPkFNcDSVJj3wUkJSXnRk3IgFZQ-lxwr4o=`}
              alt={`alt`}
              className="h-full w-full object-cover object-center blur-sm transition duration-300 hover:scale-110"
            />
            <div className="absolute bottom-20 left-20 z-10 text-center text-5xl font-bold text-gray-50 drop-shadow-2xl">
              Clothing
            </div>
          </Link>
        </div>
        <div className="relative hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div className="aspect-w-3 aspect-h-2 relative overflow-hidden rounded-lg">
            <Link to="/category/Movies">
              <img
                src={`https://s3-us-west-2.amazonaws.com/prd-rteditorial/wp-content/uploads/2018/03/13153742/RT_300EssentialMovies_700X250.jpg`}
                alt={`alt`}
                className="h-full w-full object-cover object-center blur-sm transition duration-300 hover:scale-110"
              />
              <div className="absolute bottom-20 left-20 z-10 text-center text-5xl font-bold text-gray-50 drop-shadow-2xl">
                Movies
              </div>
            </Link>
          </div>
          <div className="aspect-w-3 aspect-h-2 relative overflow-hidden rounded-lg">
            <Link to="/category/Beauty">
              <img
                src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz2gSibXJS2GwCx9tgZqHrZqF2u-YqiKkM-bKm183CM_h3iuItj5ajl34uolxpowcQVBk&usqp=CAU`}
                alt={`alt`}
                className="h-full w-full object-cover object-center blur-sm transition duration-300 hover:scale-110"
              />
              <div className="absolute bottom-20 left-20 z-10 text-center text-5xl font-bold text-gray-50 drop-shadow-2xl">
                Beauty
              </div>
            </Link>
          </div>
        </div>
        <div className="aspect-w-3 aspect-h-4 relative hidden overflow-hidden rounded-lg lg:block">
          <Link to="/category/Books">
            <img
              src={`https://static01.nyt.com/images/2020/11/12/books/review/12books-announcement/12books-announcement-mediumSquareAt3X.jpg`}
              alt={`alt`}
              className="h-full w-full object-cover object-center blur-sm transition duration-300 hover:scale-110"
            />
            <div className="absolute bottom-20 left-20 z-10 text-center text-5xl font-bold text-gray-50 drop-shadow-2xl">
              Books
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
