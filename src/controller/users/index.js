const customError = require('../../helper/customError')
const { signUpUserQuery, signInUserQuery } = require('../../database/query/users')
const {join} = require('path')
// const customError = require('../../helper/customError')
const { signUpSchema, signinSchema } = require('../../schema/users.schema')
const bcrypt = require('bcryptjs')
const signToken = require('../../helper/jwt')
const hashed = (password, callback) => {
  bcrypt.hash(password, 10, callback)
}
const signUp = (req, res) => {
  const { username, email, password, photo, date, country, role, phone, address } = req.body;
  const { error, value } = signUpSchema.validateAsync({ username, email, password, photo, date, country, role, phone, address }, { abortEarly: false })
  if (error) {
    return res.status(200).json({
      error: true,
      data: {
        errors: error.details
      }
    });

  }

  hashed(password, (err, result) => {
    signUpUserQuery({ username, email, password: result, photo, date, country, role, phone, address })
      .then(() => res.status(201).json({
        error: false,
        data: {
          data: 'your account has been created succssfully'
        }
      }))
      .catch((error) => {
        console.log(error);
        // next(error)
      })
  })

}

const signin = (req, res) => {
  const { username, password } = req.body;

  signinSchema.validateAsync({ username, password }, { abortEarly: false })
    .then((data) => signInUserQuery(data))
    .then(({ rows }) => {
      if (rows.length) {
        req.userId = rows[0].id
        return bcrypt.compare(password, rows[0].password)
      } else {
        throw customError(401, { msg: 'please create account first' })
      }
    })
    .then((isMatched) => {
      if (!isMatched) {
        throw customError(401, { msg: 'please enter correct password' })
      } else {
        return signToken(username, req.userId)
      }
    }).then((token) => {
      return res.cookie("token", token).end()
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status: error.status,
        massage: error.massage
      })
    })
}

const getSignUpPage = (req, res) =>{
  res.sendFile(join(__dirname, '../../../public/components/client/resgister.html'))
}


module.exports = { signUp, signin,getSignUpPage }