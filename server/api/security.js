function checkParamIdWithUserId(req, res, next) {
  if (req.user && req.params.userId === req.user.id) {
    next()
  } else {
    res.status(401).send('Unauthorized: cannot access other accounts')
  }
}

function checkIsLoggedIn(req, res, next) {
  if (req.user) {
    next()
  } else {
    res.status(401).send('Unauthorized: must be logged in to have access')
  }
}

function checkIsAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res
      .status(401)
      .send('Unauthorized: user does not have administrative privileges')
  }
}

module.exports = {checkParamIdWithUserId, checkIsLoggedIn, checkIsAdmin}
