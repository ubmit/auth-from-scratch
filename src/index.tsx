import { Hono } from "hono";
import { Home } from "./pages/home";
import { Login } from "./pages/login";

const app = new Hono();

let user = false;

app.get("/", (c) => {
  return c.html(<Home user={user} />);
});

app.get("/login", (c) => {
  return c.html(<Login />);
});

app.post("/session", async (c) => {
  const fd = await c.req.formData();

  // TODO: move this to DELETE /session
  if (fd.get("intent") === "delete") {
    console.log("Logging out...");
    user = false;
    console.log("User is now logged out");
    return c.redirect("/");
  }

  console.log({ username: fd.get("username"), password: fd.get("password") });
  console.log("Logging in...");
  user = true;
  console.log(`Logged in as ${fd.get("username")}`);
  return c.redirect("/");
});

export default app;
