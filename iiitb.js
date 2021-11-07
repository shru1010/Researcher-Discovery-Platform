const puppeteer = require("puppeteer");
const fs = require("fs");
try {
  (async () => {
    // Lauch Chromium browser
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    // Go to IIIT Bangalore faculty page
    await page.goto("https://www.iiitb.ac.in/faculty");
    // Final array storing all faculty details.
    let scrapedData = [];

    // This function is called for each page number passed in i.
    const scrapeData = async (i) => {
      // Storing the length of scrapedData before the page is scraped.
      let length = scrapedData.length;
      if (i !== 1) {
        // console.log("i is " + i);
        await page.goto(`https://www.iiitb.ac.in/faculty/${i}`);
      }
      // faculties array contains all elements which are a div with class faculty-single-box
      let faculties = await page.$$("div.faculty-single-box");
      // Store faculty data for a single page.
      let facData = [];

      // Store the name, profile link, education and image URL for each faculty in faculties array into facData and scrapedData.
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

      // Calling getScrapedData for each faculty in faculties array.
      for (let j = 0; j < faculties.length; j++) {
        await getScrapedData(faculties[j]);
      }
      
      // For each faculty in facData, we go to their respective profile link, get their research interests and store it in corresponding
      // index of scrapedData.
      for (let k = 0; k < facData.length; k++) {
        console.log(facData[k].name);
        await page.goto(facData[k].link);
        try {
          await page.waitForSelector("#research_interests", { timeout: 500 });
          let temp;
          try {
            // Reseach Interests were sometimes unordered list and sometimes comma-separated paragraph.
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
          scrapedData[length + k]["researchInterests"] = temp;
        } catch (error) {
          console.log(error);
        }
      }

      
      // Here we need to go back to the main page again after scraping the research interests of last faculty memeber in that page.
      if (i == 1) {
        await page.goto(`https://www.iiitb.ac.in/faculty/`);
      } else {
        await page.goto(`https://www.iiitb.ac.in/faculty/${i}`);
      }
      // On the main page, we check for the existence of next page.
      let nextButtonExist = false;
      try {
        const nextButton = await page.$eval(
          "div.pagination-main > ul > li:last-child > a[rel]",
          (a) => a.textContent
        );
        nextButtonExist = true;
      } catch (err) {
        // console.log(err);
        nextButtonExist = false;
      }
      if (nextButtonExist) {
        return scrapeData(i + 1); // Call this function recursively
      }
    };
    // Call scrapeData for the first time with the first page.
    await scrapeData(1);
    await page.close();
    await browser.close();
    // Writing the data from scrapedData to a file.
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
