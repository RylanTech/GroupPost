import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./components/Account";
import CreateAccount from "./components/CreateAccount";
import EditAccount from "./components/EditAccount";
import EditPost from "./components/EditPost";
import Home from "./components/Home";
import Post from "./components/Posts";
import SignIn from "./components/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}>
          <Route index element={<Post/>}/>
          <Route path="/account/:id" element={<Account/>}/>
          <Route path="/account/edit/:id" element={<EditAccount/>}/>
          <Route path="/login" element={<SignIn/>}/>
          <Route path="/createaccount" element={<CreateAccount/>}/>
          <Route path="/post/edit/:id" element={<EditPost/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;