/*export default function Signup() {
  return (
    <main
      className="flex flex-col w-full"
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   width: "40%",
      //   alignItems: "center",
      //   alignSelf: "center",
      // }}
    >
      <header>
        <h1>Welcome Back</h1>
      </header>

      <section
        aria-labelledby="login-heading"
        className="flex flex-col w-3/6 place-content-center"
        style={
          {
            // display: "flex",
            // flexDirection: "column",
            // width: "40%",
            // alignItems: "center",
          }
        }
      >
        <h2 id="login-heading">Sign Up</h2>

        <form>
          <fieldset>
            <legend>Signup Information</legend>
            <div className="flex flex-col" >
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />

              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                required
              />

              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="123-456-7890"
                required
              />

              <label htmlFor="password">Password (8 characters minimum):</label>
              <input
                type="text"
                id="password"
                name="password"
                minLength={8}
                placeholder="Password"
                required
              />

              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
              />
            </div>
            <button type="submit" className="btn">
              Sign Up
            </button>
          </fieldset>
        </form>
      </section>

      <footer>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </footer>
    </main>
  );
}
*/
