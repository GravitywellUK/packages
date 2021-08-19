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
- [Google GA4 Events](#google-ga4-events)
  - [Usage](#usage)
  - [Helpers](#helpers)
    - [`add_payment_info`](#add_payment_info)
    - [`add_shipping_info`](#add_shipping_info)
    - [`add_to_cart`](#add_to_cart)
    - [`login`](#login)
    - [`sign_up`](#sign_up)
    - [`begin_checkout`](#begin_checkout)
    - [`purchase`](#purchase)
    - [`select_item`](#select_item)
    - [`share`](#share)

## Google GA4 Events

Helper functions to track Google GTM GA4 events.

### Usage

```typescript
import { gtmGa4EventAddToCart } from "@gravitywelluk/gtm";

...

// Track an add_to_cart event
gtmGa4EventAddToCart({
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

...
```

### Helpers

#### `add_payment_info`

Tracks an `add_payment_info` event.

```typescript
import { gtmGa4EventAddPaymentInfo } from "@gravitywelluk/gtm";
```

#### `add_shipping_info`

Tracks an `add_shipping_info` event.

```typescript
import { gtmGa4EventAddShippingInfo } from "@gravitywelluk/gtm";
```

#### `add_to_cart`

Tracks an `add_to_cart` event.

```typescript
import { gtmGa4EventAddToCart } from "@gravitywelluk/gtm";
```

#### `login`

Tracks a `login` event.

```typescript
import { gtmGa4EventAuth } from "@gravitywelluk/gtm";
```

#### `sign_up`

Tracks a `sign_up` event.

```typescript
import { gtmGa4EventAuth } from "@gravitywelluk/gtm";
```

#### `begin_checkout`

Tracks a `begin_checkout` event.

```typescript
import { gtmGa4EventBeginCheckout } from "@gravitywelluk/gtm";
```

#### `purchase`

Tracks a `purchase` event.

```typescript
import { gtmGa4EventPurchase } from "@gravitywelluk/gtm";
```

#### `select_item`

Tracks a `select_item` event.

```typescript
import { gtmGa4EventSelectItem } from "@gravitywelluk/gtm";
```

#### `share`

Tracks a `share` event.

```typescript
import { gtmGa4EventShare } from "@gravitywelluk/gtm";
```