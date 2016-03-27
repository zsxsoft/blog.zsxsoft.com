let exportConfig = {
    columns: 3,
    url: "/api",
    title: "zsx's Blog",
};
if (location.port !== "80" && location.port !== "") { // Debug Mode
    exportConfig.url = "http://test.zsxsoft.com:8080/api";
}

export default exportConfig;
