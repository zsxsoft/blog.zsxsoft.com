let exportConfig = {
  debug: true,
  columns: 3,
  url: "/api",
};
if (exportConfig.debug) {
  exportConfig.url = "http://blog.zsxsoft.com:8080/api";
}

export default exportConfig;
