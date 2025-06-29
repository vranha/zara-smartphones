import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...otras opciones que puedas tener
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src')],
  },
};

export default nextConfig;
