import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { directusMe, getPropriedades } from "@/lib/directus";

export default async function AdminDashboard() {
  const token = cookies().get("d_access_token")?.value;
  if (!token) redirect("/login");

  const meRes = await directusMe(token);
  const me = meRes?.data;
  if (!me) redirect("/login");
  if (!me.admin_access) redirect("/supplier");

  const propsRes = await getPropriedades({ filter: { status: { _eq: "published" } }, limit: 5 }, token);
  const items = propsRes?.data || [];

  return (
    <main style={{ padding: 24 }}>
      <h1>Admin dashboard</h1>
      <p>Connecté: {me.email} (admin)</p>
      <h2>Propriétés publiées (5)</h2>
      <ul>
        {items.map((it) => (
          <li key={it.id}>{it.Title || `Propriété #${it.id}`}</li>
        ))}
      </ul>
      <form action="/api/auth/logout" method="post">
        <button type="submit">Se déconnecter</button>
      </form>
    </main>
  );
}

