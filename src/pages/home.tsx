import { Layout } from "../components/layout";

export function Home({ user }: { user: boolean }) {
  return (
    <Layout>
      <h1>Auth from scratch</h1>
      {user ? (
        <>
          <form action="/session" method="post">
            <button name="intent" value="delete">
              Logout
            </button>
          </form>
        </>
      ) : (
        <button>
          <a href="/login">Go to login</a>
        </button>
      )}
    </Layout>
  );
}
