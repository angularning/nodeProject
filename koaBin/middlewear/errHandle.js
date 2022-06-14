module.exports = (ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                error: 'token过期',
            };
        } else {
            throw err;
        }
    });
}
