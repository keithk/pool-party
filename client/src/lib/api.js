const api = {
  url: window.location.hostname.includes("localhost")
    ? "http://localhost:3001/api"
    : "https://pool.cute.is/api",

  callback: window.location.hostname.includes("localhost")
    ? "http://localhost:3000/callback"
    : "https://pool.cute.is/callback"
};

export default api;
