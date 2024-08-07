import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import logo from "./logo.png";
import {
  resetPasswordAsync,
  selectError,
  selectPasswordReset,
} from "../AuthSlice";

export default function ResetPassword() {
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");

  const dispatch = useDispatch();
  const passwordReset = useSelector(selectPasswordReset);
  const error = useSelector(selectError);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <>
      {email && token ? (
        <div>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100 h-screen">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src={logo}
                alt="Apna Market"
              />
              <p className="text-center  text-gray-900 font-bold">
                Apna Market
              </p>
              <h6 className="mt-10 text-center text-xl md:text-2xl lg:text-2xl  leading-9 tracking-tight text-gray-900">
                Enter New password
              </h6>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                noValidate
                className="space-y-6"
                onSubmit={handleSubmit((data) => {
                  dispatch(
                    resetPasswordAsync({
                      email,
                      token,
                      password: data.password,
                    })
                  );
                  reset();
                })}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      New Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      {...register("password", {
                        required: "password is required",
                        pattern: {
                          value:
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                          message: `- at least 8 characters 
                         - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                         - Can contain special characters`,
                        },
                      })}
                      type="password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:text-sm sm:leading-6"
                    />
                    {errors.password && (
                      <p className="text-red-500 ">{errors.password.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      New Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      {...register("confirmPassword", {
                        required: "confirm Password is required",
                        validate: (value, formValues) =>
                          value === formValues.password ||
                          "password is matching",
                      })}
                      type="password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:text-sm sm:leading-6"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 ">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                    {passwordReset && (
                      <p className="text-center text-sm text-green-600">
                        Password Reset Successfully
                      </p>
                    )}
                    {error && <p className="text-red-500 ">{error}</p>}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full disabled:bg-[#ef4444] justify-center rounded-md  bg-[rgba(223,27,51,255)] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#ef4444] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Reset Password
                  </button>
                </div>
              </form>

              {/* <p className="mt-10 text-center text-sm text-gray-500">
            Send me back to{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-[rgba(223,27,51,255)] hover:text-[#ef4444]"
            >
              Login
            </Link>
          </p> */}
            </div>
          </div>
        </div>
      ) : (
        <h2> In-Correct Link </h2>
      )}
    </>
  );
}
