/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@huggingface/transformers', 'onnxruntime-web'],

  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      'onnxruntime-node$': false,
    };

    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    config.module.rules.push({
      test: /\.node$/,
      loader: 'null-loader',
    });

    config.ignoreWarnings = [
      {
        module: /onnxruntime-web/,
        message: /require function is used in a way/,
      },
    ];

    return config;
  },
};

export default nextConfig;
