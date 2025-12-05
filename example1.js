// app.mjs (or app.js with "type": "module" in package.json)
import express from "express";

const app = express();

app.use((req, res, next) => {
  console.log("\n\nALWAYS");
  next();
});

app.get("/a", (req, res) => {
  console.log("/a: route will be terminated by send");
  res.send("a");
});
app.get("/a", (req, res) => {
  console.log("/a: never called");
});

app.get("/b", (req, res, next) => {
  console.log("/b: route not terminated");
  next();
});

app.use((req, res, next) => {
  console.log("SOMETIMES");
  next();
});

app.get("/b", (req, res, next) => {
  console.log("/b (part 2): error thrown");
  throw new Error("b failed");
});

app.use("/b", (err, req, res, next) => {
  console.log("/b error detected and passed on");
  next(err);
});

// Route that throws an error
app.get("/c", (req, res, next) => {
  console.log("/c: error thrown");
  throw new Error("c failed");
});

// Error middleware for /c that swallows the error and continues
app.use("/c", (err, req, res, next) => {
  console.log("/c: error detected but not passed on");
  next(); // deliberately not passing err
});

// Global error handler (last error-handling middleware)
app.use((err, req, res, next) => {
  console.log("unhandled error detected: " + err.message);
  res.send("500 - server error");
});

// Fallback 404 handler (must be last non-error middleware)
app.use((req, res) => {
  console.log("route not handled");
  res.send("404 - not found");
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(
    `Express started on http://localhost:${port}; press Ctrl-C to terminate.`
  )
);
