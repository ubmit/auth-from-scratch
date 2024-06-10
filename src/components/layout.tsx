import { PropsWithChildren } from 'hono/jsx'

export function Layout({ children }: PropsWithChildren) {
  return (
    <html>
      <body
        style={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </body>
    </html>
  )
}
