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
    const pathOutput = await generateCover(successEpisode.title, successEpisode.season, successEpisode.episode, successOptions)
    expect(pathOutput).not.toBeNull()
    expect(pathOutput).toBe(successOptions.pathOutput)
    expect(fs.existsSync(successOptions.pathOutput)).toBe(true)
})

test('Cover is not generated without input and output path', async () => {
    const pathOutput = await generateCover(successEpisode.title, successEpisode.season, successEpisode.episode, errorOptions)
    expect(pathOutput).toBeNull()
})

const getTitleLines = index.__get__('getTitleLines')
test('Episode title is split over multiple lines if needed', () => {
    const canvas = createCanvas(1200, 1200)
    const context = canvas.getContext('2d')
    context.font = getFontStyle(100, 'bold', 'Arial')
    const titleLinesLong = getTitleLines(context, 'Test episode over multiple lines with even more text', 1100)
    console.log(titleLinesLong)
    expect(titleLinesLong.length).toBe(4)
    const titleLinesShort = getTitleLines(context, 'Test', 900)
    expect(titleLinesShort.length).toBe(1)
})

const getFontStyle = index.__get__('getFontStyle')
test('Font style text', () => {
    const fontStyle = getFontStyle(24, 'bold', 'Arial')
    expect(fontStyle).toBe('bold 24pt Arial')
})

const getSeasonEpisode = index.__get__('getSeasonEpisode')
test('Season and episode text', () => {
    const everythingProvided = getSeasonEpisode(99,99)
    expect(everythingProvided).toBe('S99 / E99')
    const seasonMissing = getSeasonEpisode(null,99)
    expect(seasonMissing).toBe('99')
    const everythingMissing = getSeasonEpisode(null, null)
    expect(everythingMissing).toBe(null)
    expect(() => {getSeasonEpisode(99, null)}).toThrow(`If a season is provided there should be also an episode. Season: ${99}, Episode: ${null}`)
})
