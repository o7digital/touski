import PolicyPage from "@/components/otherPages/policies/PolicyPage";
import { getPolicyContent, getPolicyMetadata } from "@/data/policies";
import React from "react";

export const metadata = getPolicyMetadata("returns", "fr");

export default function ReturnsAndRefundsPageFr() {
  return <PolicyPage content={getPolicyContent("returns", "fr")} />;
}
