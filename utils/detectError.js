module.exports.detectError = func => {
    return (req, res, next) => {
        func(req, res, next).catch(e => next(e)) // or can be written as .catch(next)
    }
}