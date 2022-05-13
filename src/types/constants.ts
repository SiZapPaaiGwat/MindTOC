export const LEGAL_PROTOCOLS = ['https', 'http', 'file']

export const CONTAINER_ID = 'mind_toc_container'

export const SEMANTIC_HEADINGS = 'h1,h2,h3,h4,h5,h6'.split(',')

// Reject these tags when extrating headings
export const IGNORED_TAGS =
  'header,footer,nav,aside,ul,ol,table,menu,dl,menu,pre,code,script,svg,style,datalist,select,template,noscript,form,button,iframe'.split(
    ','
  )

/**
 * Minimum density of text to be considered as an article.
 * We use different density according to content size, since some arbitrary pages have many redundant tags.
 */
export const TEXT_DENSITZY_THRESHOLD = {
  LONG_TEXT: 2,
  SHORT_TEXT: 10
}

export const LONG_ARTICLE_THERESHOLD = 1000

// If a node contains a lot of links, it is not a part of an article.
// Some website pages like wikipedia contains a lot of links, especially hidden links.
export const LINK_DENSITY_THRESHOLD = 0.5

// If text size of a node's child links occupies of this proportion, it is not a part of an article.
export const LINK_TEXT_THERESHOLD = 0.3

// Most text contents of a toc node are from internal anchors
export const TOC_NODE_TEXT_DENSITY_THRESHOLD = 0.5
