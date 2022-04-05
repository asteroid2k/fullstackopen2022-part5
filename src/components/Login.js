import { useState } from 'react';

const Login = ({ handleSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const clearForm = () => {
    setUsername('');
    setPassword('');
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({ username, password });
        clearForm();
      }}
    >
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={({ target }) => {
            setUsername(target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};
export default Login;
