const { validateCredentials } = require("./auth");

exports.handler = async (event) => {
  // Common CORS headers for API Gateway / Browser fetch
  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Cache-Control": "no-store"
  };

  // Handle CORS preflight OPTIONS request if routed to Lambda
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: "OK" })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ message: "Invalid request." })
    };
  }

  const valid = validateCredentials(body.username, body.password);

  return {
    statusCode: valid ? 200 : 401,
    headers: corsHeaders,
    body: JSON.stringify({
      message: valid ? "Login successful!" : "Invalid username or password."
    })
  };
};
