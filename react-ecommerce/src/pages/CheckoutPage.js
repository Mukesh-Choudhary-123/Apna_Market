import Checkout from "../features/checkout/Checkout";
import Navbar from "../features/navbar/Navbar";

function CheckoutPage() {
  return (
    <>
      <Navbar>
        <Checkout></Checkout>
      </Navbar>
    </>
  );
}

export default CheckoutPage;
