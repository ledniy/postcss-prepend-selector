var postcss = require('postcss');

module.exports = postcss.plugin('prepend-selector-postcss', function (opts) {

    opts = opts || {};
    opts.exclude = !opts.exclude ? null : opts.exclude;
    opts.excludePart = !opts.excludePart ? null : opts.excludePart;
    return function (css) {
        css.walkRules(function (rule) {
            rule.selectors = rule.selectors.map(function (selector) {
                if(/^([0-9]*[.])?[0-9]+\%$|^from$|^to$/.test(selector)) {
                    // This is part of a keyframe
                    return selector;
                }

                if(selector.startsWith(opts.selector.trim())) {
                    return selector;
                }
                /** FileFabrik change have ignores
                 * exclude: ['#exc '],
                 **/
                if(opts.exclude && Array.isArray(opts.exclude)) {
                    /** append the space after because of full term **/
                    const s = selector.split(' ')[0] + ' ';
                    if(opts.exclude.indexOf(s) !== -1) {
                        return selector;
                    }
                }
                /** FileFabrik change have ignores    excludePart: ['.grid'] **/
                if(opts.excludePart && Array.isArray(opts.excludePart)) {
                    let found = false;
                    opts.excludePart.forEach(function (excludePart) {
                        if(selector.startsWith(excludePart))
                            found = true;
                        return found;
                    });
                    if(found)
                        return selector;
                }

                return opts.selector + selector;
            });
        });
    };
});
