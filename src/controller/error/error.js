const path = require('path');

const clientError = (req, res) => {
    res
        .status(404)
        .sendFile(path.join(__dirname, '..', '..', '..', 'public', 'components', 'error', '404.html'));
};
const serverError = (err, req, res,next) => {
    if (err.status) {
        res.status(err.status).json({msg:err.msg})
    } else{
        res
            .status(500)
            .sendFile(path.join(__dirname, '..', '..', '..', 'public', 'components', 'error', '500.html'))
            // .json(err.detail);

    }
};
module.exports = { clientError, serverError };
