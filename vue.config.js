module.exports = {
    devServer: {
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://' + process.env.VUE_APP_SERVICE_URL,
            },
        },
    },
};
