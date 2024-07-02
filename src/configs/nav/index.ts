const items = [
  {
    title: "dashboard",
    path: "/",
    // icon: icon("ic_analytics"),
  },
  {
    title: "user",
    path: "/user",
    // // icon: icon("ic_user"),
  },
  {
    title: "product",
    path: "/products",
    // // icon: icon("ic_cart"),
  },
  {
    title: "blog",
    path: "/blog",
    // // icon: icon("ic_blog"),
  },
  {
    title: "login",
    path: "/login",
    // // icon: icon("ic_lock"),
  },
  {
    title: "Not found",
    path: "/404",
    // icon: icon("ic_disabled"),
  },
];

const layout = {
  header: {
    mobile: 64,
    desktop: 80,
  },
  width: 280,
};

const navConfig = { layout, items };

export default navConfig;
