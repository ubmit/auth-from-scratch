import { Hono } from 'hono'
import { methodOverride } from 'hono/method-override'
import { sleep } from 'bun'

import { db } from './db'

import { Home } from './pages/home'
import { Login } from './pages/login'

const app = new Hono()

let isLoggedIn = false

app.get('/', (c) => {
  return c.html(<Home user={isLoggedIn} />)
})

app.get('/login', (c) => {
  return c.html(<Login />)
})

app.use('/session', methodOverride({ app, query: '_method' }))

app.post('/session', async (c) => {
  const fd = await c.req.formData()
  console.log(fd)
  console.log({ username: fd.get('username'), password: fd.get('password') })
  console.log('Logging in...')
  sleep(1000)
  isLoggedIn = true
  console.log(`Logged in as ${fd.get('username')}`)
  return c.redirect('/')
})

app.delete('/session', async (c) => {
  console.log('Logging out...')
  sleep(1000)
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

  const query = db.prepare(
    'INSERT INTO users (username, password) VALUES ($username, $password)',
  )
  query.run(username, password)

  return c.redirect('/login')
})

export default app
