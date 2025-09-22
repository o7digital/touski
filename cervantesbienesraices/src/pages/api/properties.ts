import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch("https://api.easybroker.com/v1/properties", {
      headers: {
        accept: "application/json",
        "X-Authorization": process.env.EB_API_KEY!, // usamos la API Key guardada en .env.local
      },
    });

    if (!response.ok) {
      throw new Error("Error al consultar EasyBroker");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
