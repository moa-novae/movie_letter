const nextConfig = {
  webpack: (config, { isServer }) => {
    // Allows to prevent crashes on server with EUi
    if (isServer) {
      config.externals = config.externals.map((fn) => {
        return (context, request, callback) => {
          if (
            request.indexOf("@elastic/eui") > -1 ||
            request.indexOf("react-ace") > -1
          ) {
            return callback();
          }

          return fn(context, request, callback);
        };
      });

      // Mock react-ace server-side
      config.module.rules.push({
        test: /react-ace/,
        use: "null-loader",
      });
      config.module.rules.push({
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: "url-loader?limit=100000",
      });

      // Mock HTMLElement and window server-side
      let definePluginId = config.plugins.findIndex(
        (p) => p.constructor.name === "DefinePlugin"
      );
      config.plugins[definePluginId].definitions = {
        ...config.plugins[definePluginId].definitions,
        HTMLElement: function () {},
        window: function () {},
      };
    }

    return config;
  },
};
module.exports = nextConfig;

