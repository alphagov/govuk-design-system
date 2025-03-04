import { getConsentCookie } from './../components/cookie-functions.mjs'
import EmbedCard from './../components/embed-card.mjs'

/**
 * Add intersection observer for each Embed Card
 * for lazy load functionality of Embed Card component
 *
 * @param {Element[]} $embedCards - list of Embed Cards
 */
function addEmbedCardObservers($embedCards) {
  const lazyEmbedObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        try {
          // eslint-disable-next-line no-new
          new EmbedCard(entry.target)
        } catch (error) {
          console.log(error)
        }

        lazyEmbedObserver.unobserve(entry.target)
      }
    })
  })

  $embedCards.forEach(function (lazyEmbed) {
    lazyEmbedObserver.observe(lazyEmbed)
  })
}

/**
 * Initialisation for instance of Embed Card components,
 *
 * Ensures that lazy loading functionality is added when
 * consent cookies are enabled (including if the user accepts
 * them while on the page). EmbedCard component only initialised
 * when in viewport and cookies accepted.
 */
export function initialiseEmbedCards() {
  const $embedCards = Array.from(
    document.querySelectorAll('[data-module="app-embed-card"]')
  )

  const userConsent = getConsentCookie()

  if (userConsent && userConsent.campaign && 'IntersectionObserver' in window) {
    addEmbedCardObservers($embedCards)
  } else {
    document.addEventListener('cookieAccepted', function () {
      addEmbedCardObservers($embedCards)
    })
  }
}
