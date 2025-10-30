import { getPropriedades } from '../../lib/directus';

export default async function TestProductsPage() {
  let products = [];
  try {
    const res = await getPropriedades({ fields: '*', limit: 20 });
    products = res?.data || [];
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Erreur récupération produits Directus', e);
  }

  return (
    <main style={{ padding: 32 }}>
      <h1>Test Produits Directus</h1>
      {products.length === 0 ? (
        <p>Aucun produit trouvé.</p>
      ) : (
        <ul>
          {products.map((prod) => (
            <li key={prod.id}>
              <strong>{prod.nom || prod.name || 'Produit sans nom'}</strong>
              <br />
              ID: {prod.id}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
