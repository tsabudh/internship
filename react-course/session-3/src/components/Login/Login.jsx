import "./login.scss";

const Login = () => {
  return (
    <div className="login-background">
      <div className="login-container">
        <picture>
          <img src="dashboard-logo.svg" alt="Dashboard Kit" />
        </picture>
        <p>Dashboard Kit</p>
        <div className="title">
          <p>Log In to Dashboard Kit</p>
        </div>

        <p>Enter your email and password below </p>
        <form action="">
          <div className="input_group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email address" />
          </div>

          <div className="input_group">
            <label htmlFor="password">
              Password <span class="forgot-password">Forgot password?</span>
            </label>
            <input type="password" id="password" placeholder="Password" />
          </div>
          <div className="input_group remember-me">
            <input type="checkbox" id="remember-me" />
            <label className="inline-block" htmlFor="remember-me">
              Remember me
            </label>
          </div>

          <button type="submit">Login</button>
          <p>
            Don't have an account? <a href="">Sign up</a>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
