import { Hono } from 'hono'
import { methodOverride } from 'hono/method-override'

import { authenticateUser, createUser, getAllUsers } from '@/db/models/user'

import { Home } from '@/pages/home'
import { Login } from '@/pages/login'
import { Signup } from '@/pages/signup'

const app = new Hono()

let isLoggedIn = false

app.get('/', (c) => {
  return c.html(<Home user={isLoggedIn} />)
})

app.get('/login', (c) => {
  return c.html(<Login />)
})

app.get('/signup', (c) => {
  return c.html(<Signup />)
})

app.use('/session', methodOverride({ app, query: '_method' }))

app.post('/session', async (c) => {
  const fd = await c.req.formData()
  const username = String(fd.get('username'))
  const password = String(fd.get('password'))

  try {
    await authenticateUser({ username, password })
    console.log('Logging in...')
    isLoggedIn = true
    console.log('User is logged in')
    return c.redirect('/')
  } catch (e) {
    if (e instanceof Error) {
      return c.json({ error: e.message }, 400)
    }
  }
})

app.delete('/session', async (c) => {
  console.log('Logging out...')
  isLoggedIn = false
  console.log('User is now logged out')
  return c.redirect('/')
})

app.get('/users', (c) => {
  const users = getAllUsers()
  return c.json(users)
})

app.post('/users', async (c) => {
  const fd = await c.req.formData()
  const username = String(fd.get('username'))
  const password = String(fd.get('password'))

  try {
    await createUser({ username, password })
    return c.redirect('/login')
  } catch (e) {
    if (e instanceof Error) {
      return c.json({ error: e.message }, 400)
    }
  }
})

export default app
