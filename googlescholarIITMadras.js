const puppeteer = require("puppeteer");
const fs = require("fs");

try {
  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://scholar.google.com/citations?view_op=view_org&hl=en&org=4946093267834442390");
    let names=[]
    // let count=0
    const scrapeData = async () => {
        // count++;    
        const users = await page.$$(".gs_ai_name");
        
        for (let i = 0; i < users.length; i++) {
            names.push(await users[i].$eval("a", el=> el.textContent));
        }
        // On the main page, we check for the existence of next page.
        let nextButtonExist = false;
        // let nextButtonCheck;
        try {
            let nextButtonCheck= await page.$eval(
                "#gsc_authors_bottom_pag > div > button.gs_btnPR.gs_in_ib.gs_btn_half.gs_btn_lsb.gs_btn_srt.gsc_pgn_pnx",
                (el) => el.getAttribute("onclick")
            );
            nextButtonExist = true;
        } catch (err) {
            console.log(err);
            nextButtonExist = false;
        }
        try {
            if (nextButtonExist) {
                nextButton = await page.$("#gsc_authors_bottom_pag > div > button.gs_btnPR.gs_in_ib.gs_btn_half.gs_btn_lsb.gs_btn_srt.gsc_pgn_pnx")
                await Promise.all([
                    page.waitForNavigation(),
                    nextButton.click()
                ]);
                // console.log(nextButton);
                // let quoteposition=nextButton.indexOf("\'")
                // console.log(quoteposition);
                // let halfurl=nextButton.slice(quoteposition+1,nextButton.length-1);
                
                // let url="https://scholar.google.com"+halfurl;
                // console.log(url);
                let url = page.url()
                console.log(url)
                return scrapeData(); // Call this function recursively
            }  
        } catch (error) {
           console.log(error); 
        }
    }
    
    await scrapeData();
    await page.close();
    await browser.close();
    // Writing the data from scrapedData to a file.
    fs.writeFile(
      "users.json",
      JSON.stringify(names),
      "utf8",
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log(
          "The data has been scraped and saved successfully! View it at './users.json'"
        );
      }
    );
  })();
} catch (err) {
  console.error(err);
}
