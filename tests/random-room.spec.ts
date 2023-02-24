import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../src/web/home/home.page';
import { RoomPage } from '../src/web/room/room.page';

test.describe.configure({ mode: 'serial' });

test.describe('Random room', () => {
  let page: Page;
  let homePage: HomePage;
  let roomPage: RoomPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    homePage = new HomePage(page);
    homePage.goto();
    await homePage.entranceTerms.agreeButton.click();
  })

  test.afterAll(async () => {
    await page.close();
  })

  test('visit random room', async () => {
    const room = await homePage.roomList.getRandomRoom();
    const roomName = await room.getName();
    roomPage = await room.visitRoom();
    await Promise.all([
      expect.soft(page).toHaveURL(roomName + '/'),
      expect.soft(roomPage.header.signUpButton).toBeVisible(),
      expect.soft(roomPage.scanCamsButton).toBeVisible(),
      expect.soft(roomPage.nextCamButton).toBeVisible(),
      expect.soft(roomPage.videoPlayer.showBuyBox.sendTipButton).toBeVisible()
    ])
  });

  test('video stream should be currently playing', async () => {
    expect(await roomPage.videoPlayer.isVideoPlaying(), "should get 200 status code on streaming request")
      .toBeTruthy();
  });

  const TEST_STEPS_SET = [
    { step: 1, button: "scanCamsButton" },
    { step: 2, button: "skipCamButton" },
    { step: 3, button: "skipCamButton" },
  ]

  for (let { step, button } of TEST_STEPS_SET) {
    test(`scan next room. Step: ${step}`, async () => {
      const [response] = await Promise.all([
        page.waitForResponse("**/api/ts/roomlist/next-room/**"),
        roomPage[button].click()
      ]);
      const { rooms } = await response.json();
      const expectedRoom = rooms[0];
      await expect(page, `should navigate to the next room: ${expectedRoom}`)
        .toHaveURL(new RegExp(expectedRoom));
    })
  }
})
