const express = require("express");
const router = express.Router();
const db = require("../../database");

router.get("/", function(req, res) {
  db.select()
    .from("contact")
    .then(function(data) {
      res.send(data);
    });
});

router.get("/:id", function(req, res) {
  db("contact")
    .where({ id: req.params.id })
    .select()
    .then(function(data) {
      res.send(data);
    });
});

router.post("/", function(req, res) {
  db.insert(req.body)
    .returning("*")
    .into("contact")
    .then(function(data) {
      res.send(data);
    });
});

router.put("/:id", function(req, res) {
  db("contact")
    .where({ id: req.params.id })
    .update(req.body)
    .returning("*")
    .then(function(data) {
      res.send(data);
    });
});

router.patch("/:id", function(req, res) {
  db("contact")
    .where({ id: req.params.id })
    .update({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      company: req.body.company,
      title: req.body.title
    })
    .returning("*")
    .then(function(data) {
      res.send(data);
    });
});

router.delete("/:id", function(req, res) {
  db("contact")
    .where({ id: req.params.id })
    .del()
    .then(function() {
      res.json({ succes: true });
    });
});

module.exports = router;
