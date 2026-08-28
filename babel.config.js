module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        [
          'module-resolver',
          {
            root: ['./src'],
            alias: {
              '@styles': './src/styles',
              '@components': './src/components',
              '@screens': './src/screens',
              '@navigation': './src/navigation',
            },
          },
        ],
      ],
    };
  };
  