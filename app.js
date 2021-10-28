const weather = require("./utils/weather");
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const app = express();
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }
  weather(req.query.address, (error, data) => {
    if (error) {
      console.log("Error! =>", error);
    } else {
      const {
        location: { name, country, region },
        current: { temperature, weather_icons, weather_descriptions },
      } = data;
      // console.log(data)
      res.send({
        title: "Weather App",
        day: dayjs().format("dddd"),
        month: dayjs().format("MMM"),
        petsa: dayjs().format("DD"),
        address: `${name}, ${region}, ${country}`,
        temperature,
        weather_icons,
        weather_descriptions,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});

weather("Barcelona, Sorsogon", (error, data) => {
  if (error) {
    console.log("Error! =>", error);
  } else {
    const {
      location: { name, country, region },
      current: { temperature, weather_icons, weather_descriptions },
    } = data;
    // console.log(data)
    app.get("", (req, res) => {
      res.render("index", {
        title: "Weather App",
        day: dayjs().format("dddd"),
        month: dayjs().format("MMM"),
        petsa: dayjs().format("DD"),
        address: `${name}, ${region}, ${country}`,
        temperature,
        weather_icons,
        weather_descriptions,
      });
    });
  }
});
