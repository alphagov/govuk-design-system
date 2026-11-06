module.exports = function (hljs) {
  return {
    name: 'Nunjucks',
    aliases: ['nj', 'njk', 'nunjucks'],
    case_insensitive: true,
    subLanguage: 'xml',
    contains: [
      // Block comments
      {
        className: 'comment',
        begin: /\{%\s*comment\s*%\}/v,
        end: /\{%\s*endcomment\s*%\}/v
      },
      // Line comments
      {
        className: 'comment',
        begin: /\{#/v,
        end: /#\}/v
      },
      // Template variables
      {
        className: 'tag',
        begin: /\{\{\s*/v,
        end: /\s*\}\}/v,
        contains: [
          {
            className: 'title',
            begin: /(?<!\|\s*)\b\w+(?=\s*\()/v,
            relevance: 0
          },
          {
            begin: /\(\{/v,
            end: /\}\)/v,
            subLanguage: 'javascript'
          },
          {
            className: 'name',
            begin: /\w+/v
          },
          {
            className: 'operator',
            begin: /\|/v
          },
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE
        ]
      },
      // Template tags
      {
        className: 'tag',
        begin: /\{%-?\s*/v,
        end: /-?%\}/v,
        contains: [
          {
            className: 'keyword',
            begin:
              /\b(autoescape|endautoescape|block|endblock|for|endfor|if|endif|else|elif|include|extends|set|endset|filter|endfilter|with|endwith|macro|endmacro|call|endcall|raw|endraw|import|from|trans|endtrans|pluralize|debug|spaceless|endspaceless|csrf_token|cycle|url|lorem)\b/v
          },
          {
            className: 'variable',
            begin: /\b\w+/v,
            relevance: 0
          },
          {
            className: 'operator',
            begin: /\b(and|or|not|in|is|as|by)\b/v
          },
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE
        ]
      }
    ]
  }
}
