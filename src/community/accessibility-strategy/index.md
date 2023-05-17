---
title: Accessibility strategy
description: Outlines the current principles and work needed to improve the accessibility of the GOV.UK Design System
section: Community
theme: How we work
layout: layout-pane.njk
show_page_nav: true
order: 9
---

This accessibility strategy outlines the current principles and work needed to improve the accessibility of the GOV.UK Design System.

The primary goals of this strategy are to inform decision-making and enhance the success of accessibility-related activities within the GOV.UK Design System team. Given the continuous and iterative nature of accessibility work, this strategy will continue to change and adapt over time.

Using the GOV.UK Design System in a service does not immediately make that service accessible. Additional research, design, development and testing work is needed to make any service accessible, even when using accessible styles, components and patterns.

## Accessibility and design systems

At least [1 in 5 people report having a disability](https://www.scope.org.uk/media/disability-facts-figures/) in the UK, making accessibility an essential consideration for all UK Government services and websites. The GOV.UK Design System supports hundreds of services, which receive millions of views every month. Embedding web accessibility within a central design system allows us to influence baseline accessibility across these hundreds of services.

To learn more about why accessibility is essential when building digital services, [read the ‘understanding accessibility requirements’ guidance for public sector bodies](https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps).

## Principles for increasing accessibility

The GOV.UK Design System team follows 3 sets of principles to increase the accessibility of government services.

### Web accessibility

We follow the [4 principles of web accessibility](https://www.w3.org/WAI/WCAG21/Understanding/intro#understanding-the-four-principles-of-accessibility) upon which WCAG is based:

1.  Perceivable – Information and user interface components must be presentable to users in ways they can perceive.   
2.  Operable – User interface components and navigation must be operable.   
3.  Understandable – Information and the operation of the user interface must be understandable. 
4.  Robust – Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies.   

### Universal design

When designing accessible styles, components and patterns, we aim to follow [the 7 principles of universal design](https://universaldesign.ie/What-is-Universal-Design/The-7-Principles/):

1.  Equitable use – The design is useful and marketable to people with diverse abilities. 
2.  Flexibility in use – The design accommodates a wide range of individual preferences and abilities.
3.  Simple and intuitive use – The design is easy to understand, regardless of the user's experience, knowledge, language skills, or current concentration level.
4.  Perceptible information – The design communicates necessary information effectively to the user, regardless of ambient conditions or the user's sensory abilities.
5.  Tolerance for error – The design minimises hazards and the adverse consequences of accidental or unintended actions.
6.  Low physical and cognitive effort – The design can be used efficiently and comfortably and with minimum fatigue.
7.  Size and space for approach and use – The design provides appropriate sizing and spacing of elements, allowing the user to interact successfully.    

Modifications to principles 6 and 7 are to make sure they apply to web-based designs rather than physical spaces.

### Progressive enhancement

We use progressive enhancement when building styles, components and patterns and encourage service teams to use the same approach.

Progressive enhancement assists in web accessibility by encouraging teams to build resilient services.

1.  Start with proper semantic HTML. The semantic structure helps build an organised and accurate accessibility tree for assistive technologies like screen readers.
2.  Ensure the main content is available without CSS. This availability helps accommodate custom user stylesheets and forced colour modes.
3.  Build an experience that works well without JavaScript. Offer accessible JavaScript enhancements when it improves the user experience. Even in cases where this is not achieved, provide fallback options for interactive elements that use JavaScript.

[Learn more about progressive enhancement in the Service Manual](https://www.gov.uk/service-manual/technology/using-progressive-enhancement).

## Prioritising accessibility concerns

An ‘accessibility concern’ is our umbrella term for any question about the accessibility of a portion of a product.

Accessibility concerns can surface in any product, including:

-   [GOV.UK Frontend](https://design-system.service.gov.uk/get-started/production/)
-   the [GOV.UK Design System website](https://design-system.service.gov.uk/)
-   the [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk/)
-   the [GOV.UK Frontend technical documentation website](https://frontend.design-system.service.gov.uk/)
-   other content produced by the GOV.UK Design System team

The GOV.UK Design System’s top focus for accessibility is on styles and components included in GOV.UK Frontend and patterns built using GOV.UK Frontend.

When the team encounters multiple accessibility concerns across multiple products, we prioritise work based on the impact on users of government services. Due to the broad reach of GOV.UK Frontend, the team are likely to prioritise accessibility concerns above concerns in other products they manage.

Our goal is to focus first on high-risk and high-impact accessibility concerns in the products that directly impact end-users and the public.

### Accessibility concern types

The team puts accessibility concerns in 2 categories:

1.  Theoretical: A question or statement regarding the accessibility of an implementation within the Design System without evidence of real-world impact. 
2.  Evidenced: Sharing new research, data or evidence showing that an implementation within the Design System could cause barriers for disabled people.

The team will usually prioritise evidenced issues and queries over theoretical ones.

Feedback from users and other proof of real-world impact provides much stronger evidence for the team, especially when determining priority and urgency. When resolving an accessibility concern involves a solution that causes a [breaking change](#breaking-releases-and-breaking-changes), strong evidence helps justify the change.

#### Theoretical accessibility concerns

Theoretical issues and queries are more difficult to address as they do not provide new evidence or relevant research.

For accessibility concerns about the theoretical accessibility of an implementation, the team will check for:

-   existing decisions documented regarding the current implementation
-   overlap with other raised issues and queries
-   additional community resources related to the accessibility concern

If there is no documentation or confirmation that the current implementation is an evidenced accessibility concern, the team may:

-   check for existing evidence or research within the GOV.UK Design System
-   request additional evidence or research from the group who submitted the accessibility concern
-   assume that the reasoning behind existing decisions and implementations was sound until further evidence is found
-   assume that previous decisions for the GOV.UK Design System were made in good faith
-   wait for new evidence or factors to emerge before questioning previous decisions

This approach supports the team closing accessibility concerns which do not include enough evidence to be meaningfully acted upon, allowing the team to focus on evidenced accessibility concerns.

#### Evidenced accessibility concerns

Many types of evidence can indicate an evidenced accessibility concern, but some of the most common examples are:

-   new findings from user research    
-   service team usability testing results
-   new global best-practises or standards
-   direct feedback from users of a service or product
-   a demonstration of unintended behaviour from an assistive technology
-   results from an internal or external accessibility audit

When presented with new evidence of a potential accessibility concern, the team will analyse and determine whether the concern:

-   has been addressed or assessed before
-   breaks WCAG AA compliance
-   is high-severity (as defined in the section below)

### Determining severity of an accessibility concern

There are 3 factors to determine a high-severity concern:

-   there is reasonable evidence that it makes it difficult or impossible for some people to complete certain tasks
-   it affects the accessibility of essential services or critical infrastructure
-   individual service teams cannot efficiently resolve it on their own

If the accessibility concern does not meet all 3 factors listed, the team will determine the severity on a case-by-case basis.

Low and medium severity are not defined in this document and will be determined by the team as needed.

### Disagreement on accessibility concerns

Sometimes, the existence, urgency or strength of evidence for an accessibility concern is not universally agreed. In these cases, we follow 3 increasing levels for escalation.

#### Level 1 for disagreement escalation

If the GOV.UK Design System team can confirm the accessibility concern internally, then work can continue normally.

#### Level 2 for disagreement escalation

If the GOV.UK Design System team is unable to confirm the accessibility concern or disagrees with the raised concern, then the following steps are taken to resolve the disagreement:

1.  Assess the severity of the accessibility concern (as defined in the section above)
2.  If the accessibility concern is not [high-severity](#determining-severity-of-an-accessibility-concern), continue to hold discussions within the team and any frontend and accessibility communities where applicable

#### Level 3 for disagreement escalation

If the severity is high and the GOV.UK Design System is still unable to confirm the accessibility concern or disagrees with the raised concern, then check with the GDS accessibility monitoring team for a second opinion.

If the GDS accessibility monitoring team confirms the accessibility concern, set a priority level for the concern.

When disagreement involves multiple parties, the decision-making hierarchy is:

-   Top: GDS accessibility monitoring team
-   Second: GOV.UK Design System team (including any accessibility specialists on the team)
-   Third: External auditing groups and teams

It is not regularly the role of the GDS accessibility monitoring team to make decisions like these, and this decision-making process is unique to the GOV.UK Design System team. This is due to the centralised nature of the GOV.UK Design System and the limited capacity of the GDS accessibility monitoring team. Other service teams will need to determine their decision-making method when disagreements over accessibility concerns arise.

## Baseline WCAG accessibility compliance

We aim to meet level AA WCAG for:

-   styles, components and patterns
-   the GOV.UK Design System website
-   the GOV.UK Frontend technical documentation website
-   other content produced by the GOV.UK Design System team

We aim to maintain this level AA rating for the version of WCAG which:

-   is considered the ‘latest published version’
-   has been published for at least a year

For example, in August 2022, we would follow the [WCAG 2.1 recommendation from 05 June 2018](https://www.w3.org/TR/2018/REC-WCAG21-20180605/).

The one year gap between a WCAG version’s release and when we support it allows our team the necessary time to update the GOV.UK Design System’s styles, components and patterns, and the team’s other products.

If regulations require updates to occur at an earlier date or to meet a newer version of WCAG, the regulatory requirement will take precedence.

### Improving baseline compliance

Where feasible, the team aims to identify areas where they can surpass WCAG AA guidelines to provide a more accessible design system. WCAG does not cover all aspects of accessibility, and when the team identifies an opportunity to go beyond compliance to improve accessibility, they will explore that opportunity.

The team initially releases changes to the GOV.UK Design System at baseline WCAG AA compliance. Releasing a baseline WCAG-compliant version allows service teams to implement components sooner. After the initial release, the GOV.UK Design System team will prioritise further accessibility improvements where possible.

There are some AAA criteria and other accessibility improvements that the team can consistently deliver during our normal contribution processes. However, meeting AAA criteria is not a requirement nor guarantee for any portion of the GOV.UK Design System and its products.

When working on individual styles, components and patterns, the team may determine that it is possible and feasible to meet additional AAA criteria.

When feasible, the team aims to pursue the additional level of AAA compliance when the following factors are met:

1.  There is team capacity for the time and effort needed to implement a solution.
2.  The solution will not negatively affect any competing higher-priority accessibility activities.
3.  The solution doesn't begin failing several previously-met AAA criteria in an effort to pass a single AAA criterion.
4.  The solution continues to pass all A and AA WCAG criteria.
5.  The solution is easy or practical for service teams to implement.
6.  Service teams can consistently implement the solution without significant risk of inaccessible implementation.
7.  The solution works across the versions of [browsers and assistive technologies supported by GOV.UK Frontend](https://github.com/alphagov/govuk-frontend#browser-and-assistive-technology-support).

If the factors above are not met, the team should document which AAA criteria were discussed, but not pursued and which factors led to the decision.

## Testing accessibility concerns

The team uses the [GOV.UK Service Manual guidance on testing for accessibility](https://www.gov.uk/service-manual/helping-people-to-use-your-service/testing-for-accessibility) and tests the accessibility of each component using a mix of testing tools, automated testing during deployment and manual testing.

### Testing tools

The team uses a variety of tools during the development process, including, but not limited to:

-   WAVE browser plugin
-   Axe browser plugin
-   browser accessibility reports

The team also uses general inspection techniques, including:

-   [sensory inspection](https://web.dev/a11y-tips-for-web-dev/) (visual, auditory, etc.)
-   HTML inspection using [browser developer tools](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools)
-   [accessibility tree](https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree) inspection

### Automated testing

The team currently uses [jest-axe](https://github.com/nickcolley/jest-axe) as part of our deployment process, along with [@axe-core/puppeteer](https://github.com/dequelabs/axe-core-npm/blob/develop/packages/puppeteer). These tools test the example code snippets in the GOV.UK Design System against [axe-core](https://github.com/dequelabs/axe-core).

The team does not solely rely on automated testing processes, as a 2017 study from GDS concluded that [only ~30% of issues are found by automated testing tools](https://accessibility.blog.gov.uk/2017/02/24/what-we-found-when-we-tested-tools-on-the-worlds-least-accessible-webpage), such as axe-core.

As of May 2023, we have improved our automated accessibility testing processes:

1.  We now run JavaScript in our test example code snippets.
2.  We now test every example code snippet, instead of just the first example per component.
3.  We replaced our [jest-axe](https://github.com/nickcolley/jest-axe) analysis code with [@axe-core/puppeteer](https://github.com/dequelabs/axe-core-npm/blob/develop/packages/puppeteer), but kept jest-axe for outputting pass/fail test results. This change allows axe-core to now also check for colour contrast.
4.  We added [html-validate](https://html-validate.org/) to our automated tests. This helps us test for HTML compliance, including [various WCAG 2.1 checks available through html-validate](https://html-validate.org/wcag.html).

We have an accessibility activity issue in GitHub where we track our efforts to [enhance automated testing in our development pipeline](https://github.com/alphagov/govuk-frontend/issues/3041).

### Manual testing

Manual testing for a style, component or pattern follows our own [accessibility acceptance criteria](https://github.com/alphagov/govuk-frontend/blob/main/docs/contributing/test-components-using-accessibility-acceptance-criteria.md).

Additionally, the team follows the [GOV.UK Service manual guidance on testing with assistive technologies](https://www.gov.uk/service-manual/technology/testing-with-assistive-technologies).

The team records results on our [accessibility testing spreadsheet (Google Sheet)](https://docs.google.com/spreadsheets/d/1O0rWoH3ah_rj2iJ2We9VfyHNOr0gOVItXRy3vKzuYSw/edit?usp=sharing), which lists the specific browser and assistive technology combinations with which we test.

Currently, the team uses desktop-type devices to access assistive technologies in the following ways:

-   screen readers through Assistiv Labs and macOS
-   screen magnifiers through Assistiv Labs and macOS
-   high contrast and other display modes through Assistiv Labs and browsers
-   speech recognition software through Windows testing computers and macOS

As of November 2022, there are limitations to how the team performs and records manual testing. These limitations may be addressed by the proposed ‘[Standardise and improve our manual testing methodology](https://github.com/alphagov/govuk-design-system/issues/2456)’ activity.

### User research and usability testing

Accessibility user research often includes activities such as:

-   usability testing of prototypes
-   user interviews
-   surveys

[User research must include disabled people](https://www.gov.uk/service-manual/helping-people-to-use-your-service/making-your-service-accessible-an-introduction#meeting-government-accessibility-requirements) and should also include people with a variety of access needs and impairment types.

The majority of accessibility user research results are contributed by service teams and the broader communities that use the GOV.UK Design System.

The team does not do additional user research for every new contribution as standard.

The team might determine that further accessibility user research is necessary for complex or sensitive components and design patterns. If further research is needed, the team will decide if it’s best to handle the research internally or in partnership with one or more service teams.

Examples of when the team and other service teams have completed additional accessibility user research include:

-   [Focus state](https://designnotes.blog.gov.uk/2019/07/29/weve-made-the-gov-uk-design-system-more-accessible/) (2019)
-   [General component accessibility research](https://github.com/alphagov/govuk-design-system/issues/1377) (2020)
-   [Hide this Page component](https://github.com/alphagov/govuk-design-system/issues/2195) (2022)

## Recording accessibility concerns

Individuals and teams can raise an accessibility concern as either a GitHub issue or a query from any other supported channel.

If an incoming query is more than a quickly-answered question, it will be recorded as a GitHub issue.

By keeping accessibility concerns in the same place as all our GitHub issues, the team can more easily identify accessibility concerns related to other items. Addressing and storing accessibility concerns separate from GitHub issues could lead to them receiving less attention.

If an accessibility concern turns out to be a bug the team cannot quickly fix, the team will determine whether it should be recorded in the [GOV.UK Design System accessibility statement](https://design-system.service.gov.uk/accessibility/).

We also will record relevant accessibility concerns for specific styles, components or patterns in their corresponding guidance pages.

### Recording WCAG compliance status

If the GOV.UK Design System does not meet the requirements of level AA accessibility compliance, the team will update the [GOV.UK Design System accessibility statement](https://design-system.service.gov.uk/accessibility/) and keep the records of changes required until compliance is met.

## Proposed accessibility activities

One of the goals of this strategy is to outline the work needed to improve the accessibility of the GOV.UK Design System. We document this work as a set of proposed activities, presented in a GitHub project.

[Accessibility strategy: proposed activities](https://github.com/orgs/alphagov/projects/46)

This GitHub project allows service teams to see the areas of work under consideration, and is intended to enhance the success of the included activities. The project will be reviewed quarterly, to align with quarterly planning.

### Priority levels

We identify the priority of each proposed activity based on the following levels:

1.  what we must do legally
2.  what only we are positioned to do
3.  what reduces the risk of inaccessible implementations
4.  what improves accessibility for many services
5.  what makes it easier for service teams to do their jobs
6.  what is good to do without adding risk to the priorities above

The team will need to decide how much time and effort to spend on activities since work is dependent on finite team capacity.

Higher priority activities should receive a more significant share of the team’s time and effort. Lower priority activities can still receive time and effort, but focusing on lower priority activities should not compromise the completion or success of higher priority activities.

### Activity categories

To help the team manage the number of activities, there are 4 main areas where the team has proposed activities:

1.  Design system fundamentals
2.  Areas the team is best-positioned to handle
3.  Processes in the UK government
4.  Tools and training in GDS

## Performance measurement

Three of the goals of this strategy are to:

-   inform decision-making and prioritisation of accessibility-related matters within the GOV.UK Design System team
-   improve the success, speed, and scope of accessibility-related issues within the GOV.UK Design System team
-   increase awareness, understanding, transparency and participation in accessibility-related cases within government communities and service teams

### Performance indicators

Initially, the team will assess the performance of this accessibility strategy by measuring the:

-   increase in community engagement with the accessibility strategy’s content
-   use of the strategy to guide and improve the GOV.UK Design System team’s decision-making
-   progress and completion of activities mentioned in the strategy
-   number of accessibility concerns recorded as GitHub issues in the team’s repositories
-   number of accessibility concerns listed in the [GOV.UK Design System accessibility statement](https://design-system.service.gov.uk/accessibility/)

#### Additional indicators

If capacity is available to expand measurement efforts, additional performance indicators might include:

-   accessibility testing template use – completion rate, regularity and consistency
-   accessible implementation by service teams – accessibility audit result patterns, service accessibility statement patterns, service team satisfaction
-   service team satisfaction – responses to accessibility-specific questions in surveys and research
-   accessibility concern average time to resolution – the time it takes from the initial recording or reporting of an accessibility concern to its resolution
-   the number of accessibility regressions – checking the robustness of our quality assurance / testing process by measuring how many accessibility bugs make it into a release
-   number of accessibility concerns raised by service teams versus concerns raised internally – to gauge how heavily we rely on users to surface accessibility concerns
-   overall impact of the GOV.UK Design System or the strategy on web accessibility across UK government services – this would require additional resources and expertise, or collaboration with other teams who have the necessary resources and expertise

### Recording performance measurement results

The team will gather performance measurement results every 6 months and record them in the team’s internal documentation. The team will also review the [GOV.UK Design System accessibility statement](https://design-system.service.gov.uk/accessibility/) every 6 months and update as needed.

The team will use the results of performance measurement and accessibility statement reviews to help inform quarterly planning.

## Terms used in this strategy

This section defines terms particular to this accessibility strategy and to the GOV.UK Design System team.

### Accessibility

For the GOV.UK Design System, accessibility specifically refers to web accessibility.

We focus on developing styles, components and patterns that, when combined, can create services that disabled people can use.

The Web Accessibility Initiative (WAI) comprehensively defines web accessibility in their [Introduction to Web Accessibility](https://www.w3.org/WAI/fundamentals/accessibility-intro/).

To learn more about why accessibility is essential when building digital services, [read the ‘understanding accessibility requirements’ guidance for public sector bodies](https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps).

### Accessibility concerns

For this document, an ‘accessibility concern’ is any question about the accessibility of a portion of a product.

Accessibility concerns are those surfaced as either a GitHub issue or a query from any other source. Some, but not all, accessibility concerns will turn out to be bugs or feature requests. Confirmed accessibility bugs will be recorded as GitHub issues, regardless of how reports surfaced them.

Most high-priority accessibility concerns will be found in styles and components included in GOV.UK Frontend and patterns built using GOV.UK Frontend. That’s because hundreds of services incorporate these elements.

### Breaking releases and breaking changes

A ‘breaking release’ is a numbered version of the GOV.UK Frontend repository that breaks compatibility with previous versions of the code.

A breaking release only occurs when some service teams must make changes to their service code for their service to keep working correctly.

Individual changes in the release that break compatibility are called ‘breaking changes’.

Breaking releases for GOV.UK Frontend are identified by an increment in the first digit of the release version number. For example, going from 5.X.X to 6.0.0 is a breaking release.

[Learn more about release versioning for GOV.UK Frontend](https://github.com/alphagov/govuk-frontend/blob/main/docs/contributing/versioning.md).

### Service teams

Throughout this document, ‘service teams’ refers to all individuals, teams, organisations and groups that directly use any GOV.UK Design System products, including:

-   the GOV.UK Design System
-   GOV.UK Frontend code
-   the Prototype Kit

The term ‘service teams’ is intended to be inclusive of all groups that use GOV.UK Design System products, even if those groups are not specifically working on a service or structured as a distinct team.

We rely on service teams to build accessible services for end-users.

### Support

For the GOV.UK Design System and Prototype Kit teams, ‘support’ has a specific meaning.

Support is a service provided to users of the GOV.UK Design System, GOV.UK Frontend repository and the Prototype Kit. Generally, one team member is assigned to be on support each workday.

We provide support to users through 3 channels:

-   email
-   slack
-   GitHub issues

The team member assigned to support on a given workday will help triage requests and gather information from the team to answer questions.

### The team

Throughout this document, ‘the team’, ‘our team’ and ‘we’ refer to the GOV.UK Design System team. This team is inclusive of members of the Prototype Kit team.

## Tentative WCAG-related dates for 2022 and 2023

### September 2022

WCAG 2.2 published a new ‘Candidate recommendation’ version on 6 September 2022. At this stage, “<abbr title="World Wide Web Consortium">W3C</abbr> encourages developers to use the technical report in their projects”.

### Early 2023

WCAG 2.2 is scheduled to be published by <abbr title="World Wide Web Consortium">W3C</abbr>. At this stage, it’s a final and official web standard. WCAG 2.2 is backwards compatible and includes all existing WCAG 2.1 criteria.

### 6 months after WCAG 2.2 publishing

Release a version of GOV.UK Frontend with WCAG 2.2 AA compliant components

### 9 months after WCAG 2.2 publishing

Release an updated GOV.UK Design System website that is compliant with WCAG 2.2 AA
