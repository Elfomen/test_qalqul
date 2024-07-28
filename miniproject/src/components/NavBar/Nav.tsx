import { Avatar, Stack } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { appRoutes } from "../../routes";
import "./nav.css";
const Nav = () => {
  return (
    <>
      <header className=" flex flex-row items-center bg-primary p-2 mainAppHeaderContainer">
        <div className="flex-1">
          <Stack direction="row" alignItems={"center"} gap={5}>
            <img src={Logo} style={{ width: "53px", height: "49px" }} />

            <Link to={appRoutes.home} className=" text-white font-semibold">
              Home
            </Link>
          </Stack>
        </div>
        <Avatar />
      </header>

      <Outlet />
    </>
  );
};

export default Nav;
