/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  compiler: {
    styledComponents: true,
  }, images: {
    domains: ['source.unsplash.com'],
  },
};

module.exports = nextConfig;
