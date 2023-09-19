import axios from "axios";
import { generate } from "random-words";
import _ from "lodash"

export const generateMcq = (meaning: { Text: string }[], idx: number): string[] => {

    const correctAns = meaning[idx].Text

    const incorrectAns = meaning.filter((i) => (i.Text !== correctAns))

    const incorrectAnsArr: string[] = _.sampleSize(incorrectAns, 3).map((i) => i.Text)

    const mcqOptions = _.shuffle([...incorrectAnsArr, correctAns])

    return mcqOptions
}

export const translateWords = async (params: LangType): Promise<WordType[]> => {
    try {
        const words = generate(8).map((i) => (
            {
                Text: i
            }
        ))

        const apikey = import.meta.env.VITE_MICROSOFT_KEY

        const response = axios.post('https://microsoft-translator-text.p.rapidapi.com/translate', words,
            {
                params: {
                    'to[0]': params,
                    'api-version': '3.0',
                    profanityAction: 'NoAction',
                    textType: 'plain'
                }, headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': apikey,
                    'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
                },
            })

        const received: FetchedDataType[] = (await response).data;

        const arr: WordType[] = received.map((i, idx) => {

            const options: string[] = generateMcq(words, idx);

            return {
                word: words[idx].Text,
                meaning: i.translations[0].text,
                options
            }
        });

        return arr
    } catch (error) {
        console.log(error);
        throw new Error('Some Error Occured')
    }
}

export const MatchingElements = (
    arr1: string[],
    arr2: string[]
): number => {

    if (arr1.length !== arr2.length) throw new Error("Arrays Are Not Equal");

    let matchedCount = 0;


    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] === arr2[i]) matchedCount++;
    }

    console.log(matchedCount)

    return matchedCount;
}

export const fetchAudio = async (Word: string, language: LangType): Promise<string> => {

    const encodedParams = new URLSearchParams({
        src: Word,
        hl: language,
        r: "0",
        c: "mp3",
        f: "8khz_8bit_mono",
        b64: "true"
    })

    const key: string = import.meta.env.VITE_TEXT_SPEECH_KEY
    const RapidAPIkey: string = import.meta.env.VITE_RAPID_API_KEY

    // console.log(import.meta.env.VITE_TEXT_SPEECH_KEY)
    // console.log(typeof RapidAPIkey)
    try {

        if (language === "ja") encodedParams.set('hl', 'ja-jp')
        else if (language === "es") encodedParams.set('hl', 'es-es')
        else if (language === "fr") encodedParams.set('hl', 'fr-fr')
        else encodedParams.set('hl', 'hi-in')


        const { data }: { data: string } = await axios.post("https://voicerss-text-to-speech.p.rapidapi.com/", encodedParams, {
            params: { key: key },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': RapidAPIkey,
                'X-RapidAPI-Host': 'voicerss-text-to-speech.p.rapidapi.com'
            },
        })
        console.log(data)
        return data;

    } catch (error) {
        console.log(error)
        throw new Error("some Error Occured")
    }
    return ""

}