import AdminProductList from "../features/admin/components/AdminProductList";
import Navbar from "../features/navbar/Navbar";
import Promo from "../features/product-list/Promo";

function AdminHome() {
  return (
    <div>
      <Navbar>
        {/* <Promo></Promo> */}
        <AdminProductList></AdminProductList>
      </Navbar>
    </div>
  );
}

export default AdminHome;
