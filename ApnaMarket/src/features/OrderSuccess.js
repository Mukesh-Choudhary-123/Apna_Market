import { Link, Navigate, useParams } from "react-router-dom";
import Lottie from "lottie-react";
import AnimationData from "./AnimationOrderSuccessfullyPlaced.json";
import AnimationData2 from "./AnimationParty.json";
import { useEffect } from "react";
import { resetCartAsync } from "./cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./auth/AuthSlice";
import { resetOrder } from "./order/OrderSlice";
export default function OrderSuccess() {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(resetCartAsync());
    dispatch(resetOrder());
  }, [dispatch]);
  return (
    <>
      {!params.id && <Navigate to="/home" replace={true} />}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 h-screen">
        <div className="text-center">
          <p className="text-base font-semibold text-[rgba(223,27,51,255)]">
            Order Summary
          </p>
          <div className="flex">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Order Successfully Placed
            </h1>
            <Lottie className="h-20 w-20" animationData={AnimationData} />
          </div>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Order Number <span className="text-black"> #{params.id}</span>
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/home">
              <a className="rounded-md bg-[rgba(223,27,51,255)] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#ef4444] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef4444]">
                Go back home
              </a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
