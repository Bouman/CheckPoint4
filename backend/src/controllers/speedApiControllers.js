const axios = require("axios");
const models = require("../models");

const call =  (req, res) => {
  axios
  .get('https://www.speedrun.com/api/v1/games', {
    headers: {
      'x-api-key': process.env.SPEEDRUN_APIKEY
    }
  })
  .then((data) => {
    res.status(200).json(data.data.data);
  })
  .catch((err) => {
    res.status(500);
  });
};

module.exports = {
  call,
};
