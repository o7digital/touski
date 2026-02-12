import PolicyPage from "@/components/otherPages/policies/PolicyPage";
import { getPolicyContent, getPolicyMetadata } from "@/data/policies";
import React from "react";

export const metadata = getPolicyMetadata("shipping", "fr");

export default function ShippingPolicyPageFr() {
  return <PolicyPage content={getPolicyContent("shipping", "fr")} />;
}
