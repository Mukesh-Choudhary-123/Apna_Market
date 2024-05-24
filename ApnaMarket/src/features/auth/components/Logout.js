import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, signOutAsync } from "../AuthSlice";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const Logout = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(signOutAsync());
  });

  return <div>{!user && <Navigate to="/login" replace={true}></Navigate>}</div>;
};

export default Logout;
