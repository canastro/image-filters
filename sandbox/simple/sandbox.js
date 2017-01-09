var ImageFilter = require('../../src/index');

window.onload = function () {
    new ImageFilter({
        url: 'dummy.jpg'
    })
        .brightness({ adjustment: 10})
        .colorize({ color: '#000000', level: 50 })
        .sepia()
        .append('#target-1');
};
