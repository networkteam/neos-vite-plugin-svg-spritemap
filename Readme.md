# @networkteam/vite-plugin-svg-sprites

This package generates a SVG spritemap from multiple .svg files. It is designed to be used with Vite and Neos CMS.

Difference to other vite spritemap plugins is that this one creates a spritemap-file in development mode as well to support static fusion rendering.

## Installation

    yarn add -D @networkteam/vite-plugin-svg-sprites

## Usage

Import the plugin in your Vite configuration:

```javascript
  import { NeosIconSpritePlugin } from '@networkteam/vite-plugin-svg-sprites';

  export default {
    plugins: [
      NeosIconSpritePlugin({
        basePackageName: 'Customer.Base', // required
        inputDir: 'Resources/Private/Icons', // optional, default value
        outputDir: 'Resources/Public/Dist', // optional, default value
        outputName: 'spritemap.svg', // optional, default value
        prefix: '', // optional
        disableSVGO: false, // optional
        svgoConfig: {}, // optional SVGO configuration
      }),
    ],
  };
```

## Configuration

* `basePackageName`: The name of your base package. This is a required option.
* `inputDir`: The directory where your SVG files are located. Default is 'Resources/Private/Icons'.
* `outputDir`: The directory where the spritemap will be saved. Default is 'Resources/Public/Dist'.
* `outputName`: The name of the output spritemap file. Default is 'spritemap.svg'.
* `prefix`: A prefix to be added to the id of each symbol in the spritemap. Default is an empty string.
* `disableSVGO`: Whether to disable SVGO optimization. Default is false.
* `svgoConfig`: Configuration options for SVGO. Default is an empty object.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
