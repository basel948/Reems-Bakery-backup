import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import SlpashScreen from "./Components/SplashScreen/SlpashScreen";
import Register from "./Components/Register/Register";
import Homepage from "./Components/Homepage/Homepage";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import ShopingCart from "./Components/ShopingCart/ShopingCart";
import MenuItems from "./Components/MenuItems/MenuItems";
import AdminLogin from "./Components/Login/AdminLogin";
import Home from "./Components/AdminRelated/Home/Home";
import List from "./Components/AdminRelated/list/List";
import Single from "./Components/AdminRelated/single/single";
import New from "./Components/AdminRelated/new/new";
import { userInputs, productsInputs } from "./formSource";
import UserProfile from "./Components/UserProfile/UserProfile";

function AppRouter() {
  // Retrieve LoggedInUser from localStorage
  const storedUserData = JSON.parse(localStorage.getItem("LoggedInUser"));

  return (
    <Routes>
      <Route path="/" exact element={<SlpashScreen />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/productDetails/:id" element={<ProductDetails />} />
      <Route path="/shopingCart" element={<ShopingCart />} />
      <Route path="menu" element={<MenuItems />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile/:activepage" element={<UserProfile />} />
      {/* <Route
        path="/admin"
        element={<AdminWrapper LoggedInUser={storedUserData} />}
      >
        <Route path="/admin/dashboard" element={<AdminMainPage />} />
        <Route path="/admin/allUsers" element={<AllUsers />} />
        <Route path="/admin/menuItems" element={<AllMenuItems />} />
      </Route> */}

      <Route path="/admin">
        <Route index element={<Home />} />
        <Route path="users">
          <Route index element={<List />} />
          <Route path=":userId" element={<Single />} />
          <Route
            path="new"
            element={
              <New
                inputs={userInputs}
                title="إضافة مستخدم جديد"
                imageTitle="صورة الملف الشخصي :"
                buttonTitle="إضافة المستخدم"
              />
            }
          />
        </Route>
        <Route path="products">
          <Route index element={<List />} />
          <Route path=":productId" element={<Single />} />
          <Route
            path="new"
            element={
              <New
                inputs={productsInputs}
                title="إضافة منتج جديد"
                imageTitle="صور منتج جديد ( 3 صور ) :"
                buttonTitle="إضافة المنتج"
              />
            }
          />
        </Route>
      </Route>
      <Route path="/adminLogin" element={<AdminLogin />} />
    </Routes>
  );
}

export default AppRouter;
