import PolicyPage from "@/components/otherPages/policies/PolicyPage";
import { getPolicyContent, getPolicyMetadata } from "@/data/policies";
import React from "react";

export const metadata = getPolicyMetadata("shipping", "de");

export default function ShippingPolicyPageDe() {
  return <PolicyPage content={getPolicyContent("shipping", "de")} />;
}
