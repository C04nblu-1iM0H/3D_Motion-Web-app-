/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        'MYSQL_HOST': '127.0.0.1',
        'MYSQL_PORT': '3306',
        'MYSQL_DATABASE': '3D-Motion',
        'MYSQL_USER': 'root',
        'MYSQL_PASSWORD': '',
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com'
          },
        ],
    },
};

export default nextConfig;
