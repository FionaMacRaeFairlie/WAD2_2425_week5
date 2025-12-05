// app.js (ESM)
import express from "express";
import mustache from "mustache-express";

const app = express();
app.use(express.urlencoded({ extended: false }));

// Configure Mustache as the view engine
app.engine("mustache", mustache());
app.set("view engine", "mustache");

const modules = {
  HonsProject: {
    title: "Honours Project",
    name: "Brian Shields",
    description: "Independent study.",
  },
  WebAppDev2: {
    title: "Web Application Development 2",
    name: "Fiona Fairlie",
    description:
      "This module equips the students with the knowledge and understanding to design, implement and deploy scalable web applications consisting of a web browser client interacting with a server which uses a database as well as external services. ",
  },
  MLDA: {
    title: "Machine Learning and Data Analytics",
    name: "Yan Zhang",
    description:
      "This module will provide an introduction to the challenges and possible solutions around big data.",
  },
  SecureSoftwareDev: {
    title: "Secure Software Development",
    name: "Jim Paterson",
    description:
      "Poor software design is at the core of many software vulnerabilities. This module equips students with deep knowledge and understanding of the risk to information security and the principles and skills of building secure software systems.",
  },
  CloudPlatformDev: {
    title: "Cloud Platform Development",
    name: "Sajid Nasir",
    description:
      "This module provides coverage of cloud computing with practical implementations.",
  },
};

// Route for module details
app.get("/modules/:moduleName", (req, res, next) => {
  console.log(req.params.moduleName);
  const info = modules[req.params.moduleName];
  if (!info) return next(); // will eventually fall through to 404
  res.render("modulePage", { moduleInfo: info });
});

// Fallback 404 handler
app.use((req, res) => {
  console.log("route not handled");
  res.status(404).send("404 - not found");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `Express started on http://localhost:${port}; press Ctrl-C to terminate.`
  );
});
