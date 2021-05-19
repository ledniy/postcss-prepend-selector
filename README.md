# PostCSS Prepend Selector

[PostCSS] plugin Prepend selector for each rule.

[PostCSS]: https://github.com/postcss/postcss

## Usage

### Prefix all

```js
// minimal example
postcss([require('prepend-selector-postcss')({
    selector: '.myPrefix '
})])
```

Original Css

```css
.foo {
    /* Input example */
}

.foo, .bar {
    /* Input example */
}

```

Result

```css
.myPrefix .foo {
    /* Output example */
}

.myPrefix .foo, .myPrefix .bar {
    /* Output example */
}
```

### Prefix all but exclude something

```js
// example with exclude
postcss([require('prepend-selector-postcss')({
    selector: '.myPrefix ',
    exclude : ['#living_id_prefix_to_prevent_from_prefixing ', '.living_classname_to_prevent_from_prefixing '],
})])
```

Original Css

```css
.foo {
    /* Input example */
}

.foo, .bar {
    /* Input example */
}

#living_id_prefix_to_prevent_from_prefixing {
    /* Input example */
}

.living_classname_to_prevent_from_prefixing {
    /* Input example */
}

.living_classname_to_prevent_from_prefixing .somethingSub {
    /* Input example */
}
```

Result

```css
.myPrefix .foo {
    /* Output example */
}

.myPrefix .foo, .myPrefix .bar {
    /* Output example */
}

/* not prefixed */
#living_id_prefix_to_prevent_from_prefixing {
    /* Input example */
}

/* not prefixed */
.living_classname_to_prevent_from_prefixing {
    /* Input example */
}

/* not prefixed */
.living_classname_to_prevent_from_prefixing .somethingSub {
    /* Input example */
}
```

### Prefix all but exclude Start-With

```js

// exclude everything which starts with ".grid"
// excludes .grid-x | .grid .mySubClass
postcss([require('prepend-selector-postcss')({
    selector   : '.myPrefix ',
    excludePart: ['.grid']
})])
```

Original Css

```css
.foo {
    /* Input example */
}

.foo, .bar {
    /* Input example */
}

.grid .padding {
    /* Input example */
}

.grid-x .cell {
    /* Input example */
}
```

Result

```css
.myPrefix .foo {
    /* Output example */
}

.myPrefix .foo, .myPrefix .bar {
    /* Output example */
}

/* not prefixed */
.grid .padding {
    /* Input example */
}

/* not prefixed */
.grid-x .cell {
    /* Input example */
}
```

### All together

```js
// Full example
postcss([require('prepend-selector-postcss')({
    selector   : '.myPrefix ',
    exclude    : ['#living_id_prefix_to_prevent_from_prefixing ', '.living_classname_to_prevent_from_prefixing '],
    excludePart: ['.grid']
})])
```

Original Css

```css
.foo {
    /* Input example */
}

.foo, .bar {
    /* Input example */
}

#living_id_prefix_to_prevent_from_prefixing {
    /* Input example */
}

.living_classname_to_prevent_from_prefixing {
    /* Input example */
}

.living_classname_to_prevent_from_prefixing .somethingSub {
    /* Input example */
}

.grid .padding {
    /* Input example */
}

.grid-x .cell {
    /* Input example */
}
```

Result

```css
.myPrefix .foo {
    /* Output example */
}

.myPrefix .foo, .myPrefix .bar {
    /* Output example */
}

/* not prefixed */
#living_id_prefix_to_prevent_from_prefixing {
    /* Input example */
}

/* not prefixed */
.living_classname_to_prevent_from_prefixing {
    /* Input example */
}

/* not prefixed */
.living_classname_to_prevent_from_prefixing .somethingSub {
    /* Input example */
}

/* not prefixed */
.grid .padding {
    /* Input example */
}

/* not prefixed */
.grid-x .cell {
    /* Input example */
}
```

### Note

Please do not forget "selector" and "exclude" the space at the end of the string. exclude and excludePart are not tested. feel free to fork.

See [PostCSS] docs for examples for your environment.

### Forked from

https://github.com/ledniy/postcss-prepend-selector
