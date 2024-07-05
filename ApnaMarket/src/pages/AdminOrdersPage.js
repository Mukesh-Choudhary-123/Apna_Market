import React from "react";
import AdminOrders from "../features/admin/components/AdminOrders";
import NavBar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";

const AdminOrdersPage = () => {
  return (
    <div>
      <NavBar>
        <AdminOrders></AdminOrders>
      </NavBar>
      <Footer />
    </div>
  );
};

export default AdminOrdersPage;
