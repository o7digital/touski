import RootLayout from "../layout";

export default function EsLayout({ children }) {
  return <RootLayout langOverride="es">{children}</RootLayout>;
}
