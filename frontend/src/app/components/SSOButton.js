const SSOButton = ({ isLoggedIn, onLogin, onLogout, userInfo }) => {
  return (
    <>
      {isLoggedIn ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          {userInfo && <p>Hello {userInfo.name || userInfo.email} !!</p>}
          <button onClick={onLogout}>Log Out</button>
        </div>
      ) : (
        <button onClick={onLogin}>Login</button>
      )}
    </>
  );
};

export default SSOButton;
