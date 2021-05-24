// Generics

export type Url = string

// Podcast

export type Feed = IEpisode[]

export interface IEpisode {
    title: string,
    description: string,
    episode: number,
    season: number,
    publicationTimestamp: Date,
}

export type PersistEpisode = (episode: IEpisode) => Promise<boolean>

export type PersistFeed = (feed: Feed) => Promise<boolean>