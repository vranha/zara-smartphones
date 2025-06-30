import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...otras opciones que puedas tener
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'prueba-tecnica-api-tienda-moviles.onrender.com',
        port: '',
        pathname: '/images/**', // Permite todas las imágenes que estén en /images/
      },
    ],
  },
};

export default nextConfig;
