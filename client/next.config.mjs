/** @type {import('next').NextConfig} */
const nextConfig = {
  //whitelist all domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    // API_BASE_URL: "https://open-cottage-api.vercel.app/api/v1/",
    API_BASE_URL: "http://localhost:8000/api/v1/",

    // NEXTAUTH_URL: "https://open-cottage-client.vercel.app",
    NEXTAUTH_URL: "http://localhost:3000",
  },
};

export default nextConfig;
