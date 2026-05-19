import { Router } from 'express'
import controller from './controller'
import authenticate from '../../middlewares/authenticate'

const router = Router()

// Crucial: we mount the authenticate middleware here so ALL todo routes mandate a valid cookie/session!
router.use(authenticate)

router.route('/')
    .post(controller.create)
    .get(controller.getAll)

router.route('/:id')
    .patch(controller.update)
    .delete(controller.delete)

export default router
