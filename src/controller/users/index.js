const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signupQuery } = require("../../database/query/auth");
const { getUserByUsernameQuery, getUserByIdQuery, forgotPasswordQuery, getUserByEmailQuery, updateUserQuery, updatePasswordQuery, getUserQuestionsQuery } = require("../../database/query/users");

const signup = (req, res, next) => {
  const { username, email, password, photo, country, question, answer } = req.body;

  const hashPassword = bcrypt.hashSync(password, 10);

  const user = {
    username,
    email,
    password: hashPassword,
    photo,
    country,
    question,
    answer,
  };

  signupQuery(user)
    .then((data) => {
      return res.status(201).json({
        message: "User created successfully",
        user: data.rows[0],
      });
    })
    .catch((error) => {
      next(error);
    });
};

const signin = (req, res, next) => {
  const { username, password } = req.body;

  getUserByUsernameQuery({ username })
    .then((data) => {
      const user = data.rows[0];
      const isMatching = bcrypt.compareSync(password, user.password);

      if (isMatching) {
        const accessToken = jwt.sign(user.id, process.env.JWT_SECRET);

        return res.status(200).cookie("accessToken", accessToken).json({
          message: "User logged in successfully",
          user,
        });
      } else {
        return res.status(400).json({
          message: "Invalid username or password",
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};

const logOut = (req, res)=>{
  res.clearCookie("accessToken").json('you have logged out successfully')
}

const getUserData = (req, res, next) => {
  const { id } = req.user;
  console.log(req.user);
  getUserByIdQuery({ userId: id }).then((data) => {
    res.status(200).json({
      message: 'this is your data',
      data: data.rows[0]
    });
  })
    .catch((error) => next(error));
}

const updateUserData = (req, res, next) => {
  const { username, email, photo, country } = req.body;
  const { id } = req.user;
  console.log(id);
  updateUserQuery({ username, email, photo, country }, { userId: id })
    .then(data => res.status(200).json('your data has been updated succssuflly brother'))
    .catch(error => next(error))
}

const updatePasswordUser = (req, res, next) => {
  const { password, newPassword } = req.body;
  const { id } = req.user;


  getUserByIdQuery({ userId: id }).then(data => {
    bcrypt.compare(password, data.rows[0].password).then(isValidated => {

      if (isValidated) {
        const hashPassword = bcrypt.hashSync(newPassword, 10);
        updatePasswordQuery(hashPassword, { userId: id }).then(response => {
          res.status(200).json('your password has been updated successfully')
        })

      }
    })

  })
    .catch(error => next(error))

}

const forgotPassword = (req, res, next) => {
  const { email, question, answer, newPassword } = req.body
  getUserByEmailQuery(email).then(userData => {

    if (userData.rows[0].email === email) {
      if (userData.rows[0].answer === answer && userData.rows[0].question === question) {

        const hashPassword = bcrypt.hashSync(newPassword, 10);
        forgotPasswordQuery(hashPassword, email).then(response => res.status(200).json('your password has been updated succesfuly'))
      } else {
        return res.status(400).json('your answer is wrong')
      }
    }
  }).catch(err => next(err))

}

const getUserQuestions = (req, res) => {
  getUserQuestionsQuery().then(data => res.status(200).json({
    message: 'data recieved successfully',
    data: data.rows
  }))
}
module.exports = {
  signup,
  signin,
  logOut,
  getUserData,
  updateUserData,
  updatePasswordUser,
  forgotPassword,
  getUserQuestions,
};
