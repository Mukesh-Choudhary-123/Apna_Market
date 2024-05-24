import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import CategorySection from "../features/product-list/components/CategorySection";
import ProductList from "../features/product-list/components/ProductList";
import Promo from "../features/product-list/Promo";
import Banner from "../features/user/components/Banner";
import Testimonials from "../features/user/components/Testimonials";

function Home() {
  return (
    <div>
      {/* <Banner></Banner> */}
      <Navbar>
        <Promo></Promo>
        <CategorySection></CategorySection>
        <ProductList></ProductList>
        {/* <Testimonials /> */}
        <Footer />
      </Navbar>
    </div>
  );
}

export default Home;
