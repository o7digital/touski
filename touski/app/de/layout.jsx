import RootLayout from "../layout";

export default function DeLayout({ children }) {
  return <RootLayout langOverride="de">{children}</RootLayout>;
}
