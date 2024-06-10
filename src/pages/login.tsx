import { Layout } from '../components/layout'

export function Login() {
  return (
    <Layout>
      <h1>Login</h1>
      <form
        action="/session"
        method="post"
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

        <button style={{ width: 80 }}>Login</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </Layout>
  )
}
