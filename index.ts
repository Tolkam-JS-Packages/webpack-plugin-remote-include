const download = require('download');
import { Compiler, Plugin } from 'webpack';

class RemoteIncludePlugin implements Plugin {

    protected options: IEntry[] = [];

    public constructor(options: IEntry|IEntry[]) {
        this.options = options instanceof Array
            ? options
            : [options];
    }

    /**
     * @param compiler
     */
    public apply(compiler: Compiler) {
        compiler.hooks.emit.tapAsync(
            {name: 'RemoteIncludePlugin', context: true},
            (context, compilation, callback) => {
                let count = this.options.length;
                const downloadFiles = (option: IEntry) => {

                    download(option.url).then((data: any) => {
                        compilation.assets[option.filepath] = {
                            size: () => data.length,
                            source: () => data
                        };

                        count--;

                        if (count === 0) {
                            callback();
                        }

                    }).catch((error: any) => {
                        compilation.errors.push(new Error(error));
                        callback();
                    });
                };

                this.options.forEach(downloadFiles);
            });
    }
}

interface IEntry {
    url: string;
    filepath: string;
}

module.exports = RemoteIncludePlugin;
