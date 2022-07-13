import puppeteer from "puppeteer";

describe('show/hide an event details', () => {

  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  /* Scenario 1: An event element is collapsed by default. */
  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .description');
    expect(eventDetails).toBeNull();
  });

  /* Scenario 2: User can expand an event to see its details. */
  test('User can expand an event to se its details', async () => {
    await page.click('.event .details-btn');

    const eventDetails = await page.$('.event .description');
    expect(eventDetails).toBeDefined();
  });

  /* Scenario 3: User can collapse an event to hide its details. */
  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .description');
    expect(eventDetails).toBeNull();
  });
});