<h1 align="center">Gravitywell Gtag</h1>
<p align="center">Typed Google gtag.js helper functions that ensure your app won't crash if gtag.js is not instantiated.</p>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/GravitywellUK/packages/CI/master" alt="CI" />
  <img src="https://img.shields.io/github/license/gravitywelluk/packages" alt="License" />
  <img src="https://img.shields.io/npm/dm/@gravitywelluk/gtag" alt="Downloads" />
  <img src="https://img.shields.io/npm/v/@gravitywelluk/gtag" alt="Version" />
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

Helper functions to track Google Gtag GA4 events.

### Usage

```typescript
import { gtagGa4EventAddToCart } from "@gravitywelluk/gtag";

...

// Track an add_to_cart event
gtagGa4EventAddToCart({
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
import { gtagGa4EventAddPaymentInfo } from "@gravitywelluk/gtag";
```

#### `add_shipping_info`

Tracks an `add_shipping_info` event.

```typescript
import { gtagGa4EventAddShippingInfo } from "@gravitywelluk/gtag";
```

#### `add_to_cart`

Tracks an `add_to_cart` event.

```typescript
import { gtagGa4EventAddToCart } from "@gravitywelluk/gtag";
```

#### `login`

Tracks a `login` event.

```typescript
import { gtagGa4EventAuth } from "@gravitywelluk/gtag";
```

#### `sign_up`

Tracks a `sign_up` event.

```typescript
import { gtagGa4EventAuth } from "@gravitywelluk/gtag";
```

#### `begin_checkout`

Tracks a `begin_checkout` event.

```typescript
import { gtagGa4EventBeginCheckout } from "@gravitywelluk/gtag";
```

#### `purchase`

Tracks a `purchase` event.

```typescript
import { gtagGa4EventPurchase } from "@gravitywelluk/gtag";
```

#### `select_item`

Tracks a `select_item` event.

```typescript
import { gtagGa4EventSelectItem } from "@gravitywelluk/gtag";
```

#### `share`

Tracks a `share` event.

```typescript
import { gtagGa4EventShare } from "@gravitywelluk/gtag";
```