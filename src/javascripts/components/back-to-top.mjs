function BackToTop ($module) {
  this.$module = $module
}

BackToTop.prototype.init = function () {
  if (!this.$module) {
    return
  }

  // Check if we can use Intersection Observers
  if (!('IntersectionObserver' in window)) {
    // If there's no support fallback to regular behaviour
    // Since JavaScript is enabled we can remove the default hidden state
    return this.$module.classList.remove('app-back-to-top--hidden')
  }

  var $footer = document.querySelector('.app-footer')
  var $subNav = document.querySelector('.app-subnav')

  // Check if there is anything to observe
  if (!$footer || !$subNav) {
    return
  }

  var footerIsIntersecting = false
  var subNavIsIntersecting = false
  var subNavIntersectionRatio = 0

  var observer = new window.IntersectionObserver(function (entries) {
    // Find the elements we care about from the entries
    var footerEntry = entries.find(function (entry) {
      return entry.target === $footer
    })
    var subNavEntry = entries.find(function (entry) {
      return entry.target === $subNav
    })

    // If there is an entry this means the element has changed so lets check if it's intersecting.
    if (footerEntry) {
      footerIsIntersecting = footerEntry.isIntersecting
    }
    if (subNavEntry) {
      subNavIsIntersecting = subNavEntry.isIntersecting
      subNavIntersectionRatio = subNavEntry.intersectionRatio
    }

    // If the subnav or the footer not visible then fix the back to top link to follow the user
    if (subNavIsIntersecting || footerIsIntersecting) {
      this.$module.classList.remove('app-back-to-top--fixed')
    } else {
      this.$module.classList.add('app-back-to-top--fixed')
    }

    // If the subnav is visible but you can see it all at once, then a back to top link is likely not as useful.
    // We hide the link but make it focusable for screen readers users who might still find it useful.
    if (subNavIsIntersecting && subNavIntersectionRatio === 1) {
      this.$module.classList.add('app-back-to-top--hidden')
    } else {
      this.$module.classList.remove('app-back-to-top--hidden')
    }
  }.bind(this))

  observer.observe($footer)
  observer.observe($subNav)
}

export default BackToTop
