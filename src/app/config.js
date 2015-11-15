let exportConfig = {
  debug: true,
  columns: 3,
  url: "/api",
  title: "zsx's Blog",
};
if (exportConfig.debug) {
  exportConfig.url = "http://192.168.1.2:8080/api";
}

export default exportConfig;
