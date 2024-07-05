import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import Bannerslider from "../features/product-list/Bannerslider";
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
        <Bannerslider />
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
