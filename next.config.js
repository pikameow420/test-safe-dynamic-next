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
                source: '/manifest.json',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-Requested-With, content-type, Authorization',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: 'frame-ancestors "self" https://app.safe.global https://*.coinshift.global;',
                    },
                ],
            },
        ]
    },    
    }

module.exports = nextConfig
