export default function Login() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        width: "40%",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <header>
        <h1>Welcome Back</h1>
      </header>

      <section
        aria-labelledby="login-heading"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "40%",
          alignItems: "center",
        }}
      >
        <h2 id="login-heading">Login</h2>

        <form>
          <fieldset>
            <legend>Login Information</legend>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />

              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit" className="btn">Login</button>
          </fieldset>
        </form>
      </section>

      <footer>
        <p>
          Don&apos;t have an account? <a href="/signup">Signup here</a>
        </p>
      </footer>
    </main>
  );
}
