import { Button, Dropdown, Input, Loading, Typography } from "@web3uikit/core";

const SSOButton = ({ isLoggedIn, onLogin, onLogout, userInfo }) => {
  return (
    <>
      {isLoggedIn ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          {userInfo && <p>Hello {userInfo.name || userInfo.email} !!</p>}
          <Button
            style={{ width: "100%" }}
            theme="secondary"
            size="xl"
            text="Log out"
            onClick={onLogout}
          />
        </div>
      ) : (
        <Button
          style={{ width: "100%" }}
          theme="secondary"
          size="xl"
          text="Log in"
          onClick={onLogin}
        />
      )}
    </>
  );
};

export default SSOButton;
