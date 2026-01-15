/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /node_modules\/.*\.test\.js$/,
      use: 'null-loader',
    })

    config.resolve.alias['tap'] = false

    return config
  },
}

module.exports = nextConfig
