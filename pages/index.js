// Import necessary dependencies and components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Featured from "@/components/Featured";
import CategoriesSection from "@/components/CategoriesSection";
import ReassuranceSection from "@/components/ReassuranceSection";
import PromotedSection from "@/components/PromotedSection";
import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";

// HomePage component
export default function HomePage({featuredProduct,newProducts}) {
  return (
    <div>
      <Header />
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
  // Define the ID of the featured product
  const featuredProductId = '64872cfeb1b0ee9cd1f51ef6';

  // Connect to the MongoDB database using Mongoose
  await mongooseConnect();

  // Fetch the featured product by ID
  const featuredProduct = await Product.findById(featuredProductId);

  // Fetch the latest 10 products for the new products section
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  
  // Return the fetched data as props for the HomePage component
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}