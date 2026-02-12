import PolicyPage from "@/components/otherPages/policies/PolicyPage";
import { getPolicyContent, getPolicyMetadata } from "@/data/policies";
import React from "react";

export const metadata = getPolicyMetadata("shipping", "es");

export default function ShippingPolicyPageEs() {
  return <PolicyPage content={getPolicyContent("shipping", "es")} />;
}
