import React, { useEffect } from "react";
import {
  fetchBestCategoriesAsync,
  selectBestCategories,
} from "../ProductSlice";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StarIcon } from "@heroicons/react/20/solid";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ProductListCategorySection = () => {
  const query = useQuery();
  const category = query.get("category");
  const dispatch = useDispatch();

  const products = useSelector(selectBestCategories);

  console.log(products);

  console.log("category :", category);

  useEffect(() => {
    dispatch(fetchBestCategoriesAsync(category));
  }, [dispatch, category]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-white">
      <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900">
        {category}
      </h2>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products ? (
            <>
              {products?.products?.map((product) => (
                <Link to={`/product-detail/${product.id}`}>
                  <div
                    key={product.id}
                    className="group relative border-solid boredr-gray-200 border-2 p-2"
                  >
                    <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                      <img
                        src={product.thumbnail}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <p href={product.href}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.title}
                          </p>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          <StarIcon className="h-4 w-4 inline"></StarIcon>
                          <span className="px-1 py-2 align-bottom">
                            {product.rating}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          $
                          {Math.round(
                            product.price *
                              (1 - product.discountPercentage / 100)
                          )}
                        </p>
                        <p className="text-sm font-medium text-gray-500">
                          <span className="line-through">${product.price}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  {product.stock <= 0 && (
                    <div>
                      <p className="text-red-600 text-center">
                        ( Out of Stock )
                      </p>
                    </div>
                  )}
                </Link>
              ))}
            </>
          ) : (
            <>Category Not Match</>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default ProductListCategorySection;
