import { password } from 'bun'

import { db } from '..'

type User = {
  id: number
  username: string
  password: string
}

type Credentials = Pick<User, 'username' | 'password'>

function getUserByUsername(username: User['username']) {
  const query = db.query('SELECT * FROM users WHERE username = $username')
  const user = query.get(username) as User | null
  return user
}

export function getAllUsers() {
  const query = db.query('SELECT * FROM users')
  const users = query.all() as User[]
  return users
}

export async function authenticateUser(credentials: Credentials) {
  const user = getUserByUsername(credentials.username)

  if (!user) {
    throw new Error('User not found')
  }

  const isMatch = await password.verify(credentials.password, user.password)

  if (!isMatch) {
    throw new Error('Invalid password')
  }
}

export async function createUser(credentials: Credentials) {
  const hashedPassword = await password.hash(credentials.password)
  const query = db.prepare(
    'INSERT INTO users (username, password) VALUES ($username, $password)',
  )
  query.run(credentials.username, hashedPassword)
}
