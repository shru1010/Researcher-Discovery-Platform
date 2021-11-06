const puppeteer = require("puppeteer");
const fs = require("fs");
try {
  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    //await page.setDefaultNavigationTimeout(0);
    await page.goto("https://www.iiitb.ac.in/faculty");
    //await page.waitForNavigation( { timeout: 60, waitUntil: 'domcontentloaded' });
    //await page.waitForSelector("#faculty > tbody > tr:nth-child(1) > td:nth-child(2) > h3 > a");
    //console.log("Hello");
    //console.log(await page.$$("div.faculty-info > h3 > a"));
    // let startingData = [{}];
    let scrapedData = [];
    const scrapeData = async (i) => {
      let length = scrapedData.length;
      if (i !== 1) {
        // console.log("I is " + i);
        await page.goto(`https://www.iiitb.ac.in/faculty/${i}`);
      }
      let faculties = await page.$$("div.faculty-single-box");
      let facData = [];
      const getScrapedData = async (fac) => {
        let name = "",
          link = "",
          education = "",
          imageURL = "";
        try {
          name = await fac.$eval(
            "div.faculty-info h3 a",
            (el) => el.textContent
          );
        } catch (error) {
          console.log("Name not found error");
        }
        try {
          education = await fac.$eval(
            "div.faculty-info div.faculty-con .eduction",
            (el) => el.textContent
          );
        } catch (error) {
          console.log("Education not found error");
        }
        try {
          link = await fac.$eval("div.faculty-info h3 a", (el) => el.href);
        } catch (error) {
          console.log("Link not found error");
        }
        try {
          imageURL = await fac.$eval("div.faculty_banner img", (el) => el.src);
        } catch (error) {
          console.log("ImageURL not found error");
        }
        let local = {};
        local["name"] = name;
        local["link"] = link;
        local["education"] = education.trim();
        local["imageURL"] = imageURL;
        facData.push(local);
        scrapedData.push(local);
      };

      for (let j = 0; j < faculties.length; j++) {
        await getScrapedData(faculties[j]);
      }
      for (let k = 0; k < facData.length; k++) {
        console.log(facData[k].name);
        await page.goto(facData[k].link);
        try {
          await page.waitForSelector("#research_interests", { timeout: 500 });
          let temp;
          try {
            temp = await page.$eval(
              "#research_interests p",
              (el) => el.textContent
            );
          } catch (error) {
            temp = await page.$eval(
              "#research_interests >  ul",
              (el) => el.textContent
            );
            temp = temp.trim();
          }
          scrapedData[length + k]["rInterests"] = temp;
        } catch (error) {}
      }
      if (i == 1) {
        // console.log("IF");
        await page.goto(`https://www.iiitb.ac.in/faculty/`);
      } else {
        // console.log("ELSE");
        await page.goto(`https://www.iiitb.ac.in/faculty/${i}`);
      }
      let nextButtonExist = false;
      try {
        const nextButton = await page.$eval(
          "div.pagination-main > ul > li:last-child > a[rel]",
          (a) => a.textContent
        );
        // console.log("Next button " + nextButton);
        nextButtonExist = true;
      } catch (err) {
        // console.log(err);
        // console.log("Next ERRROR");
        nextButtonExist = false;
      }
      if (nextButtonExist) {
        return scrapeData(i + 1); // Call this function recursively
      }
    };
    await scrapeData(1);
    await page.close();
    await browser.close();
    fs.writeFile(
      "data.json",
      JSON.stringify(scrapedData),
      "utf8",
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log(
          "The data has been scraped and saved successfully! View it at './data.json'"
        );
      }
    );
  })();
} catch (error) {
  console.error(error);
}
