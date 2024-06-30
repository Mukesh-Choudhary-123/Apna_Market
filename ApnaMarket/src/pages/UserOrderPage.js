import React from "react";
import UserOrder from "../features/user/components/UserOrder";
import Navbar from "../features/navbar/Navbar";

export const UserOrderPage = () => {
  return (
    <div>
      <Navbar>
        <UserOrder />
      </Navbar>
    </div>
  );
};
