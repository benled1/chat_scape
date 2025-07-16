import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  transpilePackages: ['three'],
};
// this might be needed?
// const withTM = require('next-transpile-modules')(['three'])
// module.exports = withTM()

export default nextConfig;
