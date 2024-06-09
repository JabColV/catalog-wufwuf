export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Extraer todas las cookies de la solicitud entrante
      const cookies = req.headers.cookie;

      // Buscar la cookie llamada 'access-token'
      const accessTokenCookie = cookies
        .split(";")
        .find((cookie) => cookie.trim().startsWith("access-token="));

      // Obtener el valor de la cookie 'access-token'
      const accessToken = accessTokenCookie
        ? accessTokenCookie.split("=")[1]
        : "";

      let preRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_TOKEN}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "access-token": accessToken,
        },
      });
      const data = await preRes.json();
      res.status(preRes.status).json(data);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ data: "Error next api", err: JSON.stringify(err) });
    }
  }
}
