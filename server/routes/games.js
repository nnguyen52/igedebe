const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");
// this is not recentReleased, its recommended ps4 games
router.post("/recentReleased", async (req, res) => {
  await axios({
    method: "post",
    url: "https://api.igdb.com/v4/games/",
    headers: {
      Accept: "application/json",
      "Content-Type": "text/plain",
      "Client-ID": "5t9m4qnwuraip9o8mxg8avgcje9b3j",
      Authorization: `Bearer ${req.body.accessToken}`,
    },
    data: `fields name, rating,  cover.image_id; limit 500; where platforms = (48,49) & rating >= 90; sort rating desc;`,
  })
    .then((result) => {
      res.json({ data: result.data });
    })
    .catch((error) => {
      console.log("error!");
    });
});
router.post("/gameBasedOnID/:id", async (req, res) => {
  await axios({
    method: "post",
    url: "https://api.igdb.com/v4/games/",
    headers: req.body.headers,
    data: `fields game_modes.name, involved_companies.company.name,
     involved_companies.developer,involved_companies.supporting, 
     platforms.name,websites.category, expansions.name ,expansions.cover.image_id ,
     expansions.id ,bundles.cover.image_id ,bundles.name, 
     bundles.id ,remakes.cover.image_id, remakes.name , remakes.id 
     ,release_dates.date, release_dates.platform.name , remasters.id 
     , remasters.cover.image_id, remasters.name,  
     websites.url, involved_companies.company.name,
    name,  id , rating,  artworks.image_id , cover.image_id,
    dlcs , first_release_date , genres.name,
    player_perspectives.name, alternative_names.name,
    themes.name,collection.games.name,collection.name ,collection.games.cover.image_id,
    franchises.name, franchises.games.name , franchises.games.cover.image_id , 
    game_engines.name , age_ratings.rating_cover_url, age_ratings.content_descriptions.description,
    age_ratings.category, age_ratings.synopsis, storyline,
    screenshots.image_id ,summary , total_rating , similar_games.name ,similar_games.cover.image_id,
    videos.video_id;where id = ${req.params.id};`,
  })
    .then((result) => {
      res.json({ data: result.data[0] });
    })
    .catch((error) => {
      console.log(error.message);
      res.json({ data: "BAD_DATA" });
    });
});
// multiple games base on userID
router.post("/getMultipleGames2", (req, res) => {
  User.findById(req.body.user._id).then((user) => {
    axios({
      method: "post",
      url: "https://api.igdb.com/v4/games/",
      headers: req.body.headers,
      data: `fields platforms.name, involved_companies.company.name, name,  id , rating,  artworks.image_id , cover.image_id , dlcs , first_release_date , genres.name , screenshots.image_id ,summary , total_rating , similar_games , videos.video_id;where id =(${user.gamesPurchased});`,
    })
      .then((result) => {
        res.json({ data: result.data });
      })
      .catch((error) => res.json({ data: "BAD_DATA" }));
  });
});
//gat multiple games base on IDs string;
router.post("/getMultipleGames", async (req, res) => {
  await axios({
    method: "post",
    url: "https://api.igdb.com/v4/games/",
    headers: req.body.headers,
    data: `fields platforms.name, involved_companies.company.name, name,  id , rating,  artworks.image_id , cover.image_id , dlcs , first_release_date , genres.name , screenshots.image_id ,summary , total_rating , similar_games , videos.video_id;where id =(${req.body.IDsString});`,
  })
    .then((result) => {
      res.json({ data: result.data });
    })
    .catch((error) => res.json({ data: "NO_DATA" }));
});
router.post("/searchGame", async (req, res) => {
  await axios({
    method: "post",
    url: "https://api.igdb.com/v4/games",
    headers: {
      Accept: "application/json",
      "Content-Type": "text/plain",
      "Client-ID": "5t9m4qnwuraip9o8mxg8avgcje9b3j",
      Authorization: `Bearer ${req.body.accessToken}`,
    },
    data: `search "${req.body.query}";fields name , id , cover.image_id , total_rating; limit 500 ;`,
  }).then((result) => {
    res.json({ data: result.data });
  });
});
router.post("/getAccessTokenGames", (req, res) => {
  axios({
    method: "post",
    url: `${req.body.url}`,
  }).then((result) => {
    res.json({ data: result.data });
  });
});
router.post("/fetchRecentGames1Month", (req, res) => {
  axios({
    method: "post",
    url: "https://api.igdb.com/v4/release_dates/",
    headers: req.body.headers,
    data: `fields game.id , game.name , game.cover.* , game.release_dates.* ; where game.platforms = (48,167) & date > ${Math.floor(
      new Date().setMonth(new Date().getMonth() - 1) / 1000
    )} & date < ${Math.floor(Date.now() / 1000)}; sort date asc; limit 100;`,
  })
    .then((result) => {
      res.json({ success: true, data: result.data });
    })
    .catch((e) => {
      res.json({ success: false, error: e.message });
    });
});
router.post("/fetchRecentGames", (req, res) => {
  //fetch recent released games
  axios({
    method: "post",
    url: "https://api.igdb.com/v4/release_dates/",
    headers: req.body.headers,
    data: `fields  game.platforms.name, game.involved_companies.company.name, game.name,  game.id , game.rating,  game.artworks.image_id , game.cover.image_id , game.dlcs , game.first_release_date , game.genres.name , game.screenshots.image_id ,game.summary , game.total_rating , game.similar_games , game.videos.video_id ,game.release_dates.* , game.hypes;   where game.platforms = (48,49,6,167) & date < ${Math.floor(
      Date.now() / 1000
    )}; sort date desc; limit 20;`,
  })
    .then((result) => {
      //array 10 items
      res.json({ success: true, data: result.data });
    })
    .catch((e) => res.json({ success: false }));
});
router.post("/fetchComingSoon", (req, res) => {
  //fetch recent released games
  axios({
    method: "post",
    url: "https://api.igdb.com/v4/release_dates/",
    headers: req.body.headers,
    data: `fields  game.platforms.name, game.involved_companies.company.name, game.name,  game.id , game.rating,  game.artworks.image_id , game.cover.image_id , game.dlcs , game.first_release_date , game.genres.name , game.screenshots.image_id ,game.summary , game.total_rating , game.similar_games , game.videos.video_id ,game.release_dates.* , game.hypes;  where game.platforms = (48,49,6,167) & date > ${Math.floor(
      Date.now() / 1000
    )}; sort date asc; limit 50;`,
  })
    .then((result) => {
      //array 10 items
      res.json({ success: true, data: result.data });
    })
    .catch((e) => res.json({ success: false, data: ["error"] }));
});
router.post("/fetchGames", (req, res) => {
  console.log(req.body.years.toYrFull);
  //by default: 50years range
  axios({
    method: "post",
    headers: req.body.headers,
    url: "https://api.igdb.com/v4/games",
    data: `fields name, cover.image_id,total_rating_count,   total_rating , rating , first_release_date; where first_release_date >= ${
      req.body.years.fromYr
    } & first_release_date < ${
      req.body.years.toYr
    }& (rating != n | total_rating != n) & total_rating_count >= ${
      req.body.years.toYrFull >= 2000
        ? 500
        : req.body.years.fromYrFull <= 2000 || req.body.years.toYrFull <= 2000
        ? 50
        : 500
    } &  (rating >= ${
      req.body.years.fromYrFull <= 2000 || req.body.years.toYrFull <= 2000
        ? 50
        : 500
    } | total_rating >= ${
      req.body.years.fromYrFull <= 2000 || req.body.years.toYrFull <= 2000
        ? 50
        : 500
    }); limit 500 ; sort total_rating desc; sort rating desc;`,
  })
    .then((result) => {
      res.json({ data: result.data });
    })
    .catch((e) => console.log("fetch error"));
});
router.post("/fetchCompanies", (req, res) => {
  axios({
    method: "post",
    url: "https://api.igdb.com/v4/companies/",
    headers: req.body.headers,
    data: "fields name, developed.name, logo.image_id ,developed.total_rating ,developed.total_rating_count; where developed.total_rating_count > 100;  limit 500;",
  }).then((result) => {
    res.json({ data: result.data });
  });
});
router.post("/fetchMostAnticipated", (req, res) => {
  //fetch recent released games
  axios({
    method: "post",
    url: "https://api.igdb.com/v4/games/",
    headers: req.body.headers,
    data: `fields platforms.name,involved_companies.company.name,name,  id ,rating,  artworks.image_id , cover.image_id , dlcs , first_release_date , genres.name , screenshots.image_id ,summary , total_rating , similar_games , videos.video_id ,release_dates.* , hypes;   limit 150; where platforms = (48,49,6,167) & hypes >= 1 & release_dates.date > ${Math.floor(
      Date.now() / 1000
    )}; sort hypes desc;`,
  })
    .then((result) => {
      //array 10 items
      res.json({ success: true, data: result.data });
    })
    .catch((e) => res.json({ success: false, data: ["error"] }));
});
router.post("/fetch_d_comingSoon", (req, res) => {
  let nowScale = new Date(); //millisec
  let laterWeekScale = new Date(); //millisec
  if (req.body.days == 8) {
    laterWeekScale = new Date().setDate(laterWeekScale.getDate() + 8);
    laterWeekScale = Math.floor(laterWeekScale / 1000);
    nowScale = Math.floor(new Date().getTime() / 1000);
  } else {
    laterWeekScale = new Date().setDate(laterWeekScale.getDate() + 14);
    laterWeekScale = Math.floor(laterWeekScale / 1000);
    nowScale = new Date().setDate(nowScale.getDate() + 8);
    nowScale = Math.floor(nowScale / 1000);
  }
  axios({
    method: "post",
    url: "https://api.igdb.com/v4/release_dates/",
    headers: req.body.headers,
    data: `fields *, game.id , game.name , game.cover.* , game.release_dates.* ; where game.platforms = (48,167) & date < ${Math.floor(
      laterWeekScale
    )} & date > ${Math.floor(nowScale)}; sort date asc; limit 50;`,
  })
    .then((result) => {
      res.json({ data: result.data });
    })
    .catch((e) => {
      console.log("error!!!");
    });
});
router.post("/fetch_gameTillEndYear", (req, res) => {
  let actualDate = new Date();
  let eoYear = new Date(actualDate.getFullYear(), 12, 0);
  axios({
    method: "post",
    url: "https://api.igdb.com/v4/release_dates/",
    headers: req.body.headers,
    data: `fields *, game.id , game.name , game.cover.* , game.release_dates.* ; where game.platforms = (48,167) & date < ${Math.floor(
      eoYear.getTime() / 1000
    )} & date > ${Math.floor(
      new Date().getTime() / 1000
    )}; sort date asc; limit 500;`,
  })
    .then((result) => {
      res.json({ data: result.data });
    })
    .catch((e) => {
      console.log("error!!!");
    });
});
module.exports = router;
