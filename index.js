var postcss = require('postcss');

module.exports = postcss.plugin('postcss-prepend-selector', function (opts) {
    opts = opts || {};
    return function (css) {
        css.walkRules(function (rule) {
            rule.selector = opts.selector + rule.selector;
        });
    };
});
