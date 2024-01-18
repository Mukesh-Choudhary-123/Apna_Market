import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product-list/components/ProductList";
import Promo from "../features/product-list/Promo";

function Home() {
  return (
    <div>
      <Navbar>
        <Promo></Promo>
        <ProductList></ProductList>
      </Navbar>
    </div>
  );
}

export default Home;
