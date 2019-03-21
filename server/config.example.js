module.exports = {
    PORT: process.env.PORT || 8000,

    /* The domain that this website is on */
    DEFAULT_DOMAIN: 'srtt.me',

    /* database credential details */
    MONGO_URL: process.env.MONGO_URL || 'mongodb_url',

    SENTRY_DSN: 'sentry_dns_link',

    /* Google reCaptcha key */
    RECAPTCHA_SECRET_KEY: 'google_recaptcha_secret',
};