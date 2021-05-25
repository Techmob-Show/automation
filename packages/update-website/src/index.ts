// @ts-ignore

import axios from 'axios'
// TODO make imports nice
import { IEpisode, PersistEpisode, Url } from '@techmobshow/types'

export const updateWebsite = async (episode: IEpisode, options: { webhook: Url }, persistEpisode: PersistEpisode): Promise<boolean> => {
    console.info('[FUNCTION] updateWebsite')
    const wasEpisodeAdded = await persistEpisode(episode)
    if (wasEpisodeAdded) {
        console.info('Website was added and build will be triggered.')
        await triggerNewBuild(options.webhook)
        return true
    }
    console.error("Episode wasn't added, aborted website update.")
    return false
}

const triggerNewBuild = async (webhook: Url) => await axios.post(webhook)
