import PolicyPage from "@/components/otherPages/policies/PolicyPage";
import { getPolicyContent, getPolicyMetadata } from "@/data/policies";
import React from "react";

export const metadata = getPolicyMetadata("taxes", "fr");

export default function TaxesAndDutiesPageFr() {
  return <PolicyPage content={getPolicyContent("taxes", "fr")} />;
}
