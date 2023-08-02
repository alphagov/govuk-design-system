# Logs

We keep router logs ([GoRouter](https://docs.cloudfoundry.org/concepts/architecture/router.html)) and general application logs for 14 days and anonymise IP addresses.

These logs are used for basic analytics.

Our Content Delivery Network (CDN) logs are not currently available, this means many requests are not shown in the router logs.
However, we do not currently cache HTML requests (pages) so router logs are still useful for pages visited.

The GOV.UK Design System website's logs are sent to
the [`GOV.UK Design System Production` Logstash stack (Logit.io)](https://logit.io/a/1c6b2316-16e2-4ca5-a3df-ff18631b0e74) using the `logit-ssl-drain` service.

- The `logit-ssl-drain` service is bound to the website application in the [manifest services config option](/deploy/manifest.yml). The GOV.UK PaaS team should be able to help with questions about how data is sent to Logit.
- The hosted Logstash (Logit.io) is maintained by the Reliability Engineering team. We followed the [Logit setup guidance to configure our stack](https://reliability-engineering.cloudapps.digital/logging.html#get-started-with-logit).

When the raw logs are sent to Logstash they are transformed using Logstash Filters so they can be queried in Kibana for visualisations and querying.

## Logging into Logit.io

Follow the Reliability engineering ['getting started with logit'](https://reliability-engineering.cloudapps.digital/logging.html#get-started-with-logit) instructions to login with your Google account.

You'll then need to ask the technical lead on the GOV.UK Design System team to give you access to the [GOV.UK Design System Production stack](https://logit.io/a/1c6b2316-16e2-4ca5-a3df-ff18631b0e74).

## How we transform logs with Logstash Filters

The configuration is based on the [GOV.UK PaaS setup instructions](https://docs.cloud.service.gov.uk/monitoring_apps.html#configure-logstash-filters), see [git history for updates](https://github.com/alphagov/govuk-design-system/commits/main/docs/logs.md).

**We use this file as version control for the Logit Filters for our stack. Please make sure to update the below code snippet in this file whenever changing Filters. We recommend pairing on updating filters as they are easy to break.**

### Configuration

```ruby
filter {
  grok {
    # attempt to parse syslog lines
    match => { "message" => "%{SYSLOG5424PRI}%{NONNEGINT:syslog_ver} +(?:%{TIMESTAMP_ISO8601:syslog_timestamp}|-) +(?:%{HOSTNAME:syslog_host}|-) +(?:%{NOTSPACE:syslog_app}|-) +(?:%{NOTSPACE:syslog_proc}|-) +(?:%{WORD:syslog_msgid}|-) +(?:%{SYSLOG5424SD:syslog_sd}|-|) +%{GREEDYDATA:syslog_msg}" }
    # if successful, save original `@timestamp` and `host` fields created by logstash
    add_field => [ "received_at", "%{@timestamp}" ]
    add_field => [ "received_from", "%{host}" ]
    tag_on_failure => ["_syslogparsefailure"]
  }

  # parse the syslog pri field into severity/facility
  syslog_pri { syslog_pri_field_name => 'syslog5424_pri' }

  # replace @timestamp field with the one from syslog
  date { match => [ "syslog_timestamp", "ISO8601" ] }

  # Cloud Foundry passes the app name, space and organisation in the syslog_host
  # Filtering them into separate fields makes it easier to query multiple apps in a single Kibana instance
  dissect {
    mapping => { "syslog_host" => "%{[cf][org]}.%{[cf][space]}.%{[cf][app]}" }
    tag_on_failure => ["_sysloghostdissectfailure"]
  }

  # Cloud Foundry gorouter logs
  if [syslog_proc] =~ "RTR" {
    mutate { replace => { "type" => "gorouter" } }
    grok {
      match => { "syslog_msg" => "%{HOSTNAME:[access][host]} - \[%{TIMESTAMP_ISO8601:router_timestamp}\] \"%{WORD:[access][method]} %{NOTSPACE:[access][url]} HTTP/%{NUMBER:[access][http_version]}\" %{NONNEGINT:[access][response_code]:int} %{NONNEGINT:[access][body_received][bytes]:int} %{NONNEGINT:[access][body_sent][bytes]:int} %{QUOTEDSTRING:[access][referrer]} %{QUOTEDSTRING:[access][agent]} \"%{HOSTPORT:[access][remote_ip_and_port]}\" \"%{HOSTPORT:[access][upstream_ip_and_port]}\" x_forwarded_for:\"%{IP}, %{IP}, %{IP}\" %{GREEDYDATA:router_keys}" }
      tag_on_failure => ["_routerparsefailure"]
      add_tag => ["gorouter"]
    }
    # replace @timestamp field with the one from router access log
    date {
      match => [ "router_timestamp", "ISO8601" ]
    }
    kv {
      source => "router_keys"
      target => "router"
      value_split => ":"
      remove_field => "router_keys"
    }
  }

  # Application logs
  if [syslog_proc] =~ "APP\/PROC\/WEB" {
    grok {
      match => { "syslog_msg" => "NginxLog \"%{WORD:[access][method]} %{NOTSPACE:[access][url]} HTTP/%{NUMBER:[access][http_version]}\" %{NONNEGINT:[access][response_code]:int} %{NONNEGINT:[access][body_received][bytes]:int}" }
      tag_on_failure => ["_appparsefailure"]
      add_tag => ["app"]
    }
  }

  # Extract file extension from URL
  if [access][url] {
      grok {
          match => { "[access][url]" => ".+\.%{WORD:[access][extension]}" }
      }
  }

  # Extract query string
  if [access][url] {
    grok {
      match => [ "[access][url]", "%{URIPARAM:[access][querystring]}" ]
    }
  }

  # Replace the message and source_host fields
  mutate {
    rename => [ "syslog_host", "source_host" ]
    rename => [ "syslog_msg", "message" ]
  }

  # Update the original message to remove potentially personally identifiable information
  mutate {
    gsub => [
      # redact all IP addresses
      # You can't use grok patterns so copying manually the IPv4 pattern from https://github.com/logstash-plugins/logstash-patterns-core/blob/master/patterns/grok-patterns
      "message", "(?<![0-9])(?:(?:[0-1]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])[.](?:[0-1]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])[.](?:[0-1]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])[.](?:[0-1]?[0-9]{1,2}|2[0-4][0-9]|25[0-5]))(?![0-9])", "[redacted-ip]"
    ]
    tag_on_failure => ["_redactingmessagefailure"]
  }
}
```

### How the filter turns the raw logs into fields

Using filters we turn the raw log message into individual fields which can then be stored in Elasticsearch and [queried in Kibana](#querying-and-visualising-logs-with-kibana).

You can think of the input data as an object containing a message as a string, for this example we're using the [Common Log Format](https://en.wikipedia.org/wiki/Common_Log_Format#Example).

```json
{
  "message": "127.0.0.1 user-identifier frank [10/Oct/2000:13:55:36 -0700] \"GET /apache_pb.gif HTTP/1.0\" 200 2326"
}
```

To split the data out we use the [grok plugin filter](https://www.elastic.co/guide/en/logstash/current/plugins-filters-grok.html) which allows us to match patterns in the string using regex and then assign them to new fields.

```ruby
filter {
  grok {
    match => { "message" => "%{IP:user_ip} %{WORD:user_agent} %{WORD:username} %{TIMESTAMP:timestamp} \"%{WORD:method} %{URI:url} %{WORD:protocol}\" %{INTEGER:response_code} %{INTEGER:bytes}" }
  }
}
```

In this example, the syntax `%{IP:user_ip}` means to match the IP address using the [IP regex pattern](#using-grok-regex-patterns) and then assign it to the field `user_ip`.
If the match is successful we end up with a document that looks like the following:

```json
{
  "message": "127.0.0.1 user-identifier frank [10/Oct/2000:13:55:36 -0700] \"GET /apache_pb.gif HTTP/1.0\" 200 2326",
  "user_ip": "127.0.0.1",
  "user_agent": "user-identifier",
  "username": "frank",
  "timestamp": "[10/Oct/2000:13:55:36 -0700]",
  "method": "GET",
  "url": "/apache_pb.gif",
  "protocol": "HTTP/1.0",
  "response_code": "200",
  "bytes": "2326"
}
```

## Filter plugins

Logit.io allows you to use use all the [official plugins](https://www.elastic.co/guide/en/logstash/current/filter-plugins.html).

## Using grok regex patterns

When using the [`grok plugin`](https://www.elastic.co/guide/en/logstash/current/plugins-filters-grok.html) you can reference global 'patterns' which are aliases for common regex patterns, for example such as ‘IP’, these are defined in [logstash-patterns-core/patterns/grok-patterns](https://github.com/logstash-plugins/logstash-patterns-core/blob/master/patterns/grok-patterns).

## Updating the Logstash Filters

1. go to the [Logit dashboard Logstash Filters page](https://logit.io/a/1c6b2316-16e2-4ca5-a3df-ff18631b0e74/s/c5df6a7b-07bb-483a-a69b-49c9629309b6/filters).
2. make updates as required.
3. select Validate.
   If something goes wrong and the interface fails to respond, Logit support are proactive and can help you out, they have a support live chat you can also use.
4. select Apply once the code is valid.
   When you've successfully applied a filter change Kibana wont show events coming in for a minute or so.
5. update the [configuration](#configuration) with your changes.

If you've added new fields and want to use them in a Kibana filter / visualisation you'll need to [refresh the index pattern](#refreshing-index-patterns).

## Querying and visualising logs with Kibana

Transformed logs can be accessed in the [Logit Kibana dashboard](<https://kibana.logit.io/app/kibana#/discover?_g=()>).

### Dashboards

- [metrics](https://kibana.logit.io/app/kibana#/dashboard/f9b0d520-2346-11ea-9ca6-d1e81c1bed53)
- [developer metrics](https://kibana.logit.io/app/kibana#/dashboard/03bc8c80-2347-11ea-9ca6-d1e81c1bed53)

### Example queries

- [Page visits](https://kibana.logit.io/goto/43b97c384d92a2318db416759f341c08)
- [Requests that are not found](https://kibana.logit.io/goto/09da28d6907e07868998b05872be609c)

### How to make a "Page visits" visualisation

#### Create a new visualisation

1. Go to the [visualisations page](<https://kibana.logit.io/app/kibana#/visualize?_g=()>).
2. Press `Create new visualisation`.
3. Pick type of visualisation eg. `Vertical Bar`.
4. Choose the `*-*` index pattern.
5. Save using `Design System -` prefix for easier searching later on.
6. Under `Buckets`, press `Add` and choose `X-axis`.
7. Under `Aggregation`, choose `Date histogram` (All our current metrics use the date histogram but you could also explore other options).
8. Under `Minimum interval`, choose `Daily`.
9. Click the play button to run your selection (the button is in the top right hand corner of the container, next to `x`).
10. You should see a bar chart of the data. If the chart doesn't look right, make sure that you've chosen an appropriate period under `Show dates` eg. `Last 14 days`.
11. Press `Save` and then `Confirm save`.

#### Add filters to your visualisation

1. Choose `Discover` in the left hand side menu.
2. Press `Add filter`.
3. In `Edit filter`, set the desired properties and values to filter for. For example, to create a filter to get requests with status code 200, set `Field` to `access.response_code`, `Operator` to `is` and `Value` to `200`. See [Page visits](https://kibana.logit.io/goto/43b97c384d92a2318db416759f341c08) for the filters we used to create that visualisation.
4. Press `Save` and then `Confirm save`.

#### Optional: Create a new dashboard

You might wish to do this for testing purposes, rather than changing the Design System dashboard.

1. Go to the [Dashboards page](https://kibana.logit.io/app/kibana#/dashboards).
2. Press "Create a new dashboard".
3. Press "Save".

#### Add your visualisation to a dashboard

1. Go to the [Dashboards page](https://kibana.logit.io/app/kibana#/dashboards)). Choose the Design System board or another one (see [Create a new dashboard](#optional-create-a-new-dashboard).)
2. Press `Edit`.
3. Press `Add`.
4. Search for `Design System-`.
5. Click on the visualisation you want to add to the dashboard.
6. Save the dashboard, do not make it a new dashboard.

### Refreshing index patterns

In order to use some fields in visualisations / filters you need to refresh the field list index.

1. go to the [index pattern page](<https://kibana.logit.io/app/kibana#/management/kibana/index_patterns/8ac115c0-aac1-11e8-88ea-0383c11b333a?_g=()&_a=(tab:indexedFields)>)
2. press refresh field list icon at top right of screen.

Refreshing will reset the popularity counters of fields, which is used to display your most popular used fields in the interface, but this is safe to do.

## Debugging a failed Logstash Filters parse

For some Logstash Filters tags are added to the log which indicate they have failed, for example `_routerparsefailure`.
You can debug this by looking at the `message` field.
