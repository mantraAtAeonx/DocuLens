import { apiConnector } from "@/services/apiConnector";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export function SignUp() {
  const navigate = useNavigate();
  const [registerCreds, setRegisterCreds] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [isTnCChecked, setIsTnCChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterCreds((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isTnCChecked) {
      return toast("Please Agree Terms and Conditions.");
    }
    await apiConnector("POST", "/register", registerCreds)
      .then((res) => {
        toast.success(res.message);
        navigate("/auth/sign-in");
      })
      .catch((error) => {
        toast.error(error.response.data.detail);
      });
  };
  return (
    <section className="flex">
      <div className="w-full lg:w-7/12 mx-auto mt-24 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Join Us Today
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your details below to register.
          </Typography>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
        >
          <div className="mb-1 flex flex-col gap-3">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Full Name
            </Typography>
            <Input
              size="lg"
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleChange}
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Email Address
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              type="email"
              name="email"
              id="email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleChange}
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Phone No.
            </Typography>
            <Input
              size="lg"
              placeholder="9898989898"
              type="tel"
              name="phone"
              maxLength={10}
              id="phone"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleChange}
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Create Password
            </Typography>
            <Input
              size="lg"
              placeholder="*************"
              type="password"
              name="password"
              id="password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleChange}
            />
          </div>
          <Checkbox
            checked={isTnCChecked}
            onChange={() => setIsTnCChecked((prev) => !prev)}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type="submit" className="mt-6" fullWidth>
            Register Now
          </Button>
          <Typography
            variant="paragraph"
            className="text-center text-blue-gray-500 font-medium mt-4"
          >
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">
              Sign in
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
