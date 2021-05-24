import { generateCover } from '../src'
import fs from 'fs'
// TODO
// @ts-ignore
import rewire from 'rewire'
import {IEpisode} from 'types'
import {createCanvas} from 'canvas'

const index = rewire(`${process.cwd()}/dist/index`)

const successEpisode : IEpisode = {
    title: 'Test episode over multiple lines',
    description: 'This is a highly interesting description for our newest episode.',
    episode: 96,
    season: 19,
    publicationTimestamp: new Date(),
}

const successOptions = {pathTemplate: `${process.cwd()}/test/template.png`, pathOutput: `${process.cwd()}/test/cover.jpeg`}

const errorOptions = {pathTemplate: '', pathOutput:''}

test('Generation was successful', async () => {
    const pathOutput = await generateCover(successEpisode, successOptions)
    expect(pathOutput).not.toBeNull()
    expect(pathOutput).toBe(successOptions.pathOutput)
    expect(fs.existsSync(successOptions.pathOutput)).toBe(true)
})

test('Cover is not generated without input and output path', async () => {
    const pathOutput = await generateCover(successEpisode, errorOptions)
    expect(pathOutput).toBeNull()
})

const getTitleLines = index.__get__('getTitleLines')
test('Episode title is split over multiple lines if needed', () => {
    const canvas = createCanvas(1200, 1200)
    const context = canvas.getContext('2d')
    context.font = getFontStyle(100)
    const titleLinesLong = getTitleLines(context, 'Test episode over multiple lines with even more text')
    expect(titleLinesLong.length).toBe(4)
    const titleLinesShort = getTitleLines(context, 'Test')
    expect(titleLinesShort.length).toBe(1)
})

const getFontStyle = index.__get__('getFontStyle')
test('Font style text', () => {
    const fontStyle = getFontStyle(24)
    expect(fontStyle).toBe('bold 24pt Arial')
})

const getSeasonEpisode = index.__get__('getSeasonEpisode')
test('Season and episode text', () => {
    const seasonEpisode = getSeasonEpisode(99,99)
    expect(seasonEpisode).toBe('S99 / E99')
})
