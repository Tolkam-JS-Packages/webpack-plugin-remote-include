Object.defineProperty(exports, "__esModule", { value: true });
var download = require('download');
var RemoteIncludePlugin = /** @class */ (function () {
    function RemoteIncludePlugin(options) {
        this.options = [];
        this.options = options instanceof Array
            ? options
            : [options];
    }
    /**
     * @param compiler
     */
    RemoteIncludePlugin.prototype.apply = function (compiler) {
        var _this = this;
        compiler.hooks.emit.tapAsync({ name: 'RemoteIncludePlugin', context: true }, function (context, compilation, callback) {
            var count = _this.options.length;
            var downloadFiles = function (option) {
                download(option.url).then(function (data) {
                    compilation.assets[option.filepath] = {
                        size: function () { return data.length; },
                        source: function () { return data; }
                    };
                    count--;
                    if (count === 0) {
                        callback();
                    }
                }).catch(function (error) {
                    compilation.errors.push(new Error(error));
                    callback();
                });
            };
            _this.options.forEach(downloadFiles);
        });
    };
    return RemoteIncludePlugin;
}());
module.exports = RemoteIncludePlugin;
