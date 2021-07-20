import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const HTML_FILE = path.resolve(__dirname, "../__mocks__", "elMundoWebPageMock.html");
let elMundoPageMock = fs.readFileSync(HTML_FILE, 'utf8')
let dom = new JSDOM(elMundoPageMock);
let getElementsByClassName
let getElementsByTagName
const documentMock = {
       window: {
        document: {
           querySelectorAll: jest.fn((param) => {
             const elements = dom.window.document.querySelectorAll(param)
             const element = elements.item(0)
             getElementsByClassName = jest.spyOn(element, "getElementsByClassName")
             getElementsByTagName = jest.spyOn(element, "getElementsByTagName")

             return elements
           }),
         },
         ...dom
       }
    }
const jsdommock = {
    JSDOM: jest.fn(() => documentMock)
}

jest.doMock('jsdom', () => jsdommock)
import elMundoParser from "@/services/parsers/elMundoParser";

describe("El mundo parser", () => {
  it("creates a error api", () => {
    
    const models = elMundoParser(elMundoPageMock)

    expect(documentMock.window.document.querySelectorAll).toHaveBeenNthCalledWith(1, ".ue-c-cover-content__body")
    expect(getElementsByClassName).toHaveBeenNthCalledWith(1, "ue-c-cover-content__media")
    expect(getElementsByClassName).toHaveBeenNthCalledWith(2, "ue-c-cover-content__kicker")
    expect(getElementsByClassName).toHaveBeenNthCalledWith(3, "ue-c-cover-content__headline")
    expect(getElementsByTagName).toHaveBeenNthCalledWith(1, "a")
    expect(models).toMatchSnapshot()
  })
})