# Redirects from the old domain

During private beta we used the domain
https://govuk-design-system-production.cloudapps.digital which we shared with
private beta partners.

Now that we have a service domain, we need to redirect anyone who is still
referencing that old URL.

To do this we have set up a [simple CloudFoundry app][app] which uses the nginx
buildpack to redirects any requests to the service domain.

## Deployment

This app was deployed manually using the CloudFoundry command line tools.

[app]: https://github.com/alphagov/govuk-design-system-redirect
