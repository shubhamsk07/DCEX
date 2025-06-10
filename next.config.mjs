/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'upload.wikimedia.org', // Solana token image
            'lh3.googleusercontent.com', // Google profile pictures
            'encrypted-tbn0.gstatic.com', // Google image thumbnails
        ],
    },
};

export default nextConfig;