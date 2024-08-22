import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import {
  HomeIcon,
  CircleStackIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Home, FileStorage } from "@/pages/dashboard";
import { useEffect, useState } from "react";

const icon = {
  className: "w-5 h-5 text-inherit",
};

const navItems = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <CircleStackIcon {...icon} />,
        name: "File Storage",
        path: "/file-storage",
        element: <FileStorage />,
      },
    ],
  },
];

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  ////////////////////////////////////////////////////////////////////////////////////

  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create a new WebSocket connection
    const ws = new WebSocket("ws://54.209.245.52:8000/ws?host=local");

    // Set the socket state
    setSocket(ws);

    // When the connection is open
    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      // ws.send("Hello from client!");
    };

    // When a message is received from the server
    ws.onmessage = (event) => {
      console.log("Message from server:", event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // When there's an error
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // When the connection is closed
    // ws.onclose = () => {
    //   console.log("WebSocket connection closed");
    // };
  }, []);

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className={`relative`}>
        <Link
          to="/"
          className="py-6 px-8 tracking-widest text-center flex items-center justify-center gap-2"
        >
          <img src={brandImg} alt="logo" className="w-10" />
          <Typography
            variant="h4"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            <span className="tracking-wider">{brandName}</span>
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {navItems.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color={
                        isActive
                          ? sidenavColor
                          : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                      }
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
        {/* <div>
          <h2>WebSocket Messages</h2>
          <button onClick={sendMessage}>Send Message</button>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div> */}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/public/logo/logo.jpeg",
  brandName: "DocuLens",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
