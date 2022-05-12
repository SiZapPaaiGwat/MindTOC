import fs from 'fs/promises'

// import { extract } from './extract'

test('Extract headings', async () => {
  const html = await fs.readFile(
    __dirname + '/../../data/wikipedia.html',
    'utf8'
  )
  document.body.innerHTML = html
  expect(document.body.innerHTML.length).not.toEqual(0)
})
