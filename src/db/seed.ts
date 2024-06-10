import { password } from 'bun'
import { db } from '.'

async function getInitialUsers() {
  return [
    { $username: 'pat', $password: await password.hash('123') },
    { $username: 'gui', $password: await password.hash('456') },
  ]
}

db.exec(
  'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)',
)

getInitialUsers().then((users) => {
  const insertUser = db.prepare(
    'INSERT INTO users (username, password) VALUES ($username, $password)',
  )
  const insertUsers = db.transaction((users) => {
    for (const user of users) {
      insertUser.run(user)
    }
  })

  insertUsers(users)
})
