# Return Page Styling Update – Plan

## Goal
Update `/return` so it:
1. Matches the styling of the payment page (`/payment/[bookingCode]`)
2. Uses shadcn/ui components where it makes sense
3. Shows **TwoPolaroidStackFinal** next to the main content (same layout idea as in `booking-request.tsx`: form left, polaroid right)

---

## 1. Match Payment Page Styling

### 1.1 Outer layout (from payment page)
- **Outer container:**  
  `bg-q-background tablet:py-4 tablet:px-4 min-h-screen px-6 py-6 pb-40`
- **Width:**  
  Use a single wrapper with `max-w-[1190px] mx-auto` so we can fit:
  - Main card (left, ~576px like booking-request form)
  - Polaroid column (right, 505px, `tablet:hidden`)

### 1.2 Card structure (same pattern as payment)
- **Header block:**  
  `bg-q-blue rounded-t-lg px-8 py-8` (or `tablet:px-5 tablet:py-7`)  
  - Logo (reuse same `Image` + `logo` from `@/public/icons/logo-fff.svg` as on payment page)
- **Main content block:**  
  `bg-white rounded-none px-10 py-10` (or `tablet:px-6 tablet:py-6`)  
  - Success heading and text
  - Confirmation email line with `customerEmail`
  - Contact / support line with host email link
- **Footer block:**  
  `bg-q-card-background rounded-b-lg px-8 py-8`  
  - Same footer as payment: “Sieben Gipfel Blick”, host email, copyright

### 1.3 Typography and colors (from payment page)
- Headings: `font-reem-kufi`, `text-q-text-dark-700`, responsive sizes (e.g. `text-[28px]` / `tablet:text-[24px]`)
- Body: `font-jost`, `text-q-text-dark-700` or `text-[#554f51]`, `text-base` / `tablet:text-sm`
- Links: `text-q-blue underline hover:text-[#5a6a95]`

---

## 2. Two-Column Layout (like booking-request)

From `booking-request.tsx` (around 127–522):

- Parent:  
  `<div className="flex">`
- **Left column:**  
  Main content card, fixed width on desktop:  
  `w-[576px]` (and `mobile:w-full tablet:w-full mobile:px-3` for small screens)
- **Right column:**  
  Polaroid only on large screens:  
  `<div className="tablet:hidden w-[505px]">`  
  - Inside: `<TwoPolaroidStackFinal room={finalDisplay} />`

Apply the same idea on return:
- One `flex` wrapper with `max-w-[1190px]` (and same padding as payment: `tablet:px-4`, etc.).
- Left: the full “payment-style” card (header + main + footer) with `w-[576px]` and responsive full width.
- Right: `tablet:hidden w-[505px]` with `TwoPolaroidStackFinal`.

---

## 3. TwoPolaroidStackFinal and Data

- **Import:**  
  `import { TwoPolaroidStackFinal } from "@/components/sections/rooms/components";`
- **Props:**  
  `TwoPolaroidStackFinal` expects `room` of type `RoomType` (see `components/sections/rooms/components.tsx`):
  - `adornmentWithHouse: boolean`
  - `inReverseOrder: boolean`
  - `heading: string`
  - `paragraph: string`
  - `images: StaticImageData[]` (length 2)

- **Reuse same `finalDisplay` as in booking-request** (so it looks consistent):
  - Use the same images:  
    `outsideView`, `outsideForntDoor` from `@/public/images/InUse/`
  - Same structure as in `booking-request.tsx` (lines 35–42), e.g.  
    `adornmentWithHouse: false`, `inReverseOrder: true`, heading/paragraph for “Schlafzimmer Zwei”, etc.

Because `TwoPolaroidStackFinal` is a client component, it can be imported and rendered from the return page (server component) without changing the return page to a client component.

---

## 4. Use shadcn Components Where It Fits

- **Card:**  
  Use `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` from `@/components/ui/card` for the **main content block** (success message, email line, contact line).  
  Style them with the same colors as the payment page (e.g. override `bg-card` to white, borders to match).
- **Button (optional):**  
  If you want the contact/mailto to be a clear CTA, use `Button` from `@/components/ui/button` for “Contact us” / email link.
- **Separator (optional):**  
  Use `Separator` from `@/components/ui/separator` between success message and contact section if it improves readability.

