import PolicyPage from "@/components/otherPages/policies/PolicyPage";
import { getPolicyContent, getPolicyMetadata } from "@/data/policies";
import React from "react";

export const metadata = getPolicyMetadata("taxes", "de");

export default function TaxesAndDutiesPageDe() {
  return <PolicyPage content={getPolicyContent("taxes", "de")} />;
}
