import PolicyPage from "@/components/otherPages/policies/PolicyPage";
import { getPolicyContent, getPolicyMetadata } from "@/data/policies";
import React from "react";

export const metadata = getPolicyMetadata("returns", "de");

export default function ReturnsAndRefundsPageDe() {
  return <PolicyPage content={getPolicyContent("returns", "de")} />;
}
