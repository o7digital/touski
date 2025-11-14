import Footer8 from "@/components/footers/Footer8";

import Header1 from "@/components/headers/Header1";
import Terms from "@/components/otherPages/Terms";
import React from "react";

export const metadata = {
  title: "Politique de Confidentialité || TOUSKI",
  description: "Politique de confidentialité et protection des données personnelles - TOUSKI",
};
export default function TermsPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <Terms />
      </main>

      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}
