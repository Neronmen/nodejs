module.exports = (query) => {
  const filterStatus = [
    {
      name: "Tất cả",
      class: "",
      status: "",
    },
    {
      name: "Hoạt Động",
      class: "",
      status: "active",
    },
    {
      name: "Dừng Hoạt Động",
      class: "",
      status: "inactive",
    },
  ];

  if (query.status) {
    const index = filterStatus.findIndex(
      (item) => item.status == query.status
    );
    filterStatus[index].class = "active";
  } else {
    const index = filterStatus.findIndex((item) => item.status == "");
    filterStatus[index].class = "active";
  }
  return filterStatus;
};
