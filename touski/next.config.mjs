/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    quietDeps: true, // This will silence deprecation warnings
    silenceDeprecations: [
      "import",
      "global-builtin",
      "color-functions",
      "slash-div",
      "mixed-decls",
      "abs-percent",
      "function-units",
      "strict-unary",
      "legacy-js-api",
    ],
  },
  images: {
    remotePatterns: [
      // Images CJ (legacy)
      { protocol: "https", hostname: "oss-cf.cjdropshipping.com" },
      { protocol: "https", hostname: "cf.cjdropshipping.com" },
      // Images produits WooCommerce (store Touski)
      {
        protocol: "https",
        hostname: "oliviers42.sg-host.com",
      },
    ],
  },
};

export default nextConfig;
