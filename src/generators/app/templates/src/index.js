import postcss from 'postcss';

// eslint-disable-next-line no-unused-vars
module.exports = postcss.plugin('postcss-dev', opts => {
    // eslint-disable-next-line no-unused-vars
    opts = opts || {};

    // eslint-disable-next-line no-unused-vars
    return function (root, result) {
        root.walkDecls(decl => {
            // Sample ->
            if (decl.prop === 'colorize') {
                decl.prop = 'color';
            }
            // <- Sample (Remove it a let's code)
        });
    };
});
