import toast from "react-hot-toast";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import Bannerslider from "../features/product-list/Bannerslider";
import CategorySection from "../features/product-list/components/CategorySection";
import ProductList from "../features/product-list/components/ProductList";
import Promo from "../features/product-list/Promo";

function Home() {
  toast.dismiss();
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
