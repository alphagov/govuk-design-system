declare module 'govuk-frontend' {
    class Component<T extends Element = HTMLElement> {
        $root: T
        constructor($root: Element)
        static checkSupport(): void
    }

    const version: any
    const Accordion: any
    const Button: any
    const CharacterCount: any
    const Checkboxes: any
    const ErrorSummary: any
    const ExitThisPage: any
    const Header: any
    const NotificationBanner: any
    const PasswordInput: any
    const Radios: any
    const ServiceNavigation: any
    const SkipLink: any
    const Tabs: any
    const initAll, createAll: any
    const isSupported: any
}