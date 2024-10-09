import OptimizeCSSAssetsPlugin  from "optimize-css-assets-webpack-plugin"
import CssMinimizerPlugin  from "css-minimizer-webpack-plugin"


 const nextConfig = {
  env: {
    customKey: 'http://localhost:3000',
  },
  reactStrictMode: true, // Show all warning for better production build
  swcMinify: true, // minify js file
  images: {
    domains:['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
    loader: 'default',
     remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true, // Enable img optimization
       
  },

  webpack: (
    config,
    {dev,isServer,defaultLoaders}
  ) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.mdx/,
      use: [
        defaultLoaders.babel, // Use default Babel loader
        {
          loader: "@mdx-js/loader",
          options: {
            // Specify any necessary options for the @mdx-js/loader
         
          },
        },
      ],
    });

    if (!dev && !isServer) {
      const optimization = {
        ...config.optimization,
        minimize: true,
        minimizer: [
          ...config.optimization.minimizer,
          new OptimizeCSSAssetsPlugin({
            cssProcessorPluginOptions: {
              preset: ["default", { discardComments: { removeAll: true } }], // minify css && scss file
            },
          }),
          new CssMinimizerPlugin(),
        ],
      };
      config.optimization = optimization;
    }
    return config;
  },
};

export default  nextConfig;
