const http = require("http");
const { handler } = require("./handler");

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    const event = {
      httpMethod: req.method,
      path: req.url,
      headers: req.headers,
      body: body
    };

    try {
      const response = await handler(event);
      res.writeHead(response.statusCode, response.headers);
      res.end(response.body);
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Internal server error" }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`> Backend local server running at http://localhost:${PORT}`);
  console.log(`> Login POST endpoint: http://localhost:${PORT}/login`);
});
