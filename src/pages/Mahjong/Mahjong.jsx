import { useLocation } from "react-router-dom";
import Game from "./Elements/Game";
import "./Mahjong.css";

import queryString from "query-string";
import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";

export const BackgroundOptions = {
  BACKGROUND_NORMAL: "BACKGROUND_NORMAL",
  BACKGROUND_FANCY: "BACKGROUND_FANCY",
};

// export const BACKGROUND_COLOR_DEFAULT = '#c08645';

const Mahjong = () => {
  const [preload, setPreload] = useState(true);

  const [backgroundOption, setBackgroundOption] = useState(
    BackgroundOptions.BACKGROUND_NORMAL
  );

  const location = useLocation();

  const { bgColor } = queryString.parse(location.search);

  const [backgroundColor, setBackgroundColor] = useState(
    `#${bgColor}` || "#c08645"
  );

  const [backgroundImage, setBackgroundImage] = useState(null);

  // Get the current state from the browser's web storage.
  useEffect(() => {
    // Check if LocalStorage is active.
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem("test", "1");
        if (localStorage.getItem("test") === "1") {
          localStorage.removeItem("test");
        }
      } catch (e) {
        return;
      }
    } else {
      return;
    }

    const appSettingsJson = localStorage.getItem("appSettings");
    const appSettings = JSON.parse(appSettingsJson);

    if (appSettings !== null) {
      setBackgroundOption(appSettings.backgroundOption);
      setBackgroundColor(appSettings.backgroundColor);
      setBackgroundImage(appSettings.backgroundImage);
    }

    setPreload(false);
  }, []);

  // Save the current state to the browser's web storage.
  useEffect(() => {
    if (preload) {
      return;
    }

    // Check if LocalStorage is active.
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem("test", "1");
        if (localStorage.getItem("test") === "1") {
          localStorage.removeItem("test");
        }
      } catch (e) {
        return;
      }
    } else {
      return;
    }

    localStorage.setItem(
      "appSettings",
      JSON.stringify({
        backgroundOption,
        backgroundColor,
        backgroundImage,
      })
    );
  }, [backgroundOption, backgroundColor, backgroundImage, preload]);

  return (
    <div
      className={`App ${
        backgroundOption === BackgroundOptions.BACKGROUND_FANCY
          ? "animatedBackground"
          : ""
      }`}
      style={{
        backgroundColor: backgroundColor,
        backgroundImage:
          backgroundOption === BackgroundOptions.BACKGROUND_NORMAL &&
          backgroundImage?.trim()
            ? `url(${backgroundImage})`
            : "",
      }}
    >
      <Game />
      <Typography variant="small" className="px-3 text-center my-3 text-white">
        Version - 2
      </Typography>
    </div>
  );
};

export default Mahjong;
