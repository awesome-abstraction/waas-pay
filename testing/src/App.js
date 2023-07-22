import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Wallet from "./pages/Wallet";
import { WithApolloClient } from "./apollo";

const App = () => {
  return (
    <WithApolloClient>
      <BrowserRouter>
        <PublicRoutes />
      </BrowserRouter>
    </WithApolloClient>
  );
};

const PublicRoutes = ({ children }) => {
  return (
    <Routes>
      <Route path="/landing" element={<Landing />} />
      <Route path="wallet/:uuid" element={<Wallet />} />
      <Route path="/" element={<Navigate to="/landing" />} />
      {children}
    </Routes>
  );
};

/*
const PrivateRoutes = ({ children }) => {
  return (
    <Routes>
      <Route path="/home" element={<div>Home</div>} />
      {children}
    </Routes>
  );
};
*/

export default App;
