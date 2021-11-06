const puppeteer = require("puppeteer");

try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    //await page.setDefaultNavigationTimeout(0);
    await page.goto("https://www.iiitb.ac.in/faculty");
    //await page.waitForNavigation( { timeout: 60, waitUntil: 'domcontentloaded' });
    //await page.waitForSelector("#faculty > tbody > tr:nth-child(1) > td:nth-child(2) > h3 > a");
    //console.log("Hello");
    //console.log(await page.$$("div.faculty-info > h3 > a"));
    const res1 = await page.$$("div.faculty-info > h3 > a");
    await Promise.all();

    // await res1[0].click();
    // const res = await page.$$eval("div.faculty-info > h3 > a", (hrefs) =>
    //   hrefs.map((option) => {
    //     return {
    //       data: option.innerHTML,
    //       link: option.href,
    //     };
    //   })
    // );
    // console.log(res);
  })();
} catch (error) {
  console.error(error);
}
