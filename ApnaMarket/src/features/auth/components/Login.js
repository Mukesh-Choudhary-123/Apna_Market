import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  checkAuthAsync,
  selectCount,
  selectError,
  selectLoggedInUser,
} from "../AuthSlice";
import { Link, Navigate } from "react-router-dom";
import logo from "./logo.png";
import toast from "react-hot-toast";

export default function Login() {
  const count = useSelector(selectCount);
  const err = useSelector(selectError);
  console.log("ERROR => ", err);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      {user && <Navigate to="/home" replace={true}></Navigate>}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-200 h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src={logo} alt="Apna Market" />
          <p className="text-center  text-gray-900 font-bold">Apna Market</p>
          <h6 className="mt-10 text-center text-2xl  leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h6>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit((onSubmit) => {
              console.log(onSubmit);
              dispatch(
                checkAuthAsync({
                  email: onSubmit.email,
                  password: onSubmit.password,
                })
              );
            })}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "email not valid",
                    },
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to={"/forgot-password"}
                    className="font-semibold text-[rgba(223,27,51,255)] hover:text-[#ef4444]"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "password is required",
                  })}
                  type="password"
                  autoComplete="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[rgba(223,27,51,255)] sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              {/* {error && toast.error("Something went wrong")} */}
              {err && (
                <p className="text-red-500 pt-1">
                  {err || "Something Went Wrong"}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md  bg-[rgba(223,27,51,255)] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#ef4444] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-[rgba(223,27,51,255)] hover:text-[#ef4444]"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
