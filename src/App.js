import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import MyImages from "./pages/MyImages";
import SignOut from "./pages/SignOut";
import Upload from "./pages/Upload";
import FormKeyword from "./components/FormKeyword";
import Admin from "./pages/Admin";
import Image from "./pages/Image";
import ImageUpdate from "./pages/ImageUpdate";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/myimages" component={MyImages} />
        <Route path="/upload" component={Upload} />
        <Route path="/form" component={FormKeyword} />
        <Route path="/admin" component={Admin} />
        <Route path="/image" component={Image} />
        <Route path="/imagesettings" component={ImageUpdate} />
        <Route path="/signout" component={SignOut} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
