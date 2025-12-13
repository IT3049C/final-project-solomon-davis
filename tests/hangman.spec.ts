import {test, expect } from '@playwright/test';

const playerName = "Billy";

test.describe('Hangman', () => {

    test('Hangman Loading', async ({page}) => {
        
        //Load Initial State
        await page.goto('https://it3049c.github.io/final-project-solomon-davis/');
        await expect(page).toHaveURL('https://it3049c.github.io/final-project-solomon-davis/');
        await expect(page).toHaveTitle('GameHub');

        await page.getByText('Settings ⚙️').click();
        await expect(page).toHaveURL('https://it3049c.github.io/final-project-solomon-davis/#/settings');
        await page.getByLabel('Player Name')
        await page.locator("input[id='player-name']").fill(playerName);
            
        await page.locator("input[value='knight']").click();
        await page.locator("input[value='knight']").check();
        await page.getByText('Save Settings').click();

        await page.getByText('Hangman 🧍‍♂️').click();
        await expect(page).toHaveURL('https://it3049c.github.io/final-project-solomon-davis/#/game/hangman');


        //Interact With Game Elements
        await page.getByRole('button', { name: 'Start Game' }).click();
        await page.getByRole('button', { name: 'Click To See Hint' }).click();
        await page.getByRole('button', { name: 'A', exact: true }).click()
        await page.getByRole('button', { name: 'C', exact: true }).click();
        await page.getByRole('button', { name: 'I', exact: true }).click();
        await page.getByRole('button', { name: 'H', exact: true }).click();
        await page.getByRole('button', { name: 'O', exact: true }).click();
        await page.getByRole('button', { name: 'G', exact: true }).click();
        await page.getByRole('button', { name: 'T', exact: true }).click();
        await page.getByRole('button', { name: 'N', exact: true }).click();
        await page.getByRole('button', { name: 'D', exact: true }).click();
        await page.getByRole('button', { name: 'E', exact: true }).click();
        await page.getByRole('button', { name: 'B', exact: true }).click();
        await page.getByRole('button', { name: 'R', exact: true }).click();
        await page.getByRole('button', { name: 'W', exact: true }).click();
        await page.getByRole('button', { name: 'S', exact: true }).click();
        await page.getByRole('button', { name: 'L', exact: true }).click();


        //Reset To Initial State
        await page.getByRole('button', { name: 'Start Game' }).click();
})
})