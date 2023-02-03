const models = require("../models");

const browse = (req, res) => {
  models.scores
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  let scores;
  let katas;
  const promise1 = models.scores.findscores(req.params.id).then(([rows]) => {
    scores = rows;
  });
  const promise2 =
     models.katas.find(req.params.id, "speedruns")
    .then(([rowskatas]) => {
      katas = rowskatas;
  });

  Promise.all([promise1, promise2])
    .then(() => {
      console.log(scores);
      res
        .status(200)
        .json({ scores, katas });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const scores = req.body;
  // TODO validations (length, format...)
  scores.id = parseInt(req.params.id, 10);
  models.scores
    .update(scores)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const scores = req.body;
  // TODO validations (length, format...)
  models.scores
    .insert(scores)
    .then(([result]) => {
      const id = result.insertId
      res.status(201).json(id);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.scores
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
