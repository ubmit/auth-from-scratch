import { db } from '.'

const USERS = [
  { $username: 'pat', $password: '123' },
  { $username: 'gui', $password: '456' },
]

db.run(
  'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)',
)

const insertUser = db.prepare(
  'INSERT INTO users (username, password) VALUES ($username, $password)',
)

const insertUsers = db.transaction((users) => {
  for (const user of users) {
    insertUser.run(user.$username, user.$password)
  }
})

insertUsers(USERS)
