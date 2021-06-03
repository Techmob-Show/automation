import { config } from 'dotenv'
import { getNewEpisode } from '@techmobshow/new-anchorfm-episode'
import { addEpisode, addNewFeed, getLastFeed } from './supabase'
import { env } from './util'
import { updateWebsite } from '@techmobshow/update-website'
import { generateCover } from '@techmobshow/generate-podcast-cover'
import { postToInstagram } from '@techmobshow/post-to-instagram'

config()

const run = async () => {
    console.info('[FUNCTION] run')
    const lastFeed = await getLastFeed()
    const newEpisode = await getNewEpisode(lastFeed, {rssFeedUrl: env('RSS_FEED_URL')}, addNewFeed)
    if (newEpisode) {
        console.info('New episode was detected.')
        await updateWebsite(newEpisode, {webhook: env('WEBHOOK_WEBSITE')}, addEpisode)
        const options = {pathTemplate: `${process.cwd()}/static/template.png`, pathOutput: `${process.cwd()}/static/cover.jpeg`}
        const pathCover = await generateCover(newEpisode.title, newEpisode.season, newEpisode.episode, options)
        if (pathCover) {
            await postToInstagram(newEpisode.title, newEpisode.description, TAGS, pathCover, {email: env('INSTAGRAM_EMAIL'), password: env('INSTAGRAM_PASSWORD')})
            console.info('SUCCESS: Website updated and cover posted in instagram.')
        } else {
            console.error("ERROR: Cover couldn't be generated. Nothing was posted. Website was updated.")
        }
    } else {
        console.info('No new episode was detected.')
    }
}

try {
    run().then(() => console.info('Run finished.'))
} catch (error) {
    console.error('ERROR: ', error)
}

const TAGS = '#techmobshow #podcast #it #german #deutsch #tech #wirtschaftsinformatik #informatik'