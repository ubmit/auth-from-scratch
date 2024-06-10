import { Hono } from 'hono'
import { methodOverride } from 'hono/method-override'

import { db } from './db'

import { Home } from './pages/home'
import { Login } from './pages/login'
import { Signup } from './pages/signup'

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
  console.log(fd)
  console.log({ username: fd.get('username'), password: fd.get('password') })
  console.log('Logging in...')
  isLoggedIn = true
  console.log(`Logged in as ${fd.get('username')}`)
  return c.redirect('/')
})

app.delete('/session', async (c) => {
  console.log('Logging out...')
  isLoggedIn = false
  console.log('User is now logged out')
  return c.redirect('/')
})

app.get('/users', (c) => {
  const query = db.query('SELECT * FROM users')
  const users = query.all()
  return c.json(users)
})

app.post('/users', async (c) => {
  const fd = await c.req.formData()
  const username = String(fd.get('username'))
  const password = String(fd.get('password'))

  try {
    const hashedPassword = await Bun.password.hash(password)
    const query = db.prepare(
      'INSERT INTO users (username, password) VALUES ($username, $password)',
    )
    query.run(username, hashedPassword)
  } catch (e) {
    return c.json({ error: 'User was not created' }, 400)
  }

  return c.redirect('/login')
})

export default app
