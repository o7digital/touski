import PolicyPage from "@/components/otherPages/policies/PolicyPage";
import { getPolicyContent, getPolicyMetadata } from "@/data/policies";
import React from "react";

export const metadata = getPolicyMetadata("returns", "en");

export default function ReturnsAndRefundsPageEn() {
  return <PolicyPage content={getPolicyContent("returns", "en")} />;
}
