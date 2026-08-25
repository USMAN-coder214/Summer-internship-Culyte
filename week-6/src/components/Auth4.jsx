import { useAuthStore } from "../store/useAuthStore";

function Auth() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h2>You are logged in ✅</h2>

          <button onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <h2>You are logged out ❌</h2>

          <button onClick={login}>
            Login
          </button>
        </>
      )}
    </div>
  );
}

export default Auth;