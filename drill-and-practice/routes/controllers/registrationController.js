import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";

const registerUser = async ({ request, response, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;


  if (params.get("password") && params.get("password").length >= 4) {
    await userService.addUser(
        params.get("email"),
        await bcrypt.hash(params.get("password")),
      );
    response.redirect("/auth/login")
  } else {
    const errorData = {
        errors: "Password length should be at least 4 characters",
        email: params.get("email"),
    }
    render("register.eta", errorData)

  }
};

const showRegistrationForm = ({ render }) => {
  const data = {
    email: "",
  }
  render("register.eta", data);
};

export { registerUser, showRegistrationForm };