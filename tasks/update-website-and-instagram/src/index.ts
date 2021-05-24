import { config } from 'dotenv'
import { getNewEpisode } from '@tms/new-anchorfm-episode'
import { addEpisode, addNewFeed, getLastFeed } from './supabase'
import { env } from './util'
import { updateWebsite } from 'update-website'
import { generateCover } from '@tms/generate-podcast-cover'
import { postToInstagram } from '@tms/post-to-instagram'

config()

const run = async () => {
    console.info('[FUNCTION] run')
    const lastFeed = await getLastFeed()
    const newEpisode = await getNewEpisode(lastFeed, {rssFeedUrl: env('RSS_FEED_URL')}, addNewFeed)
    if (newEpisode) {
        console.info('New episode was detected.')
        await updateWebsite(newEpisode, {webhook: env('WEBHOOK_WEBSITE')}, addEpisode)
        // TODO set paths
        const pathCover = await generateCover(newEpisode, {pathTemplate: '', pathOutput: ''})
        if (pathCover) {
            await postToInstagram(newEpisode, TAGS, pathCover, {email: env('INSTAGRAM_PASSWORD'), password: env('INSTAGRAM_PASSWORD')})
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