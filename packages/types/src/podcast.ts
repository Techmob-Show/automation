type Feed = IEpisode[]

interface IEpisode {
    title: string,
    description: string,
    episode: number,
    season: number,
    publicationTimestamp: Date,
}

type PersistEpisode = (episode: IEpisode) => Promise<boolean>

type PersistFeed = (feed: Feed) => Promise<boolean>

export { Feed, IEpisode, PersistEpisode, PersistFeed }
