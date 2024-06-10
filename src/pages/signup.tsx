import { Layout } from '../components/layout'

export function Signup() {
  return (
    <Layout>
      <form
        action="/users"
        method="POST"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          maxWidth: 320,
        }}
      >
        <label for="username-input">Username</label>
        <input id="username-input" name="username" />

        <label for="password-input">Password</label>
        <input id="password-input" name="password" type="password" />

        <button style={{ width: 80 }}>Register</button>
      </form>
    </Layout>
  )
}
