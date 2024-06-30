import Checkout from "../features/checkout/Checkout";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";

function CheckoutPage() {
  return (
    <>
      <Navbar>
        <Checkout></Checkout>
      </Navbar>
      <Footer />
    </>
  );
}

export default CheckoutPage;
