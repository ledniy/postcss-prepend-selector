import postcss from 'postcss';
import test from 'ava';

import plugin from './';

function run(t, input, output, opts = {}) {
    return postcss([plugin(opts)]).process(input)
        .then(result => {
            t.is(result.css, output);
            t.is(result.warnings().length, 0);
        });
}

const selector = '.selector ';

test('Prepend selector', t =>
  run(t, 'a{ }', '.selector a{ }', { selector })
);

test('Prepend selectors', t =>
  run(t, 'a, .example{ }', '.selector a, .selector .example{ }', { selector })
);

test('Should not prepend if class is already there', t =>
  run(t, '.selector.example{ }', '.selector.example{ }', { selector })
);

test('Skip keyframe rules', t =>
  run(t, '0%, from {} 100%, to {}', '0%, from {} 100%, to {}', { selector })
);
