import Header1 from "@/components/headers/Header1";
import Footer8 from "@/components/footers/Footer8";
import SingleProduct12 from "@/components/singleProduct/SingleProduct12";
import { getProduct } from "@/lib/woocommerce";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-md-1 pb-md-3"></div>
        <SingleProduct12 product={product} />
      </main>
      <Footer8 />
    </>
  );
}

