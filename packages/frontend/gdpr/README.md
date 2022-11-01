<h1 align="center">Gravitywell GDPR</h1>
<p align="center">A managed component to display UI and handle GDPR-compliant tracking</p>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/GravitywellUK/packages/CI/master" alt="CI" />
  <img src="https://img.shields.io/github/license/gravitywelluk/packages" alt="License" />
  <img src="https://img.shields.io/npm/dm/@gravitywelluk/grpr" alt="Downloads" />
  <img src="https://img.shields.io/npm/v/@gravitywelluk/gdpr" alt="Version" />
</p>
<br />

## `GDPRManager` Component

Use this component in place of the `react-cookie-consent` default to create a managed cookie consent handler. It will show the default cookie consent UI, which can be customised with the standard `CookieConsent` props.

The component currently supports:
* Google Analytics (GA4)
* Meta
* LinkedIn
* Hotjar
* Google Tag Manager

All tags are optional. If you don't want to use a certain tracking service, pass `undefined` into the relevant component prop and that service won't be configured.

## The `GDPR` Class

Behind the scenes, the `GDPR` class is instantiated when the `GDPRManager` component is used. This handles GDPR state without you having to worry about cookies or consent states.

In detail:

1. You import and use the `GDPRManager` component, passing in whichever tracking details you want to use.
1. The `GDPRManager` creates a new instance of the `GDPR` class, passing the tracking codes into the constructor. This then handles all tracking initialisation and management.
1. The `GDPRManager` operates as a facade to hide the complexity of GDPR management, as well as obscuring the `onAccept` and `onDecline` methods of the cookie consent component. When these are triggered, the `GDPR` class manages and revokes tracking access.

