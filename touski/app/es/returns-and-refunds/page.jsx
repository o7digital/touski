import PolicyPage from "@/components/otherPages/policies/PolicyPage";
import { getPolicyContent, getPolicyMetadata } from "@/data/policies";
import React from "react";

export const metadata = getPolicyMetadata("returns", "es");

export default function ReturnsAndRefundsPageEs() {
  return <PolicyPage content={getPolicyContent("returns", "es")} />;
}
