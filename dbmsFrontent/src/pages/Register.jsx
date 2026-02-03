function Register() {
  return (
    <div className="box">
      <h2>Register</h2>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="text" placeholder="Department" />
      <input type="password" placeholder="Password" />
      <button
      onClick={
        () => {
          alert("Registration functionality is not implemented yet.");
          homepage();
        }
      }
      >Register</button>
    </div>
  );
}

export default Register;
