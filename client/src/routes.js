import React from "react";
import { Redirect, Route, Switch } from "react-router";
import DashboardLayout from "./layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";
import AccountView from "./views/account/AccountView";
import CustomerListView from "./views/customer/CustomerListView";
import Transaction from "./views/transaction/Transaction";
import DashboardView from "./views/reports/DashboardView";
import AdminLoginView from "./views/auth/AdminLoginView";
import NotFoundView from "./views/landing/NotFoundView";
import ThankYou from "./views/landing/ThankYou";
import LandingPage from "./views/landing/LandingPage";
import ProductListView from "./views/product/ProductListView";
import RegisterView from "./views/auth/RegisterView";
import SettingsView from "./views/settings/SettingsView";
import Home from "./mainview/Home";
import Joined from "./mainview/Joined";
import Account from "./mainview/Account";
import SchemeDashboard from "./mainview/SchemeDashboard";
import ProfileView from "./mainview/ProfileView";
import WalletView from "./mainview/WalletView";
import ProtectedRoute from "./routing/ProtectedRoute";
import ProtectedMainRoute from "./routing/ProtectedMainRoute";
import RegisterMember from "./mainview/Auth/RegisterMember";
import MemberLoginView from "./mainview/Auth/MemberLoginView";
import LogoutRoute from "./routing/LogoutRoute";
import BankAccount from "./mainview/BankAccount";
let routes = (
  <Switch>
    {/* landing page */}
    <Route exact path="/">
      <LandingPage />
    </Route>
    {/* //main routes home,log,register */}
    <Route exact path="/home">
      <ProtectedMainRoute
        Component={
          <MainLayout value="home">
            <Home />
          </MainLayout>
        }
      />
    </Route>
    <Route exact path="/portfolio">
      <ProtectedMainRoute
        Component={
          <MainLayout value="joined">
            <Joined />
          </MainLayout>
        }
      />
    </Route>
    <Route exact path="/house/:id">
      <ProtectedMainRoute
        Component={
          <MainLayout value="joined" back="true">
            <SchemeDashboard />
          </MainLayout>
        }
      />
    </Route>
    <Route exact path="/account">
      <ProtectedMainRoute
        Component={
          <MainLayout value="ac">
            <Account />
          </MainLayout>
        }
      />
    </Route>
    <Route exact path="/account/bank-account">
      <ProtectedMainRoute
        Component={
          <MainLayout value="ac">
            <BankAccount />
          </MainLayout>
        }
      />
    </Route>
    {/* //account menu route */}
    <Route exact path="/account/profile">
      <ProtectedMainRoute
        Component={
          <MainLayout>
            <ProfileView />
          </MainLayout>
        }
      />
    </Route>
    <Route exact path="/wallet">
      <ProtectedMainRoute
        Component={
          <MainLayout value="wallet">
            <WalletView />
          </MainLayout>
        }
      />
    </Route>
    {/* //log in register routes member */}
    <Route exact path="/login">
      <MemberLoginView />
    </Route>
    <Route exact path="/register">
      <RegisterMember />
    </Route>
    {/* //dashboard routes login register */}
    <Route exact path="/dashboard/login">
      <AdminLoginView admin="true" />
    </Route>
    <Route exact path="/dashboard/register">
      <RegisterView admin="true" />
    </Route>
    {/* //dashboard routes */}
    <Route exact path="/dashboard/">
      <ProtectedRoute Component={<DashboardLayout />} />
    </Route>
    <Route exact path="/logout">
      <LogoutRoute />
    </Route>
    <Route exact path="/dashboard/home">
      <ProtectedRoute
        Component={
          <DashboardLayout>
            <DashboardView />
          </DashboardLayout>
        }
        path="/dashboard/"
      />
    </Route>
    <Route exact path="/dashboard/account">
      <ProtectedRoute
        Component={
          <DashboardLayout>
            <AccountView />
          </DashboardLayout>
        }
      />
    </Route>
    <Route exact path="/dashboard/members">
      <ProtectedRoute
        Component={
          <DashboardLayout>
            <CustomerListView />
          </DashboardLayout>
        }
      />
    </Route>
    <Route exact path="/dashboard/transaction">
      <ProtectedRoute
        Component={
          <DashboardLayout>
            <Transaction />
          </DashboardLayout>
        }
      />
    </Route>
    <Route exact path="/dashboard/houses">
      <ProtectedRoute
        Component={
          <DashboardLayout>
            <ProductListView />
          </DashboardLayout>
        }
      />
    </Route>
    <Route exact path="/dashboard/settings">
      <ProtectedRoute
        Component={
          <DashboardLayout>
            <SettingsView />
          </DashboardLayout>
        }
      />
    </Route>
    {/* error route Page Not Found */}
    <Route exact path="/404">
      <NotFoundView />
    </Route>
    <Route exact path="/rate-us">
      <ThankYou />
    </Route>
    <Route exact path="*">
      <Redirect to="/404" />
    </Route>
  </Switch>
);

export default routes;
