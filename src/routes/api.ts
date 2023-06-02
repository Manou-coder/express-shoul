import { Router } from 'express'
import jetValidator from 'jet-validator'

import Paths from './constants/Paths'
// import User from '@src/models/User'
// import UserRoutes from './UserRoutes'
import ZmanimRoutes from './ZmanimRoutes'

// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator()

// ** Add ZmanimRouter ** //

const zmanimRouter = Router()

// Get Zmanei Ayom
zmanimRouter.get(Paths.Zmanim.Get, ZmanimRoutes.getAll)

// Add one user
// zmanimRouter.post(
//   Paths.Users.Add,
//   validate(['user', User.isUser]),
//   UserRoutes.add
// )

// Add zmanimRouter
apiRouter.use(Paths.Zmanim.Base, zmanimRouter)

// **** Export default **** //

export default apiRouter
