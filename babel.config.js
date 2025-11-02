module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    'react-native-worklets/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          'moti/skeleton': 'moti/skeleton/react-native-linear-gradient',
          test: './__tests__',
          '@': './src',
        },
      },
    ],
  ],
};
