import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductListCategorySection from "../features/product-list/components/ProductListCategorySection";
import Footer from "../features/common/Footer";

const ProductListCategorySectionPage = () => {
  return (
    <div>
      <Navbar>
        <ProductListCategorySection></ProductListCategorySection>
      </Navbar>
      <Footer />
    </div>
  );
};

export default ProductListCategorySectionPage;
