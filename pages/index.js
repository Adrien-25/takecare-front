import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Featured from "@/components/Featured";
import CategoriesSection from "@/components/CategoriesSection";
import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";

export default function HomePage({featuredProduct,newProducts}) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <CategoriesSection />
      <NewProducts products={newProducts} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '64872cfeb1b0ee9cd1f51ef6';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}