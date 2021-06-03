import { createCanvas, loadImage } from 'canvas'
import fs from 'fs'
import { IEpisode, ICoverStyle } from '@techmobshow/types'

// inspired by https://flaviocopes.com/canvas-node-generate-image/
export const generateCover = async (title: string, season: number, episode: number, options: { pathTemplate: string, pathOutput: string, style?: ICoverStyle  }): Promise<string | null> => {
    console.info('[FUNCTION] generateEpisodeCover')
    const style = getStyle(options.style ?? ({} as ICoverStyle))
    try {
        const canvas = createCanvas(style.size, style.size)
        const context = canvas.getContext('2d')
        // draw template
        const template = await loadImage(options.pathTemplate)
        context.drawImage(template, 0, 0, style.size, style.size)
        // generic text styling
        context.textAlign = 'center'
        context.textBaseline = 'top'
        context.fillStyle = style.fontColor
        // draw episode and season if provided
        const seasonEpisode = getSeasonEpisode(getValidSeason(season), getValidEpisode(episode))
        if (seasonEpisode) {
            context.font = getFontStyle(style.fontSizeSmall, style.fontWeight, style.fontFamily)
            context.fillText(seasonEpisode, style.offsetX, 50, style.maxDrawableArea)
        }
        // draw title
        context.font = getFontStyle(style.fontSizeLarge, style.fontWeight, style.fontFamily)
        const titleLines = getTitleLines(context, getValidTitle(title), style.maxDrawableArea)
        const totalLineHeight = titleLines.length * style.titleLineHeight
        const yOffset = (style.titleArea - totalLineHeight) / 2 + style.marginTop // to center between text logo at bottom and season episode
        titleLines.forEach((line, index) => {
            const y = yOffset + index * style.titleLineHeight
            context.fillText(line, style.offsetX, y, style.maxDrawableArea)
        })
        // TODO output needs to be mime type
        // IDEA only ask for path without extension and append extension or remove extension if its not jpeg
        const buffer = canvas.toBuffer('image/jpeg')
        fs.writeFileSync(options.pathOutput, buffer)
        return options.pathOutput
    } catch (error) {
        console.error(error)
        return null
    }
}

const getTitleLines = (context: any, title: string, maxDrawableArea: number): string[] => {
    console.info('[FUNCTION] getTitleLines')
    const words = title.split(' ')
    let line = ''
    const lines = []
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' '
        const testWidth = context.measureText(testLine).width
        if (testWidth > maxDrawableArea && n > 0) {
            lines.push(line.trim())
            line = words[n] + ' '
        } else {
            line = testLine
        }
    }
    lines.push(line.trim())
    return lines
}

const getFontStyle = (fontSize: number, fontWeight: string, fontFamily: string) : string => `${fontWeight} ${fontSize}pt ${fontFamily}`

const getSeasonEpisode = (season: number | null, episode: number | null) : string | null => {
    if (!season && episode) {
        return episode.toString()
    } else if  (!season && !episode) {
        return null
    } else if (season && !episode) {
        throw new Error(`If a season is provided there should be also an episode. Season: ${season}, Episode: ${episode}`)
    }
    return `S${season} / E${episode}`
}

const getValidTitle = (title: string) : string => {
    if (!title) throw new Error('Title needs to be set.')
    return title
}

const getValidSeason = (season: number) : number | null => {
    if (season) return season
    return null
}

const getValidEpisode = (episode: number) : number | null => {
    if (episode) return episode
    return null
}

const getStyle = (style: ICoverStyle): ICoverStyle => {
    const size = style.size ?? DEFAULT_STYLE.size
    const marginTop = style.marginTop ?? DEFAULT_STYLE.marginTop
    const marginBottom = style.marginBottom ?? DEFAULT_STYLE.marginBottom
    const fontSizeLarge = style.fontSizeLarge ?? DEFAULT_STYLE.fontSizeLarge
    const fontLineHeight = style.fontLineHeight ?? DEFAULT_STYLE.fontLineHeight
    const marginLeftRight = style.marginLeftRight ?? DEFAULT_STYLE.marginLeftRight
    const maxDrawableArea = size / (marginLeftRight * 2)
    const offsetX = size / 2
    const titleArea = size - marginTop - (size - marginBottom)
    const titleLineHeight = fontSizeLarge + fontLineHeight
    return {
        size,
        maxDrawableArea,
        offsetX,
        titleArea,
        marginLeftRight,
        marginTop,
        marginBottom,
        titleLineHeight,
        fontSizeLarge,
        fontLineHeight,
        fontSizeSmall: style.fontSizeSmall ?? DEFAULT_STYLE.fontSizeSmall,
        fontColor: style.fontColor ?? DEFAULT_STYLE.fontColor,
        fontWeight: style.fontWeight ?? DEFAULT_STYLE.fontWeight,
        fontFamily: style.fontFamily ?? DEFAULT_STYLE.fontFamily
    }
}

const DEFAULT_STYLE = {
    size: 1200,
    marginTop: 100,
    marginBottom: 900,
    marginLeftRight: 50,
    fontSizeSmall: 40,
    fontSizeLarge: 100,
    fontLineHeight: 40,
    fontColor: '#33181F',
    fontWeight: 'bold',
    fontFamily: 'Arial'
}
