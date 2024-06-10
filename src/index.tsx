import { Hono } from "hono";
import { methodOverride } from "hono/method-override";

import { Home } from "./pages/home";
import { Login } from "./pages/login";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

const app = new Hono();

let isLoggedIn = false;

app.get("/", (c) => {
  return c.html(<Home user={isLoggedIn} />);
});

app.get("/login", (c) => {
  return c.html(<Login />);
});

app.use("/session", methodOverride({ app }));

app.post("/session", async (c) => {
  const fd = await c.req.formData();
  console.log({ username: fd.get("username"), password: fd.get("password") });
  console.log("Logging in...");
  await sleep(1000);
  isLoggedIn = true;
  console.log(`Logged in as ${fd.get("username")}`);
  return c.redirect("/");
});

app.delete("/session", async (c) => {
  console.log("Logging out...");
  await sleep(1000);
  isLoggedIn = false;
  console.log("User is now logged out");
  return c.redirect("/");
});

export default app;
