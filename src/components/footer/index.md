---
title: Footer
description: The footer provides copyright, licensing and other information about your service and department
section: Components
aliases: privacy notice, accessibility statement, terms and conditions
layout: layout-pane.njk
---

{% from "_example.njk" import example %}

The footer provides copyright, licensing and other information about your service.

If you use the page template, you'll also get the footer without having to add it, as it's included by default.

The Land Registry footer is complementary to the GOV.UK footer so that users are reassured they are working with a Government department, and can use the familiar conventions they have learnt from interacting with the UK Government.

{{ example({group: "components", item: "footer", example: "default", html: true, nunjucks: true, open: false}) }}

## When to use this component

### GOV.UK footer

You must use the GOV.UK footer at the bottom of every page if your service is being hosted on one of these domains:

- gov.uk/myservice
- myservice.service.gov.uk
- myblog.blog.gov.uk

### Land Registry footer

You must use the Land Registry Government footer at the bottom of every page if your service is being provided:

- as a public or professional user service, but is not hosted on a gov domain
- is for staff

## How it works

The Land Registry footer works exactly the same as the GOV.UK footer, but replaces the GOV.UK specific content. The Crown copyright coat of arms and link, and the Open Government License, are removed. The Crown copyright coat of arms is replaced by the HM Land Registry logo.

This is the first version of the Land Registry footer. It's a simpler version than the GOV.UK footer.

If you need to extend its use, you should extend it in the same was as the GOV.UK footer is used.


## Adding links

You can add links to:

- [privacy notice](https://www.gov.uk/service-manual/design/collecting-personal-information-from-users)
- [accessibility statement](https://www.gov.uk/service-manual/helping-people-to-use-your-service/publishing-information-about-your-services-accessibility)
- [cookies page](https://design-system.service.gov.uk/patterns/cookies-page/)
- terms and conditions
- other language options

Use ‘Privacy’, ‘Accessibility’, ‘Cookies’ and ‘Terms and conditions’ for the link text.

## Adding secondary navigation

Only add secondary GOV.UK navigation if you’re creating a GOV.UK service, and you want users to be able to navigate away from the service to somewhere else on the GOV.UK website. For example, you probably don’t want to encourage a user to navigate away from a linear, form-type service.

{{ example({group: "components", item: "footer", example: "populated", html: true, nunjucks: true, open: false}) }}
