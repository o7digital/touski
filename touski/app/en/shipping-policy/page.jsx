import PolicyPage from "@/components/otherPages/policies/PolicyPage";
import { getPolicyContent, getPolicyMetadata } from "@/data/policies";
import React from "react";

export const metadata = getPolicyMetadata("shipping", "en");

export default function ShippingPolicyPageEn() {
  return <PolicyPage content={getPolicyContent("shipping", "en")} />;
}
