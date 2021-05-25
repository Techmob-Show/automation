import { devices, webkit } from 'playwright'
import { IEpisode } from '@techmobshow/types'

const iPhone11 = devices['iPhone 11']
const URL = 'https://instagram.com/'

export const postToInstagram = async (episode: IEpisode, tags: string, path: string,  options: { email: string; password: string }) => {
    console.info('[FUNCTION] postToInstagram')
    const browser = await webkit.launch()
    const context = await browser.newContext({
        ...iPhone11,
        locale: 'en-US',
    })
    const page = await context.newPage()
    page.setDefaultTimeout(60000)
    page.on('console', (msg) => console.log('Browser: ', msg.text()))
    await page.goto(URL)
    await page.click('text=Accept All')
    console.info('Accept all')
    // Even if it looks stupid it's needed
    await page.click('text=Log In')
    await page.fill('input[name="username"]', options.email)
    await page.fill('input[name="password"]', options.password)
    console.info('Login')
    await page.click('text=Log In')
    await page.click('text=Save Info')
    await page.click('svg[aria-label="New Post"]')
    console.info('New post')
    await page.setInputFiles('input[type="file"]', path)
    await page.click('text=Next')
    const caption = `${episode.title.toUpperCase()} - ${episode.description} ${tags}`
    await page.fill('textarea[aria-label="Write a caption…"]', caption)
    console.info('Write caption')
    await page.click('text=Share')
    console.info('Share')
    await page.waitForSelector('text="Your photo was posted."')
    console.info('Posted')
    await browser.close()
}

