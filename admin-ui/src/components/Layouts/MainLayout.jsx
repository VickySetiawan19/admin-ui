import React, { useContext, useState } from "react";
import Logo from "../Elements/Logo";
import Input from "../Elements/Input";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FlareIcon from "@mui/icons-material/Flare";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Icon from "../Elements/Icon";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";
import { AuthContext } from "../../context/authContext";
import { logoutService } from "../../services/authService";
import LoadingBackdrop from "../Elements/LoadingBackdrop";

function MainLayout(props) {
  const { children } = props;

  const themes = [
    { name: "theme-green", bgcolor: "bg-[#299D91]", color: "#299D91" },
    { name: "theme-blue", bgcolor: "bg-[#1E90FF]", color: "#1E90FF" },
    { name: "theme-purple", bgcolor: "bg-[#6A5ACD]", color: "#6A5ACD" },
    { name: "theme-pink", bgcolor: "bg-[#DB7093]", color: "#DB7093" },
    { name: "theme-brown", bgcolor: "bg-[#8B4513]", color: "#8B4513" },
  ];

  const { user, logout, isLoggingOut } = useContext(AuthContext);
  const handleLogout = async () => {
    logout();
    try {
      await logoutService();
    } catch (err) {
      console.error(err);
      if (err.status === 401) {
        logout();
      }
    }
  };

  const { theme, setTheme, isDarkMode, toggleDarkMode } =
    useContext(ThemeContext);

  const menu = [
    { id: 1, name: "Overview", icon: <Icon.Overview />, link: "/" },
    { id: 2, name: "Balances", icon: <Icon.Balance />, link: "/balance" },
    {
      id: 3,
      name: "Transaction",
      icon: <Icon.Transaction />,
      link: "/transaction",
    },
    { id: 4, name: "Bills", icon: <Icon.Bill />, link: "/bill" },
    { id: 5, name: "Expenses", icon: <Icon.Expense />, link: "/expense" },
    { id: 6, name: "Goals", icon: <Icon.Goal />, link: "/goal" },
    { id: 7, name: "Settings", icon: <Icon.Setting />, link: "/setting" },
  ];

  return (
    <>
      <div
        className={`flex min-h-screen ${theme.name} bg-special-mainBg text-defaultBlack transition-colors duration-300`}
      >
        <aside className="bg-sidebar-bg w-28 sm:w-64 text-special-bg2 flex flex-col justify-between px-7 py-12">
          <div>
            <div className="mb-10">
              <Logo variant="secondary" />
            </div>
            <nav>
              {menu.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.link}
                  className={({ isActive }) =>
                    `flex px-4 py-3 rounded-md hover:text-white hover:font-bold hover:scale-105 ${
                      isActive
                        ? "bg-primary text-white font-bold"
                        : "hover:bg-special-bg3"
                    }`
                  }
                >
                  <div className="mx-auto sm:mx-0">{item.icon}</div>
                  <div className="ms-3 hidden sm:block">{item.name}</div>
                </NavLink>
              ))}
            </nav>
          </div>
          <div>
            <div>
              Themes
              {/* Container flex ini menampung lingkaran/kotak warna DAN tombol toggle */}
              <div className="flex flex-row gap-2 items-center my-2 flex-wrap sm:flex-nowrap">
                {/* Pilihan Warna Tema */}
                {themes.map((t) => (
                  <div
                    key={t.name}
                    className={`${t.bgcolor} w-6 h-6 rounded-md cursor-pointer transition-transform hover:scale-110`}
                    onClick={() => setTheme(t)}
                  ></div>
                ))}

                {/* Tombol Toggle yang Berjejer di Sebelah Kanan */}
                <div
                  onClick={toggleDarkMode}
                  className="w-6 h-6 rounded-md cursor-pointer flex items-center justify-center"
                  title={
                    isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                  }
                >
                  {isDarkMode ? (
                    <FlareIcon
                      sx={{ fontSize: 16 }}
                      className="text-gray-400"
                    />
                  ) : (
                    <DarkModeOutlinedIcon
                      sx={{ fontSize: 16 }}
                      className="text-gray-400"
                    />
                  )}
                </div>
              </div>
            </div>
            <div onClick={handleLogout} className="cursor-pointer">
              <div className="flex bg-special-bg3 text-[#ffffff] px-4 py-3 rounded-md">
                <div className="mx-auto sm:mx-0 text-primary">
                  <Icon.Logout />
                </div>
                <div className="ms-3 hidden sm:block">Logout</div>
              </div>
            </div>
            <div className="border my-10 border-b-special-bg"></div>
            <div className="flex justify-between items-center">
              <div><AccountCircleIcon fontSize="large" /></div>
              <div className="hidden sm:block">
                <div className="">{user.name}</div>
                <div className="">View Profile</div>
              </div>
              <div className="hidden sm:block">
                <Icon.Detail size={15} />
              </div>
            </div>
          </div>
        </aside>
        <div className="flex-1 flex flex-col bg-special-mainBg">
          <header className="border-b border-gray-05 px-6 py-7 flex justify-between items-center">
            <div className="flex items-center">
              <div className="font-bold text-2xl me-6">{user.name}</div>
              <div className="text-gray-03 flex">
                <Icon.ChevronRight size={20} />
                <span>May 19, 2023</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="me-10">
                <NotificationsIcon className="text-primary scale-110" />
              </div>
              <Input backgroundColor="bg-white" border="border-white" />
            </div>
          </header>
          <main className="flex-1 px-6 py-4">{children}</main>
        </div>
      </div>
      <LoadingBackdrop open={isLoggingOut} message="Logging Out" />
    </>
  );
}

export default MainLayout;