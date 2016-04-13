import postcss from 'postcss';
import test from 'ava';

import plugin from './';

function run(t, input, output, opts = {}) {
    return postcss([plugin(opts)]).process(input)
        .then(result => {
            t.same(result.css, output);
            t.same(result.warnings().length, 0);
        });
}

test('Prepend selector', t => {
    return run(t, 'a{ }', '.selector a{ }', {
        selector: '.selector '
    });
});

test('Prepend selectors', t => {
    return run(t, 'a, .example{ }', '.selector a, .selector .example{ }', {
        selector: '.selector '
    });
});

test('Skip keyframe rules', t => {
    return run(t, '0%, from {} 100%, to {}', '0%, from {} 100%, to {}', {
        selector: '.selector '
    });
});
