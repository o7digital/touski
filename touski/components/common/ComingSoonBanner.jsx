"use client";
import { usePathname } from "next/navigation";

export default function ComingSoonBanner() {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");

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
      {isEnglish ? (
        <>
          🎉 <strong>Opening soon!</strong> Browse our catalog - Online shopping available very soon
        </>
      ) : (
        <>
          🎉 <strong>Ouverture prochaine !</strong> Découvrez notre catalogue - Achat en ligne disponible très bientôt
        </>
      )}
    </div>
  );
}
