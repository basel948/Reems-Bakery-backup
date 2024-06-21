import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { RxHamburgerMenu, RxBarChart } from "react-icons/rx";
import { MdRestaurantMenu } from "react-icons/md";

import {
  LuLayoutDashboard,
  LuUsers,
  LuPieChart,
  LuLogOut,
  LuUser2,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import styles from "./SideBar.module.css";

export default function TemporaryDrawer({ user }) {
  let navigate = useNavigate();

  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ right: open });
  };

  // Updated items array with text and icons
  const menuItems = [
    {
      text: "اللوحة الرئيسية",
      icon: <LuLayoutDashboard size={20} />,
      path: "/dashboard",
    },
    { text: "الزبائن", icon: <LuUsers size={20} />, path: "/allUsers" },
    {
      text: "المنتوجات",
      icon: <MdRestaurantMenu size={20} />,
      path: "/menuItems",
    },
  ];

  const chartItems = [
    { text: "مخطط المبيعات", icon: <RxBarChart size={20} /> },
    { text: "مخطط المنتجات", icon: <LuPieChart size={20} /> },
  ];

  const amdinITems = [
    { text: "حسابي", icon: <LuUser2 size={20} /> },
    { text: "تسجيل خروج", icon: <LuLogOut size={20} /> },
  ];

  const GoToPage = (item) => {
    navigate("/admin" + item.path);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div className={styles["admin-details"]}>
        <h1>Admin</h1>
        {user && (
          <>
            <h4>{user.username}</h4>
            <h4>{user.email}</h4>
          </>
        )}{" "}
      </div>
      <List style={{ marginTop: "40px" }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            onClick={() => {
              GoToPage(item);
            }}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider style={{ marginTop: "20px" }} />
      <h3 className={styles["chart-title"]}>الرسوم البيانية</h3>
      <List>
        {chartItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            onClick={() => {
              GoToPage(item);
            }}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider style={{ marginTop: "20px", marginBottom: "10px" }} />
      <List>
        {amdinITems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            onClick={() => {
              GoToPage(item);
            }}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)} size="large">
        <RxHamburgerMenu />
      </IconButton>
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
