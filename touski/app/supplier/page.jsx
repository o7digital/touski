import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { directusMe } from "@/lib/directus";

export default async function SupplierDashboard() {
  const token = cookies().get("d_access_token")?.value;
  if (!token) redirect("/login");

  const meRes = await directusMe(token);
  const me = meRes?.data;
  if (!me) redirect("/login");
  if (me.admin_access) redirect("/admin");

  return (
    <main style={{ padding: 24 }}>
      <h1>Espace Fournisseur</h1>
      <p>Connecté: {me.email}</p>
      <p>Rôle: {me.role?.name || me.role?.id || "supplier"}</p>
      <form action="/api/auth/logout" method="post">
        <button type="submit">Se déconnecter</button>
      </form>
    </main>
  );
}

