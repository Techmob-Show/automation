import { createCanvas, loadImage } from 'canvas'
import fs from 'fs'
import {IEpisode} from "../../types/src/podcast";

// inspired by https://flaviocopes.com/canvas-node-generate-image/
export const generateCover = async (episode: IEpisode, options: { pathTemplate: string, pathOutput: string }): Promise<string | null> => {
    console.info('[FUNCTION] generateEpisodeCover')
    try {
        const canvas = createCanvas(SIZE, SIZE)
        const context = canvas.getContext('2d')
        // draw template
        const template = await loadImage(options.pathTemplate)
        context.drawImage(template, 0, 0, SIZE, SIZE)
        // generic text styling
        context.textAlign = 'center'
        context.textBaseline = 'top'
        context.fillStyle = FONT_COLOR
        // draw episode and season
        context.font = getFontStyle(FONT_SIZE_SMALL)
        context.fillText(getSeasonEpisode(episode.season, episode.episode), OFFSET_X, 50, MAX_DRAWABLE_AREA)
        // draw title
        context.font = getFontStyle(FONT_SIZE_LARGE)
        const titleLines = getTitleLines(context, episode.title)
        const totalLineHeight = titleLines.length * TITLE_LINE_HEIGHT
        const yOffset = (TITLE_AREA - totalLineHeight) / 2 + MARGIN_TOP // to center between text logo at bottom and season episode
        titleLines.forEach((line, index) => {
            const y = yOffset + index * TITLE_LINE_HEIGHT
            context.fillText(line, OFFSET_X, y, MAX_DRAWABLE_AREA)
        })
        const buffer = canvas.toBuffer('image/jpeg')
        fs.writeFileSync(options.pathOutput, buffer)
        return options.pathOutput
    } catch (error) {
        console.error(error)
        return null
    }
}

const getTitleLines = (context: any, title: string): string[] => {
    console.info('[FUNCTION] getTitleLines')
    const words = title.split(' ')
    let line = ''
    const lines = []
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' '
        const testWidth = context.measureText(testLine).width
        if (testWidth > MAX_DRAWABLE_AREA && n > 0) {
            lines.push(line.trim())
            line = words[n] + ' '
        } else {
            line = testLine
        }
    }
    lines.push(line.trim())
    return lines
}

const getFontStyle = (size: number) => `bold ${size}pt Arial`

const getSeasonEpisode = (season: number, episode: number) => `S${season} / E${episode}`

// Canvas
const SIZE = 1200
const MAX_DRAWABLE_AREA = SIZE - 100
const OFFSET_X = SIZE / 2
const MARGIN_TOP = 100
const MARGIN_BOTTOM = 900
const TITLE_AREA = SIZE - MARGIN_TOP - (SIZE - MARGIN_BOTTOM)
const FONT_SIZE_SMALL = 40
const FONT_SIZE_LARGE = 100
const FONT_COLOR = '#33181F'
const TITLE_LINE_HEIGHT = FONT_SIZE_LARGE + 40
