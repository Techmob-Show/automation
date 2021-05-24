import Parser from 'rss-parser'
// TODO @tms/types
import { Feed, IEpisode, PersistFeed } from '@tms/types'

const parser = new Parser()

export const getNewEpisode = async (lastFeed: Feed, options: { rssFeedUrl: string }, persistFeed: PersistFeed): Promise<IEpisode | null> => {
    console.info('[FUNCTION] detectFeedChange')
    const newRawFeed = await parser.parseURL(options.rssFeedUrl)
    const newFeed = toFeed(newRawFeed.items)
    if (lastFeed !== null) {
        const newEpisode = getNewEpisodeFromFeeds(lastFeed, newFeed)
        if (newEpisode) {
            console.info('New episode was detected.')
            await persistFeed(newFeed)
            return newEpisode
        }
    }
    console.info('No change was detected.')
    return null
}

const toFeed = (rawFeed: any): Feed => {
    console.info('[FUNCTION] toFeed')
    if (!rawFeed) { return [] }
    return rawFeed.map((rawEpisode: any): IEpisode => {
        return {
            title: rawEpisode.title,
            description: rawEpisode.contentSnippet,
            episode: rawEpisode.itunes.episode,
            season: rawEpisode.itunes.season,
            publicationTimestamp: rawEpisode.pubDate,
        }
    })
}

const getNewEpisodeFromFeeds = (lastFeed: Feed, currentFeed: Feed): IEpisode | null => {
    console.info('[FUNCTION] getNewEpisodeFromFeeds')
    const lastFeedSorted = lastFeed.sort(sortByPublicationTimestamp)
    const currentFeedSorted = currentFeed.sort(sortByPublicationTimestamp)
    const wasUpdated = !isEqual(lastFeedSorted, currentFeedSorted)
    if (wasUpdated) {
        return currentFeedSorted[0]
    }
    return null
}

const isEqual = (a: Feed, b: Feed): boolean => JSON.stringify(a) === JSON.stringify(b)

const sortByPublicationTimestamp = (a: IEpisode, b: IEpisode) => {
    return +new Date(b.publicationTimestamp) - +new Date(a.publicationTimestamp)
}
