import {config} from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import {Feed, IEpisode} from "../../../packages/types/src/podcast";
import {env} from "./util";

config()

// TODO should it be initialized and receive secrets from index.ts?
const supabase = createClient(env("SUPABASE_URL"), env('SUPABASE_KEY'))

export const getLastFeed = async (): Promise<Feed> => {
    console.info('[FUNCTION] getLastSavedFeed')
    try {
        const response = await supabase
            .from<any>('feeds')
            .select('*')
            .order('created', { ascending: false })
            .limit(1)
        if (response.error) {
            console.error(response.error)
            return []
        }
        return response.data.length >= 1 ? response.data[0].content : []
    } catch (error) {
        console.error(error)
        return []
    }
}

export const addNewFeed = async (feed: Feed): Promise<boolean> => {
    console.info('[FUNCTION] addNewFeedToSupabase')
    try {
        const { error } = await supabase.from('feeds').insert([{ content: feed }])
        if (error) {
            console.error(error)
            return false
        }
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

export const addEpisode = async (episode: IEpisode): Promise<boolean> => {
    console.info('[FUNCTION] addEpisodeToSupabase')
    try {
        const { error } = await supabase.from('episodes').insert([
            {
                title: episode.title,
                description: episode.description,
                episode_in_season: episode.episode,
                season: episode.season,
                publication_timestamp: episode.publicationTimestamp,
            },
        ])
        if (error) {
            console.error(error)
            return false
        }
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}