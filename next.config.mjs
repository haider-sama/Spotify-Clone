/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mavlxqefwackmbxzvqlm.supabase.co',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
