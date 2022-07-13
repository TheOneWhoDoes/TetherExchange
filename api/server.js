const request = require("request");
const cheerio = require("cheerio");
const cron = require("node-cron");
const axios = require("axios");

const URL = "https://www.lens.org/lens/search/patent/list?q=car";
var s = 0;

async function coin() {}
coin();

module.exports = class Crawler2 {
  constructor(sentData) {
    this.sentData = sentData;
  }
  get getVar() {
    return s;
  }
  async usdCrawl(sentData) {
    let arr = {};
    let jsonData;
    try {
      await axios
        .get("https://api.coincap.io/v2/assets/tether/")
        .then((resp) => {
          // console.log(resp.data);
          arr = {
            ...resp.data.data,
          };
          console.log(arr, "s");
        });
    } catch (error) {}

    // axios
    //   .get("https://www.bitstamp.net/api/v2/ticker/usdtusd/")
    //   .then((resp) => {
    //     // console.log(resp.data);
    //     arr = { ...resp.data };
    //   });

    request(URL, sentData, function (err, res, body) {
      if (err) {
        console.log(err, "error occured while hitting URL");
      } else {
        let $ = cheerio.load(body);
				console.log(body);
		console.log(
        $(
          'div[id="resultsTable"]'
        ));
        $(
          'div[class="div-table-results-body div-table-results-body-alt-rows ng-scope"]'
        )
          .find("div > div")
          .map(function (index, element) {
			  console.log(element);
            if (index === 0) {
              arr = { ...arr, usd: $(element).text().trim() };
            }
          });
      }
      jsonData = JSON.stringify(arr);
		console.log("SSS");
      this.sentData = jsonData.toString();
      s = jsonData.toString();
      return jsonData;
    });
  }
};
