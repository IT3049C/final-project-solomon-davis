import {test, expect } from '@playwright/test';

const playerName = "Billy";

test.describe('Rock Paper Scissors', () => {

    test('Rock Paper Scissors Loading', async ({page}) => {
        
        //Load Initial State
        await page.goto('https://it3049c.github.io/final-project-solomon-davis/');
        await expect(page).toHaveURL('https://it3049c.github.io/final-project-solomon-davis/');
        await expect(page).toHaveTitle('GameHub');

        await page.getByText('Rock Paper Scissors 🪨📄✂️').click();

        await expect(page).toHaveURL('https://it3049c.github.io/final-project-solomon-davis/#/settings');
        await page.getByLabel('Player Name')
        await page.locator("input[id='player-name']").fill(playerName);
            
        await page.locator("input[value='knight']").click();
        await page.locator("input[value='knight']").check();
        
        await page.getByText('Save Settings').click();

        await expect(page).toHaveURL('https://it3049c.github.io/final-project-solomon-davis/#/game/rps');

        //Interact With Game Elements
        await page.getByRole('button', { name: 'Rock' }).click();
        await page.getByRole('button', { name: 'Paper' }).click();
        await page.getByRole('button', { name: 'Scissor' }).click();
        await page.getByRole('button', { name: 'Rock' }).click();
        await page.getByRole('button', { name: 'Paper' }).click();
        await page.getByRole('button', { name: 'Scissor' }).click();

        //Reset To Initial State
        await page.getByRole('button', { name: 'Reset Game' }).click()
})
})