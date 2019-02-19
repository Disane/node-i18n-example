const i18n = require("i18n");

i18n.configure({
    locales:['en', 'de'],
    defaultLocale: 'en',
    // queryParameter: 'lang',
    directory: __dirname + '/locales',
    // sets a custom cookie name to parse locale settings from  - defaults to NULL
    cookie: 'lang'
});

module.exports = function(req, res, next) {
    i18n.init(req, res);
    res.local('__', res.__);

    var current_locale = i18n.getLocale();

    return next();
};