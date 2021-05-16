import React from "react";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import { TextField, Button } from "@material-ui/core";
import { getUserByIdentifierAndPassword } from "../api/Api";

class SignIn extends React.Component {
  //initialize variables
  constructor(props) {
    super(props);
    this.state = { dataSource: [], identifier: "", passwd: "" };
  }

  //Update variables when changed
  updateIdentifier = (event) => {
    this.setState({ identifier: event.target.value });
  };

  updatePasswd = (event) => {
    this.setState({ passwd: event.target.value });
  };

  /*
    //Set the User data from API to Session to use it in another page
    setUserSession = async (value, pswd) => {
      try {
        AsyncStorage.clear();
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("user", jsonValue);
        const jsonValuePswd = JSON.stringify(pswd);
        await AsyncStorage.setItem("pswd", jsonValuePswd);
      } catch (e) {
        console.log(e);
      }
    };
  */
  //Function to connect the User
  getUser = () => {
    try {
      //Checking the accuracy of the information
      const identifier = this.state.identifier;
      const passwd = this.state.passwd;
      if (identifier && passwd) {
        //Crypt password
        //Call the API with parameters to check if the information are correct
        getUserByIdentifierAndPassword(identifier, passwd)
          .then((data) => {
            this.setState({ dataSource: data });
            if (this.state.dataSource) {
              //Call the UserSession function
              //Go to the Home page
              localStorage.setItem(
                "user",
                JSON.stringify(this.state.dataSource)
              );
              this.props.history.push("/");
            }
          })
          .catch(() => alert("Votre mail ou mot de passe est invalide"));
      } else if (passwd === "" && identifier) {
        alert("Veuillez insérer votre mot de passe.");
      } else if (identifier === "" && passwd) {
        alert("Veuillez insérer votre mail.");
      } else {
        alert("Veuillez renseigner toutes les informations.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <>
        {" "}
        <div className="form_signin">
          <Navigation />
          <Logo />
          <div class="form-group col-md-6">
            <label>Identifier</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="name"
              value={this.state.identifier}
              onChange={this.updateIdentifier}
              required
            />
          </div>

          <div class="form-group col-md-6">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              name="name"
              id="name"
              value={this.state.passwd}
              onChange={this.updatePasswd}
              required
            />
          </div>
          <div className="button_signin">
            <button
              type="submit"
              className="btnupload btn btn-dark btn-lg btn-block"
              onClick={() => this.getUser()}
            >
              <span>Connexion </span>
              <i class="fal fa-sign-in-alt"></i>
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default SignIn;
