import PolicyPage from "@/components/otherPages/policies/PolicyPage";
import { getPolicyContent, getPolicyMetadata } from "@/data/policies";
import React from "react";

export const metadata = getPolicyMetadata("taxes", "en");

export default function TaxesAndDutiesPageEn() {
  return <PolicyPage content={getPolicyContent("taxes", "en")} />;
}