Keep header and footer as styled divs (like payment page) so the return page keeps the same “email-style” header/footer look.

---

## 5. Content and Data Fixes

- **Host email:**  
  Fetch host config on the server (e.g. `getHostConfigAction`) and use `host_business_email` for:
  - The contact sentence in the main content
  - The footer “Email: …”
- **Typo:**  
  Replace “oreders@example.com” with the actual host email and fix “oreders” → “orders” in any copy (or remove that line and use the same contact text as on the payment page).
- **Copy:**  
  Keep “We appreciate your business! A confirmation email will be sent to {customerEmail}.” and add a line like “If you have any questions, please contact us at [host email].” to match the payment page tone.

---

## 6. Footer and Optional Footer Component

- Payment page uses `<Footer />` from `@/components/sections/footer` below the card.
- Add the same `<Footer />` at the bottom of the return page so layout and navigation match.

---

## 7. File and Code Structure

### 7.1 Keep return page as server component
- `app/return/page.tsx` stays an `async` server component.
- It can:
  - `await searchParams`, call Stripe, call `getHostConfigAction`
  - Render the layout and pass data into the client component `TwoPolaroidStackFinal`

### 7.2 Suggested component tree

```
<outer div (bg-q-background, min-h-screen, padding)>
  <div (max-w-[1190px] mx-auto)>
    <div className="flex">
      <!-- Left: payment-style card -->
      <div (w-[576px], responsive full width)>
        <!-- Header: bg-q-blue, logo -->
        <!-- Main: bg-white - optionally Card here -->
        <!--   - Success title + text -->
        <!--   - Confirmation email to {customerEmail} -->
        <!--   - Contact: host email link -->
        <!-- Footer: bg-q-card-background, same as payment -->
      </div>
      <!-- Right: polaroid (tablet:hidden) -->
      <div className="tablet:hidden w-[505px]">
        <TwoPolaroidStackFinal room={finalDisplay} />
      </div>
    </div>
  </div>
  <Footer />
</outer>
```

### 7.3 Imports to add in `app/return/page.tsx`
- `Image` from `next/image`
- `logo` from `@/public/icons/logo-fff.svg`
- `TwoPolaroidStackFinal` from `@/components/sections/rooms/components`
- `getHostConfigAction` from `@/app/actions/admindashboardActions`
- Static images for `finalDisplay`: e.g. `outsideView`, `outsideForntDoor` from `@/public/images/InUse/`
- Optional: `Card`, `CardContent`, etc. from `@/components/ui/card`
- `Footer` from `@/components/sections/footer`

---

## 8. Implementation Checklist

- [ ] Add outer container and `max-w-[1190px]` wrapper with `flex` and responsive padding (match payment).
- [ ] Add header block with logo (same as payment).
- [ ] Add main content block (success message, customer email, contact); optionally use `Card` + `CardContent`.
- [ ] Add footer block (same as payment); use host email from `getHostConfigAction`.
- [ ] Add right column `tablet:hidden w-[505px]` with `TwoPolaroidStackFinal` and `finalDisplay`.
- [ ] Define `finalDisplay` (same shape as booking-request) with the two polaroid images.
- [ ] Replace “oreders@example.com” with host email and fix copy.
- [ ] Use typography and color classes from payment page throughout.
- [ ] Add `<Footer />` at the bottom.
- [ ] Optionally use `Button` for contact link and `Separator` in main content.
- [ ] Test on mobile/tablet: polaroid column hidden, card full width; desktop: two columns.

---

## 9. Summary

| Area              | Action                                                                 |
|-------------------|------------------------------------------------------------------------|
| Layout            | Same outer + max-width as payment; inner `flex` like booking-request. |
| Left column       | Payment-style card (header + main + footer), 576px, responsive.        |
| Right column      | `TwoPolaroidStackFinal` in `tablet:hidden w-[505px]`.                   |
| Styling           | Reuse payment page classes and typography.                            |
| Components        | shadcn `Card` (and optionally `Button`, `Separator`).                  |
| Data              | Host email from `getHostConfigAction`; fix contact copy/typo.          |
| Footer            | Add site `Footer` below the card.                                     |

This plan keeps the return page consistent with the payment page and reuses the same side-by-side layout and polaroid usage as the booking-request section.
