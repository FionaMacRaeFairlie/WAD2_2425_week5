const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));

const mustache = require("mustache-express");
app.engine("mustache", mustache());
app.set("view engine", "mustache");

const staff = {
  Fred: { name: "Fred", bio: "Fred is our European travel expert." },
  Madeline: { name: "Madeline", bio: "Madeline is our US expert." },
  Tom: { name: "Tom", bio: "Tom deals with travel to Asia." },
};

app.get("/staff/:name", (req, res, next) => {
  const info = staff[req.params.name];
  if (!info) return next(); // will eventually fall through to 404
  res.render("staffPage", {
    staffInfo: info,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(
    `Express started on http://localhost:${port}` +
      "; press Ctrl-C to terminate."
  )
);
