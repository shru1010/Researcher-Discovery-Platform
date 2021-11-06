const puppeteer = require("puppeteer");

try {
    (async()=>{
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
    //await page.setDefaultNavigationTimeout(0);
    await page.goto("https://www.iiitb.ac.in/faculty");
    //await page.waitForNavigation( { timeout: 60, waitUntil: 'domcontentloaded' });
    //await page.waitForSelector("#faculty > tbody > tr:nth-child(1) > td:nth-child(2) > h3 > a");
    //console.log("Hello");
    //console.log(await page.$$("div.faculty-info > h3 > a"));
    const res = await page.$$eval("div.faculty-info > h3 > a",hrefs =>{ 
        hrefs.map(a=>{
            a.href 
        })
});
    console.log(res);
    })();
} catch (error) {
    console.error(
        error
    );
}