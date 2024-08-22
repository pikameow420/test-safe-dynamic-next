/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: (config) => {
        // added due to issues finding these packages when running. Github issue/comment:
        // https://github.com/WalletConnect/walletconnect-monorepo/issues/1908#issuecomment-1487801131
        config.externals.push("pino-pretty", "lokijs", "encoding");
        return config;
    },
    async headers() {
        return [
          {
            source: '/:path*',
            headers: [
              {
                key: 'Access-Control-Allow-Origin',
                value: '*',
              },
              {
                key: 'Access-Control-Allow-Methods',
                value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
              },
              {
                key: 'Access-Control-Allow-Headers',
                value: 'X-Requested-With, Content-Type, Authorization',
              },
              {
                key: 'X-Frame-Options',
                value: 'ALLOWALL',
              },
            ],
          },
        ]
      },
    }

module.exports = nextConfig
