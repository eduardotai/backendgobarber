import { Router } from 'express'
import appointsmentsRouter from '../../../../modules/appointments/infra/http/routes/appointments.router'
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes'

import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.routes'

const routes = Router()

routes.use('/appointments', appointsmentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)



export default routes