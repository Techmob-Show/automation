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

// generate-podcast-cover

export interface ICoverStyle {
    size: number,
    maxDrawableArea: number,
    offsetX: number,
    titleArea: number,
    marginLeftRight: number,
    marginTop: number,
    marginBottom: number,
    titleLineHeight: number,
    fontSizeLarge: number,
    fontLineHeight: number,
    fontSizeSmall: number,
    fontColor: string,
    fontWeight: string,
    fontFamily: string
}