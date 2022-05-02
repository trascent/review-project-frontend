import { createRouter, createWebHistory } from "vue-router";
import BillsView from "../views/BillsView.vue";
import ShowBillView from "../views/ShowBillView.vue";
import EditBillView from "../views/EditBillView.vue";
import CreateBillView from "../views/CreateBillView.vue";
import LoginPage from "../views/LoginPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      redirect: "/bills",
    },
    {
      path: "/bills",
      name: "BillsList",
      component: BillsView,
    },
    {
      path: "/bills/:id",
      name: "ShowBill",
      component: ShowBillView,
      props: true,
    },
    {
      path: "/bills/edit/:id",
      name: "EditBill",
      component: EditBillView,
      props: true,
    },
    {
      path: "/bills/create",
      name: "CreateBill",
      component: CreateBillView,
      props: true,
    },
    {
      path: "/login",
      name: "LoginPage",
      component: LoginPage,
      props: true,
    },
  ],
});

export default router;
