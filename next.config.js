/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.jambase.com',
            port: '',
            pathname: '/**',
          },
        ]
    }
}
module.exports = nextConfig
