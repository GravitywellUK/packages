<h1 align="center">Gravitywell GTM</h1>
<p align="center">Typed Google Tag Manager helper functions that ensures your app won't crash if GTM is not instantiated.</p>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/GravitywellUK/packages/CI/master" alt="CI" />
  <img src="https://img.shields.io/github/license/gravitywelluk/packages" alt="License" />
  <img src="https://img.shields.io/npm/dm/@gravitywelluk/gtm" alt="Downloads" />
  <img src="https://img.shields.io/npm/v/@gravitywelluk/gtm" alt="Version" />
</p>
<br />

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Google GA4 Events](#google-ga4-events)
  - [gtmGa4EventEcommerce()](#gtmga4eventecommerce)
  - [gtmGa4EventAuth()](#gtmga4eventauth)
  - [gtmGa4EventShare()](#gtmga4eventshare)

## Installation

```shell
yarn add @gravitywelluk/gtm

# or

npm install --save @gravitywelluk/gtm
```

## Google GA4 Events

Helper functions to track Google GTM GA4 events.

### gtmGa4EventEcommerce()

Tracks a GA4 e-commerce event

```typescript
import { gtmGa4EventEcommerce } from "@gravitywelluk/gtm";

// Track an add_to_cart event
gtmGa4EventEcommerce("add_to_cart", {
  currency: "GBP",
  value: 215.14,
  items: items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      affiliation: "Google Store",
      coupon: "SUMMER_FUN",
      currency: "USD",
      discount: 2.22,
      index: 5,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "green",
      location_id: "L_12345",
      price: 107.57,
      quantity: 2
    }
  ]
});
```

### gtmGa4EventAuth()

Tracks a GA4 authentication event.

```typescript
import { gtmGa4EventAuth, GtmGa4EventAuthMethod } from "@gravitywelluk/gtm";

gtmGa4EventAuth("login", GtmGa4EventAuthMethod.GITHUB);
gtmGa4EventAuth("sign_up", GtmGa4EventAuthMethod.GOOGLE);
```

### gtmGa4EventShare()

Tracks a GA4 `share` event.

```typescript
import { gtmGa4EventShare, GtmGa4EventShareMethod } from "@gravitywelluk/gtm";

gtmGa4EventShare('/example-page', GtmGa4EventShareMethod.TWITTER);
```
