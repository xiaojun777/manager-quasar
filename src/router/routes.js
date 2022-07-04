const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      {
        path: "echarts_board",
        component: () => import("src/pages/EchartsBoard.vue"),
      },
      {
        path: "users_board",
        component: () => import("src/pages/UsersBoard.vue"),
      },
      {
        path: "rows_board",
        component: () => import("src/pages/RowsBoard.vue"),
      },
      {
        path: "rows_board_not_editable",
        component: () => import("src/pages/RowsBoardNotEditable.vue"),
      },
      { path: "test", component: () => import("src/pages/test.vue") },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
