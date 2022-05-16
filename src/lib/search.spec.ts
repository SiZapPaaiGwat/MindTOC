import { SEMANTIC_HEADINGS } from '../types/constants'
import searchContentRoot, {
  searchArticleByHeading,
  searchArticleByParagraph
} from './search'

const htmlWithArticleTags = `
<article>
Obedience to Authority: An Experimental View (Perennial Classics)
Stanley Milgram, Professor of Psychology, University of Pennsylvania
</article>
<article>
Obedience, because of its very ubiquitousness, is easily overlooked as a subject of inquiry in social psychology. But without an appreciation of its role in shaping human action, a wide range of significant behavior cannot be understood. For an act carried out under command is, psychologically, of a profoundly different character than action that is spontaneous.
</article>
<article id="article">
The question arises as to whether there is any connection between what we have studied in the laboratory and the forms of obedience we so deplored in the Nazi epoch. The differences in the two situations are, of course, enormous, yet the difference in scale, numbers, and political context may turn out to be relatively unimportant as long as certain essential features are retained. The essence of obedience consists in the fact that a person comes to view himself as the instrument for carrying out another person’s wishes, and he therefore no longer regards himself as responsible for his actions. Once this critical shift of viewpoint has occurred in the person, all of the essential features of obedience follow. The adjustment of thought, the freedom to engage in cruel behavior, and the types of justification experienced by the person are essentially similar whether they occur in a psychological laboratory or
the control room of an ICBM site. The question of generality, therefore, is not resolved by enumerating all the manifest differences between the psychological laboratory and other situations but by carefully constructing a situation that captures the essence of obedience-that is, a situation in which a person gives[…]
</article>
`

const htmlWithHeadingTags = `
<h1>Obedience to Authority: An Experimental View (Perennial Classics)</h1>
<div id="article">
  <div>
    <h2>Obedience to Authority: An Experimental View (Perennial Classics)</h2>
    <p>Obedience, because of its very ubiquitousness, is easily overlooked as a subject of inquiry in social psychology. But without an appreciation of its role in shaping human action, a wide range of significant behavior cannot be understood. For an act carried out under command is, psychologically, of a profoundly different character than action that is spontaneous.</p>
  </div>
  <div>
    <h3>Obedience to Authority: An Experimental View (Perennial Classics)</h3>
    <p>The question arises as to whether there is any connection between what we have studied in the laboratory and the forms of obedience we so deplored in the Nazi epoch. The differences in the two situations are, of course, enormous, yet the difference in scale, numbers, and political context may turn out to be relatively unimportant as long as certain essential features are retained. The essence of obedience consists in the fact that a person comes to view himself as the instrument for carrying out another person’s wishes, and he therefore no longer regards himself as responsible for his actions. Once this critical shift of viewpoint has occurred in the person, all of the essential features of obedience follow. The adjustment of thought, the freedom to engage in cruel behavior, and the types of justification experienced by the person are essentially similar whether they occur in a psychological laboratory or
    the control room of an ICBM site. The question of generality, therefore, is not resolved by enumerating all the manifest differences between the psychological laboratory and other situations but by carefully constructing a situation that captures the essence of obedience-that is, a situation in which a person gives[…]</p>
  </div>
</div>
`

const arbitraryHtml = `
<pre>
  <strong>Obedience to Authority: An Experimental View (Perennial Classics)</strong>
  <div>
  Obedience to Authority: An Experimental View (Perennial Classics)
  </div>
</pre>
<div id="article">
  <strong>Obedience to Authority: An Experimental View (Perennial Classics)</strong>
  <div>
  Obedience to Authority: An Experimental View (Perennial Classics)
  </div>
  <p>Obedience, because of its very ubiquitousness, is easily overlooked as a subject of inquiry in social psychology. But without an appreciation of its role in shaping human action, a wide range of significant behavior cannot be understood. For an act carried out under command is, psychologically, of a profoundly different character than action that is spontaneous.</p>
  <p>The question arises as to whether there is any connection between what we have studied in the laboratory and the forms of obedience we so deplored in the Nazi epoch. The differences in the two situations are, of course, enormous, yet the difference in scale, numbers, and political context may turn out to be relatively unimportant as long as certain essential features are retained. The essence of obedience consists in the fact that a person comes to view himself as the instrument for carrying out another person’s wishes, and he therefore no longer regards himself as responsible for his actions. Once this critical shift of viewpoint has occurred in the person, all of the essential features of obedience follow. The adjustment of thought, the freedom to engage in cruel behavior, and the types of justification experienced by the person are essentially similar whether they occur in a psychological laboratory or
  the control room of an ICBM site. The question of generality, therefore, is not resolved by enumerating all the manifest differences between the psychological laboratory and other situations but by carefully constructing a situation that captures the essence of obedience-that is, a situation in which a person gives[…]</p>
</div>
`

test('Search article node from direct tag', async () => {
  document.body.innerHTML = htmlWithArticleTags
  const article = searchContentRoot(document)
  expect(article?.getAttribute('id')).toBe('article')
})

test('Search article node from heading tags', async () => {
  document.body.innerHTML = htmlWithHeadingTags
  const article = searchArticleByHeading(
    document,
    document.querySelector(SEMANTIC_HEADINGS.join(','))
  )
  // no parent found
  expect(article?.getAttribute('id')).toBe(null)
})

test("Search article node from body's children", async () => {
  document.body.innerHTML = arbitraryHtml
  const article = searchArticleByParagraph(document)
  expect(article?.getAttribute('id')).toBe('article')
})
