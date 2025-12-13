import {test, expect } from '@playwright/test';

const playerName = "Billy";

test.describe('Game Hub Testing', () => {
test('Run Game Hub Tests', async ({page}) => {
    
    await page.goto('https://it3049c.github.io/final-project-solomon-davis/');
    await expect(page).toHaveURL('https://it3049c.github.io/final-project-solomon-davis/');
    await expect(page).toHaveTitle('GameHub');



//List Available Games
    await expect(page.getByText('Available Games')).toBeVisible();
    await page.getByRole('link', { name: 'Rock Paper Scissors', exact: true }).hover();
    await page.getByRole('link', { name: 'Tic-Tac-Toe', exact: true }).hover();
    await page.getByRole('link', { name: 'Wordle', exact: true }).hover();
    await page.getByRole('link', { name: 'Hangman', exact: true }).hover();


//Captures A Player Name
    await page.getByText('Settings ⚙️').click();
    await expect(page).toHaveURL('https://it3049c.github.io/final-project-solomon-davis/#/settings');
    await page.getByLabel('Player Name')
    await page.locator("input[id='player-name']").fill(playerName);
    
    await page.locator("input[value='knight']").click();
    await page.locator("input[value='knight']").check();
    //await page.locator("select[id='difficulty']").click();
    //await page.getByText('hard').click();
    await page.getByText('Save Settings').click();
   


//Navigate From Hub Into All Game Page and Back

    await expect(page).toHaveURL('https://it3049c.github.io/final-project-solomon-davis/#/');
    await page.getByText('Home 🎮').click();

    await expect(page).toHaveURL('https://it3049c.github.io/final-project-solomon-davis/#/');
    await expect(page.getByText('Available Games')).toBeVisible();

    await page.getByText('Rock Paper Scissors 🪨📄✂️').click();
    await expect(page).toHaveURL('https://it3049c.github.io/final-project-solomon-davis/#/game/rps');

    await page.getByText('Tic Tac Toe ✖️⭕').click();
    await expect(page).toHaveURL('https://it3049c.github.io/final-project-solomon-davis/#/game/tic-tac-toe');

    await page.getByText('Wordle 🔠').click();
    await expect(page).toHaveURL('https://it3049c.github.io/final-project-solomon-davis/#/game/wordle');

    await page.getByText('Hangman 🧍‍♂️').click();
    await expect(page).toHaveURL('https://it3049c.github.io/final-project-solomon-davis/#/game/hangman');

    await page.getByText('Settings ⚙️').click();
    await expect(page).toHaveURL('https://it3049c.github.io/final-project-solomon-davis/#/settings');
    
    await page.getByText('Home 🎮').click();


//Player Name Displayed On All Pages
    
    await page.getByText('Home 🎮').click();
    await expect(page.getByText(playerName)).toBeVisible();

    await expect(page).toHaveURL('https://it3049c.github.io/final-project-solomon-davis/#/');
    await expect(page.getByText('Available Games')).toBeVisible();
    await expect(page.getByText(playerName)).toBeVisible();

    await page.getByText('Rock Paper Scissors 🪨📄✂️').click();
    await expect(page).toHaveURL('https://it3049c.github.io/final-project-solomon-davis/#/game/rps');
    await expect(page.getByRole('heading', { name: 'Rock Paper Scissors' })).toBeVisible();
    await expect(page.getByText('Billy', { exact: true })).toBeVisible();

    await page.getByText('Tic Tac Toe ✖️⭕').click();
    await expect(page).toHaveURL('https://it3049c.github.io/final-project-solomon-davis/#/game/tic-tac-toe');
    await expect(page.getByText('Tic Tac Toe')).toBeVisible();
    await expect(page.getByText('Billy', { exact: true })).toBeVisible();

    await page.getByText('Wordle 🔠').click();
    await expect(page).toHaveURL('https://it3049c.github.io/final-project-solomon-davis/#/game/wordle');
    await expect(page.getByRole('heading', { name: 'Wordle' })).toBeVisible();
    await expect(page.getByText('Billy', { exact: true })).toBeVisible();

    await page.getByText('Hangman 🧍‍♂️').click();
    await expect(page).toHaveURL('https://it3049c.github.io/final-project-solomon-davis/#/game/hangman');
    await expect(page.getByRole('heading', { name: 'Hangman' })).toBeVisible();
    await expect(page.getByText('Billy', { exact: true })).toBeVisible();


})
})