import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedproduct,
  createProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectProductById,
  updateProductAsync,
} from "../../product-list/ProductSlice";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../common/Modal";
import toast from "react-hot-toast";

const ProductForm = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(null);

  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const selectedProducts = useSelector(selectProductById);
  console.log(selectedProducts);
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedproduct());
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedProducts && params.id) {
      setValue("title", selectedProducts.title);
      setValue("brand", selectedProducts.brand);
      setValue("category", selectedProducts.category);
      setValue("description", selectedProducts.description);
      setValue("price", selectedProducts.price);
      setValue("discountPercentage", selectedProducts.discountPercentage);
      setValue("stock", selectedProducts.stock);
      setValue("thumbnail", selectedProducts.thumbnail);
      setValue("image1", selectedProducts.images[0]);
      setValue("image2", selectedProducts.images[1]);
      setValue("image3", selectedProducts.images[2]);
      setValue("image4", selectedProducts.images[3]);
      setValue("details", selectedProducts.details);
      setValue("rating", selectedProducts.rating);
    }
  }, [selectedProducts, setValue, params.id]);

  const handleDelete = () => {
    const product = { ...selectedProducts };
    product.deleted = true;
    dispatch(updateProductAsync(product));
    toast.error("Product deleted");
  };

  return (
    <form
      className="bg-white  px-3 py-6 w-auto"
      noValidate
      onSubmit={handleSubmit((data) => {
        const product = { ...data };
        product.images = [
          product.image1,
          product.image2,
          product.image3,
          product.image4,
          product.thumbnail,
        ];
        product.rating = product.rating;
        delete product["image1"];
        delete product["image2"];
        delete product["image3"];
        delete product["image4"];
        product.price = +product.price;
        product.discountPercentage = +product.discountPercentage;
        product.stock = +product.stock;
        product.rating = +product.rating;

        if (params.id) {
          product.id = params.id;
          // console.log(params.id);
          console.log(product);
          // console.log(selectedProducts[0].rating);
          // product.rating = selectedProducts.rating || 0;
          // product.rating = selectedProducts.rating;
          dispatch(updateProductAsync(product));
          reset();
          navigate(`/admin`);
          toast.success("Products updated successfully");
        } else {
          dispatch(createProductAsync(product));
          toast.error("Product not updated successfully");
          // reset();
          // navigate(`/admin`);
        }
      })}
    >
      <div className="space-y-12">
        <div className=" p-2">
          <div className="border-b border-gray-900/10 ">
            <h2 className=" text-2xl text-center font-bold leading-8 text-gray-900">
              {!selectedProducts ? <>Add Product</> : <>Edit Product</>}
            </h2>
            {selectedProducts?.deleted && (
              <h3 className="text-red-600"> This Product is deleted </h3>
            )}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 pb-12">
              {/* title */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("title", {
                      required: "title is required",
                    })}
                    id="title"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* brand */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <select
                    {...register("brand", {
                      required: "brand is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>select brand </option>
                    {brands.map((brand) => (
                      <option value={brand.value}>{brand.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* category */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    {...register("category", {
                      required: "category is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>select category</option>
                    {categories.map((category) => (
                      <option value={category.value}>{category.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* rating */}
              <div className="sm:col-span-1">
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  rating
                </label>
                <div className="mt-2">
                  <select
                    {...register("rating", {
                      required: "rating is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>select rating </option>
                    <option value="1">1</option>
                    <option value="1.5">1.5</option>
                    <option value="2">2</option>
                    <option value="2.8">2.8</option>
                    <option value="3">3</option>
                    <option value="3.3">3.2</option>
                    <option value="4">4</option>
                    <option value="4.4">4.4</option>
                  </select>
                </div>
              </div>

              {/* description */}
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "description is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about Product.
                </p>
              </div>

              {/* price */}

              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    id="price"
                    {...register("price", {
                      required: "price is required",
                    })}
                    type="number"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* discountPercentage */}

              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount
                </label>
                <div className="mt-2">
                  <input
                    id="discountPercentage"
                    {...register("discountPercentage", {
                      required: "discountPercentage is required",
                      max: 100,
                    })}
                    type="number"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* stock */}

              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <input
                    id="stock"
                    {...register("stock", {
                      required: "stock is required",
                      min: 0,
                    })}
                    type="number"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* thumbnail */}
              <div className="sm:col-span-6">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail
                </label>

                <div className="mt-2 flex">
                  <input
                    id="thumbnail"
                    {...register("thumbnail", {
                      required: "thumbnail is required",
                    })}
                    type="text"
                    className="block w-full mr-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* image */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="image1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image Right
                </label>
                <div className="mt-2">
                  <input
                    id="image1"
                    {...register("image1", {
                      required: "image1 is required",
                    })}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* 2 */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image Center Top
                </label>
                <div className="mt-2">
                  <input
                    id="image2"
                    {...register("image2", {
                      required: "image2 is required",
                    })}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* 3 */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="image3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image Center Bottom
                </label>
                <div className="mt-2">
                  <input
                    id="image3"
                    {...register("image3", {
                      required: "image3 is required",
                    })}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* 4 */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="image4"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image Left / Phone View Image
                </label>
                <div className="mt-2">
                  <input
                    id="image4"
                    {...register("image4", {
                      required: "image4 is required",
                    })}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* details */}
              <div className="col-span-full">
                <label
                  htmlFor="details"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Details
                </label>
                <div className="mt-2">
                  <textarea
                    id="details"
                    {...register("details", {
                      required: "details is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a details about Product.
                </p>
              </div>
            </div>
          </div>
          {/* <div className="border-b border-gray-900/10 pb-12 mt-6">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Notifications
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              We'll always let you know about important changes, but you pick
              what else you want to hear about.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  Push Notifications
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  These are delivered via SMS to your mobile phone.
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-everything"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-everything"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Everything
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-email"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Same as email
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-nothing"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-nothing"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div> */}

          <div className="mt-6 flex items-center justify-end gap-x-6">
            {/* Cancel */}
            <button className="rounded-md bg-[#373636]  px-3 py-2 text-sm font-semibold text-white shadow-sm  hover:bg-[rgb(170,167,167)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(223,27,51,255)]">
              Cancel
            </button>

            {/* delete */}
            {selectedProducts && !selectedProducts.deleted && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setOpenModal(true);
                }}
                className="rounded-md bg-[rgb(2,2,2)] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#7f7474] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(223,27,51,255)]"
              >
                Delete
              </button>
            )}

            {/* Save */}
            <button
              type="submit"
              className="rounded-md bg-[rgba(223,27,51,255)] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#ef4444] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(223,27,51,255)]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <Modal
        title={`Delete this Product`}
        message={"Are you sure you want to delete this Product ? "}
        dangerOption={"Delete"}
        cancelOption={"Cancel"}
        cancelAction={() => setOpenModal(null)}
        dangerAction={handleDelete}
        showModal={openModal}
      />
    </form>
  );
};

export default ProductForm;
