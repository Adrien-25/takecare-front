// Import necessary dependencies and components
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Featured from "@/components/Sections/Featured";
import CategoriesSection from "@/components/Sections/CategoriesSection";
import ReassuranceSection from "@/components/Sections/ReassuranceSection";
import PromotedSection from "@/components/Sections/PromotedSection";
import {Product} from "@/models/Product";
import {Category} from "@/models/Category";
import {mongooseConnect} from "@/lib/mongoose";
import NewProducts from "@/components/Product/NewProducts";

// HomePage component
export default function HomePage({featuredProduct,newProducts, Categories}) {
  console.log(newProducts);
  console.log(Categories);
  return (
    <div>
      <Header ListCategory={Categories}/>
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
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:4});

  const Categories = await Category.find();
  console.log(Categories);
  console.log(newProducts);

  // Return the fetched data as props for the HomePage component
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      Categories: JSON.parse(JSON.stringify(Categories)),
      
    },
  };
}