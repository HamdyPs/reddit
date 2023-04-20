const customError = require('../../helper/customError')
const { signUpUserQuery, signInUserQuery, getUserQuery, updateUserQuery, updatePasswordQuery } = require('../../database/query/users')
const { join } = require('path')
// const customError = require('../../helper/customError')
const { signUpSchema, signinSchema } = require('../../schema/users.schema')
const bcrypt = require('bcryptjs')
const signToken = require('../../helper/jwt')
const hashed = (password, callback) => {
  bcrypt.hash(password, 10, callback)
}
const signUp = (req, res) => {
  const { username, email, password, photo, date, country, phone, address } = req.body;
  const role = 'user'
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
          data: 'your account has been created succssfully, now u can logIn'
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
        throw customError(401, { msg: 'your password or username wrong' })
      }
    })
    .then((isMatched) => {
      if (!isMatched) {
        throw customError(401, { msg: 'your password or username wrong' })
      } else {
        return signToken(username, req.userId)
      }
    }).then((token) => {
      return res.status(200).cookie("token", token).json({
        message: token
      })
    })
    .catch((error) => {
      console.log(error, 'adfadfadf');
      res.json({
        status: error.status,
        massage: error.massage
      })
    })
}

const getSignUpPage = (req, res) => {
  res.sendFile(join(__dirname, '../../../public/components/client/resgister.html'))
}
const getProfilePage = (req, res) => {
  res.sendFile(join(__dirname, '../../../public/components/client/profile.html'))
}
const getSettingPage = (req, res) => {
  res.sendFile(join(__dirname, '../../../public/components/client/sitting.html'))
}
const getSubredditsPage = (req, res) => {
  res.sendFile(join(__dirname, '../../../public/components/client/subreddits.html'))
}
const getProfilesPage = (req, res) => {
  res.sendFile(join(__dirname, '../../../public/components/client/profiles.html'))
}

const getUserData = (req, res) => {
  const { user } = req;

  getUserQuery(user.providerID).then(data => res.status(200).json(data.rows))
}

const updateUserData = (req, res) => {
  const { username, email, photo, date, country, phone, address } = req.body;
  const { user } = req;
  updateUserQuery({ username, email, photo, date, country, phone, address }, user.providerID)
    .then(data => res.status(200).json('your data has been updated succssuflly brother'))
}
const updatePasswordUser = (req, res) => {
  const { password,newPassword } = req.body;
  const { user } = req;
  getUserQuery(user.providerID).then(data=>{
 bcrypt.compare(password,data.rows[0].password).then(isValidated=>{
  if(isValidated){
    hashed(newPassword,(err,result)=>{
      if(err){
        return
      }
      updatePasswordQuery(result,user.providerID).then(response=>{
        res.status(200).json('your password has been updated successfully')
      })
    })
  }
 })
    
  })
  
}


module.exports = { signUp, signin, getSignUpPage, getProfilePage,getProfilesPage, getUserData, getSettingPage, updateUserData,updatePasswordUser,getSubredditsPage }