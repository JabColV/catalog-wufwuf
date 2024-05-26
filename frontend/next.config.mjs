/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '/service-pets',
  images: {
    domains: ['127.0.0.1', 'firebasestorage.googleapis.com', 'example.com'], // dominios permitidos
  },
  rewrites() {
    return [
      { source: '/service-pets/_next/:path*', destination: '/_next/:path*' },
    ];
  },
};
  
export default nextConfig;

// export default {
//     // Otras configuraciones pueden estar aquí
//     images: {
//         domains: ['127.0.0.1','firebasestorage.googleapis.com','example.com'], // dominio desde el back
//     },
// };


