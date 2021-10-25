# tolkam/webpack-plugin-remote-include

Plugin to include a remote js file into the output bundle.

## Usage

````js
const RemoteIncludePlugin = require('@tolkam/webpack-plugin-remote-include');

return {
    // ...
    plugins: [
        new RemoteIncludePlugin([{
            url: 'https://example.com/myFile.js',
            filepath: 'myFile.js',
        }]),
    ]
    // ...
}
````

## Documentation

The code is rather self-explanatory and API is intended to be as simple as possible. Please, read the sources/Docblock if you have any questions. See [Usage](#usage) for quick start.

## License

Proprietary / Unlicensed 🤷
