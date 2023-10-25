// Import necessary dependencies and components
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Featured from "@/components/Sections/Featured";
import CategoriesSection from "@/components/Sections/CategoriesSection";
import ReassuranceSection from "@/components/Sections/ReassuranceSection";
import PromotedSection from "@/components/Sections/PromotedSection";
import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
import NewProducts from "@/components/Product/NewProducts";

// HomePage component
export default function HomePage({featuredProduct,newProducts}) {
  return (
    <div>
      <Featured product={featuredProduct} />
      <ReassuranceSection />
      <CategoriesSection />
      <NewProducts products={newProducts} />
      <PromotedSection/>
      <Footer />
    </div>
  );
}
// Function to fetch data from the server
export async function getServerSideProps() {
  const featuredProductId = '64872cfeb1b0ee9cd1f51ef6';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:4});

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}