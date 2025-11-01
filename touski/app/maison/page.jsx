import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function MaisonRedirect() {
  // Redirige vers la liste CJ pré-filtrée.
  // Utilise un terme anglophone pour garantir des résultats (catalogue CJ en EN).
  redirect("/shop-1?source=cj&q=house&page=1&pageSize=24");
}

