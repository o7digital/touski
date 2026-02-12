"use client";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, getLocaleValue } from "@/lib/i18n";

export default function ComingSoonBanner() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname || "/");

  return (
    <div
      style={{
        backgroundColor: "#FF9445",
        color: "#fff",
        padding: "12px 0",
        textAlign: "center",
        fontWeight: "600",
        fontSize: "14px",
        position: "relative",
        zIndex: 1000,
      }}
    >
      {getLocaleValue(locale, {
        fr: (
          <>
            🎉 <strong>Ouverture prochaine !</strong> Découvrez notre catalogue - Achat en ligne disponible très bientôt
          </>
        ),
        en: (
          <>
            🎉 <strong>Opening soon!</strong> Browse our catalog - Online shopping available very soon
          </>
        ),
        de: (
          <>
            🎉 <strong>Baldige Eröffnung!</strong> Entdecken Sie unseren Katalog - Online-Einkauf in Kürze verfügbar
          </>
        ),
        es: (
          <>
            🎉 <strong>¡Próxima apertura!</strong> Descubre nuestro catálogo - Compra online disponible muy pronto
          </>
        ),
      }) ?? (
        <>
          🎉 <strong>Ouverture prochaine !</strong> Découvrez notre catalogue - Achat en ligne disponible très bientôt
        </>
      )}
    </div>
  );
}
