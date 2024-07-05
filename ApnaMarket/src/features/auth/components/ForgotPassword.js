import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import logo from "./logo.png";
import {
  resetPasswordRequestAsync,
  selectMailSents,
  selectResetPasswordRequestStatus,
} from "../AuthSlice";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const mailSent = useSelector(selectMailSents);
  const status = useSelector(selectResetPasswordRequestStatus);
  console.log(status);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (status === "loading") {
      toast.loading("Sending email...");
    } else {
      toast.dismiss(); // Dismiss any ongoing toast when not loading
    }
  }, [status]);

  useEffect(() => {
    if (mailSent) {
      toast.success("mail sent successfully");
    }
  }, [mailSent]);

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100 h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src={logo} alt="Apna Market" />
          <p className="text-center  text-gray-900 font-bold">Apna Market</p>
          <h6 className="mt-10 text-center text-xl md:text-2xl lg:text-2xl  leading-9 tracking-tight text-gray-900">
            Enter email to reset password
          </h6>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              console.log(data.email);
              dispatch(resetPasswordRequestAsync(data.email));
              reset();
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
                {errors.email && (
                  <p className="text-red-500 ">{errors.email.message}</p>
                )}
                {mailSent && (
                  <p className="text-center text-sm text-green-600">
                    Email sent successfully. Please check your inbox.
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                disabled={status === "loading"}
                type="submit"
                className="flex w-full disabled:bg-[#ef4444] justify-center rounded-md  bg-[rgba(223,27,51,255)] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#ef4444] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isSubmitting ? "Sending..." : "Send Email"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Send me back to{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-[rgba(223,27,51,255)] hover:text-[#ef4444]"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
