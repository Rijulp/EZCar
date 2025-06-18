/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsHmrCache: false, //default: true,
    },

    images: {
        remotePatterns:[
            {
                protocol:"https",
                hostname:"alvgwwzyjhakesbndxmy.supabase.co",
            },
        ],
    },
    async headers(){
        return [
            {
                source:"/embed",
                headers:[
                    {
                        key:"Content-Security-Policy",
                        value:"frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
                    }
                ]
            }
        ]
    }
};

export default nextConfig;
