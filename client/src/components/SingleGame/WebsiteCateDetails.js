import React, { useState, useEffect } from "react";
import Fb from "../../assets/Fb.png";
import android from "../../assets/android.png";
import apple from "../../assets/apple.png";
import discord from "../../assets/discord.png";
import gog from "../../assets/gog.png";
import instagram from "../../assets/instagram.png";
import official from "../../assets/official.png";
import reddit from "../../assets/reddit.png";
import steam from "../../assets/steam.png";
import twitter from "../../assets/twiiter.png";
import twitch from "../../assets/twitch.png";
import wiki from "../../assets/wiki.png";
import wikia from "../../assets/wikia.png";
import youtube from "../../assets/youtube.png";
import epic from "../../assets/epic.png";
import itch from "../../assets/itch.png";
const WebsiteCateDetails = ({ cateGory, url }) => {
  const [website, setWebsite] = useState({
    categoryImageSrc: null,
    websiteType: null,
    websiteUrl: null,
  });
  const { categoryImageSrc, websiteType } = website;
  useEffect(() => {
    switch (cateGory) {
      case 1:
        setWebsite({
          categoryImageSrc: official,
          websiteType: "Official Website",
          websiteUrl: url,
        });
        break;
      case 2:
        setWebsite({
          categoryImageSrc: wikia,
          websiteType: "Wikia Fandom",
          websiteUrl: url,
        });
        break;
      case 3:
        setWebsite({
          categoryImageSrc: wiki,
          websiteType: "Wikipedia",
          websiteUrl: url,
        });
        break;
      case 4:
        setWebsite({
          categoryImageSrc: Fb,
          websiteType: "Facebook",
          websiteUrl: url,
        });
        break;
      case 5:
        setWebsite({
          categoryImageSrc: twitter,
          websiteType: "Twitter",
          websiteUrl: url,
        });
        break;
      case 6:
        setWebsite({
          categoryImageSrc: twitch,
          websiteType: "Twitch",
          websiteUrl: url,
        });
        break;
      case 8:
        setWebsite({
          categoryImageSrc: instagram,
          websiteType: "Instagram",
          websiteUrl: url,
        });
        break;
      case 9:
        setWebsite({
          categoryImageSrc: youtube,
          websiteType: "Youtube",
          websiteUrl: url,
        });
        break;
      case 10:
        setWebsite({
          categoryImageSrc: apple,
          websiteType: "Iphone",
          websiteUrl: url,
        });
        break;
      case 11:
        setWebsite({
          categoryImageSrc: apple,
          websiteType: "Ipad",
          websiteUrl: url,
        });
        break;
      case 12:
        setWebsite({
          categoryImageSrc: android,
          websiteType: "Android",
          websiteUrl: url,
        });
        break;
      case 13:
        setWebsite({
          categoryImageSrc: steam,

          websiteType: "Steam",
          websiteUrl: url,
        });
        break;
      case 14:
        setWebsite({
          categoryImageSrc: reddit,
          websiteType: "Reddit",
          websiteUrl: url,
        });
        break;
      case 15:
        setWebsite({
          categoryImageSrc: itch,
          websiteType: "Itch IO",
          websiteUrl: url,
        });
        break;
      case 16:
        setWebsite({
          categoryImageSrc: epic,
          websiteType: "Epic",
          websiteUrl: url,
        });
        break;
      case 17:
        setWebsite({
          categoryImageSrc: gog,
          websiteType: "GOG",
          websiteUrl: url,
        });
        break;
      case 18:
        setWebsite({
          categoryImageSrc: discord,
          websiteType: "Discord",
          websiteUrl: url,
        });
        break;
    }
  }, []);
  return (
    <a href={url} target="_blank" style={{ textDecoration: "none" }}>
      <div style={{ display: "flex", margin: "5px" }}>
        <img
          src={categoryImageSrc}
          alt="svg icon"
          style={{ width: "30px", height: "30px" }}
        />
        <h6 style={{ marginLeft: "10px" }}>{websiteType}</h6>
      </div>
    </a>
  );
};

export default WebsiteCateDetails;
