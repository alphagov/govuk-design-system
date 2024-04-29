import rehypeParse from 'rehype-parse'
import { unified } from 'unified'

import * as css from './css.mjs'
import * as javascript from './javascript.mjs'

export const processor = unified().use(rehypeParse)
export { javascript, css }
