import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const HTML_FILE = path.resolve(__dirname, "../__mocks__", "elPaisWebPageMock.html");
let elPaisPageMock = fs.readFileSync(HTML_FILE, 'utf8')
let dom = new JSDOM(elPaisPageMock);
let getElementsByClassName
let getElementsByTagName
let getElementsByTagNameFromParent
const documentMock = {
       window: {
        document: {
           querySelectorAll: jest.fn((param) => {
             const elements = dom.window.document.querySelectorAll(param)
             const element = elements.item(0)
             getElementsByClassName = jest.spyOn(element, "getElementsByClassName")
             getElementsByTagName = jest.spyOn(element, "getElementsByTagName")
             getElementsByTagNameFromParent = jest.spyOn(element.parentElement, "getElementsByTagName")

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
import elPaisParser from "@/services/parsers/elPaisParser";

describe("El mundo parser", () => {
  it("creates a error api", () => {
    
    const models = elPaisParser(elPaisPageMock)

    expect(documentMock.window.document.querySelectorAll).toHaveBeenNthCalledWith(1, "h2")
    expect(getElementsByTagName).toHaveBeenNthCalledWith(1, "a")
    expect(getElementsByTagNameFromParent).toHaveBeenNthCalledWith(1, "img")
    expect(models).toMatchSnapshot()
  })
})