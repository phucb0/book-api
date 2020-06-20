exports.sum = function (a, b) {
    return async (req, res, next) => {
        console.log(a + b)
    }
}