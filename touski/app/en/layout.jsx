import RootLayout from "../layout";

// Wrapper to ensure lang="en" for the English section
export default function EnLayout({ children }) {
  return <RootLayout langOverride="en">{children}</RootLayout>;
}
