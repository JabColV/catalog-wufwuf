import { NextResponse } from "next/server";
const ServiceLink = 'http://servicio-api-gateway-service/service-users/api/users/get/user';

export async function GET(req, res) {
    if (req.method === 'GET') {
        try {
            // Extraer todas las cookies de la solicitud entrante
            const cookies = req.headers.cookie;
            console.log('Cookies:', cookies);

            // Buscar la cookie llamada 'access-token'
            const accessTokenCookie = cookies.split(';').find(cookie => cookie.trim().startsWith('access-token='));
            console.log('Access Token:', accessTokenCookie);    
            // Obtener el valor de la cookie 'access-token'
            const accessToken = accessTokenCookie ? accessTokenCookie.split('=')[1] : '';
            
            let preRes = await fetch(ServiceLink, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'access-token': accessToken
                },
            });
            const data = await preRes.json()
            return NextResponse.json(data);
        } catch (err) {
            console.error(err);
            res.status(500).json({ data: 'Error next api', err: JSON.stringify(err) });
        }

    } 
}
