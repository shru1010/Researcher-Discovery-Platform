const puppeteer = require("puppeteer");
try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://scholar.google.com/");

    await page.type("#gs_hdr_tsi", "Cloud computing");
    await page.click("#gs_hdr_tsb");
    await page.waitForSelector("#gs_hdr_mnu");
    await page.click("#gs_hdr_mnu");
    const res = await page.$$(
      "a.gs_in_ib.gs_md_li.gs_md_lix.gs_in_gray span.gs_lbl"
    );
    // console.log(res[1]["_mainFrame"]);
    let answer = null;
    for (let i = 0; i < res.length; i++) {
      let value = await res[1].evaluate((el) => el.textContent);
      if (value == "Profiles") {
        answer = res[i];
        break;
      }
    }
    await res[1].click();
    await page.waitForNavigation();
    // const users = await page.$$eval(".gs_ai_name a", (list) =>
    //   list.map((el) => el.href)
    // );
    const users = await page.$$(".gs_ai_name a");
    // console.log(users);
    // console.log(await users[0].getProperty("href"));
    await users[0].click();
    // for (let i = 0; i < users.length; i++) {
    //   await users[i].click();
    // }
    // await Promise.all([
    //   // Manual clicking of the link
    //   page.$eval(answer, (el) => el.click()),
    //   page.waitForNavigation(),
    // ]).catch((e) => console.log(e));
    // const value = await page.$(
    //   "a.gs_in_ib.gs_md_li.gs_md_lix.gs_in_gray span.gs_lbl"
    // );
    // console.log(value);
    // const hrefs = await page.$$eval(
    //   "a.gs_in_ib.gs_md_li.gs_md_lix.gs_in_gray",
    //   (list) =>
    //     list.map((elm) => {
    //       elm.href;
    //     })
    // );

    // const value = await page.evaluate(hrefs[1]);
    // console.log(value);
    // console.log(p);
    // await page.click(".gs_in_ib.gs_md_li.gs_md_lix.gs_in_gray");
    // await page.click("button#search-icon-legacy");
    //
    // await page.screenshot({ path: "youtube_fm_dreams_list.png" });
    // const videos = await page.$$("ytd-thumbnail.ytd-video-renderer");
    // await videos[2].click();
    // await page.waitForSelector(".html5-video-container");
    // await page.waitFor(5000);
    // await page.screenshot({ path: screenshot });
    // await browser.close();
    // console.log("See screenshot: " + screenshot);
  })();
} catch (err) {
  console.error(err);
}
