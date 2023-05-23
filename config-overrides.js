const webpack = require("webpack");
const path = require("path");
const { addBabelPlugin } = require("customize-cra");

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  const webconfig = {
    ...config,
    resolve: {
      ...config.resolve,
      mainFields: ["main:h5", "browser", "module", "jsnext:main", "main"],
      alias: {
        ...config.resolve.alias,
        "@tarojs/taro": "@tarojs/taro-h5",
        // Note: 3.6 之前，请使用 '@tarojs/components$': '@tarojs/components/dist-h5/react',
        ["@tarojs/components$"]: "@tarojs/components/lib/react",
      },
    },
    plugins: [
      ...config.plugins,
      new webpack.DefinePlugin({
        "process.env.TARO_ENV": JSON.stringify("h5"),
        ENABLE_INNER_HTML: JSON.stringify(false),
        ENABLE_ADJACENT_HTML: JSON.stringify(false),
        ENABLE_SIZE_APIS: JSON.stringify(false),
        ENABLE_TEMPLATE_CONTENT: JSON.stringify(false),
        ENABLE_CLONE_NODE: JSON.stringify(false),
        ENABLE_CONTAINS: JSON.stringify(false),
        ENABLE_MUTATION_OBSERVER: JSON.stringify(false),
        DEPRECATED_ADAPTER_COMPONENT: JSON.stringify(false),
      }),
    ],
  };
  config = addBabelPlugin([
    require("babel-plugin-transform-taroapi").default,
    // {
    //   apis: require(require.resolve("@tarojs/taro-h5/dist/taroApis", {
    //     basedir: path.resolve(__dirname, ".."),
    //   })),
    //   packageName: "@tarojs/taro",
    // },
  ])(webconfig);
  return config;
};

/**
 * babel: (options) => ({
    ...options,
    plugins: [
      ...options.plugins,
      [
        require('babel-plugin-transform-taroapi').default,
        {
          apis: require(require.resolve('@tarojs/taro-h5/dist/taroApis', { basedir: path.resolve(__dirname, '..') })),
          packageName: '@tarojs/taro',
        },
      ],
    ],
  }),
 */
