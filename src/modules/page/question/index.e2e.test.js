import puppeteer from "puppeteer";

describe("App.js", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  it("score from 6 -> 49", async () => {
    await page.goto("http://localhost:3000");
    await page.click('div.option-group:first-child');
    await page.click('button.button-group');
    await page.click('div.option-group:first-child');
    await page.click('button.button-group');
    await page.click('div.option-group:first-child');
    await page.click('button.button-group');
    await page.click('div.option-group:first-child');
    await page.click('button.button-group');
    await page.click('div.option-group:first-child');
    await page.click('button.button-group');
    await page.click('div.option-group:first-child');
    await page.click('button.button-group');
    await page.click('div.option-group:first-child');
    await page.click('button.button-group');
    await page.click('div.option-group:first-child');
    await page.click('button.button-group');
    await page.click('div.option-group:first-child');
    await page.click('button.button-group');
    await page.click('div.option-group:first-child');
    await page.click('button.button-group');
    
    await page.waitForSelector("div.outcome-text");
    const text = await page.$eval("div.outcome-text", (e) => e.innerHTML);
    expect(text).toContain("Your symptom description indicates that you are in need of medical care. Good news – KRY can help. Book an appointment with one of our doctors.");
  });

  afterAll(() => browser.close());
});