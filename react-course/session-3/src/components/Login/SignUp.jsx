const SignUp = () => {
  return (
    <div className="login-background">
      <div className="login-container">
        <picture>
          <img src="dashboard-logo.svg" alt="Dashboard Kit" />
        </picture>
        <p>Dashboard Kit</p>
        <div className="title">
          <p>Log In to Dashboard Kit</p>
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
          </form>
        </div>
      </div>
    </div>
  );
};
