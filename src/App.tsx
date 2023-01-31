import './App.css'
import React from 'react'
import Tocify from './tocify'
import { marked } from 'marked'

function App() {

  
  const markdown = `
# toc1 
**123123**
>hellow
## toc2 
>42341234324
### toc3
      123123
#### toc4
      123123  
# Toc1
333
## Toc2
555

  `
  const tocify = new Tocify()
  const renderer = new marked.Renderer()
  renderer.heading = (text: string, level: number) => {
    console.log(text)
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" ><h${level}>${text}</h${level}></a>\n`;

  }

  marked.setOptions({
    renderer: renderer,
  })

  let html = marked(markdown)

  return (
    <>
      <div className="Toc">
        {tocify && tocify.render()}
      </div>
      <div className='Doc' dangerouslySetInnerHTML={{ __html: html }}></div>
    </>

  )
}

export default App
