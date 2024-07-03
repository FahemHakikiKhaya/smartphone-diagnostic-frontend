const items = [
  {
    title: "diagnose",
    path: "/admin/diagnose",
    // // icon: icon("ic_user"),
  },
  {
    title: "symptom",
    path: "/admin/symptom",
    // // icon: icon("ic_cart"),
  },
  {
    title: "diagnose_symptom",
    path: "/admin/diagnose-symptom",
    // // icon: icon("ic_blog"),
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
