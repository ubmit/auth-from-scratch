import { Layout } from '../components/layout'

export function Home({ user }: { user: boolean }) {
  return (
    <Layout>
      <h1>Auth from scratch</h1>
      {user ? (
        <form action="/session?_method=DELETE" method="POST">
          <button>Logout</button>
        </form>
      ) : (
        <button>
          <a href="/login">Go to login</a>
        </button>
      )}
    </Layout>
  )
}
