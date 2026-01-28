# Email System Testing Checklist

## Overview

This checklist covers comprehensive testing of all 10 email templates, routing logic, scheduling system, and email client compatibility.

---

## Pre-Testing Setup

### Environment Variables

- [ ] `SITE_BASE_URL` is set correctly (production URL or localhost:3000 for testing)
- [ ] `RESEND_API_KEY` is configured
- [ ] `STRIPE_WEBHOOK_SECRET` is configured (for payment testing)
- [ ] Host email is configured in `host_config` table (`host_business_email`)

### Assets Verification

- [ ] Logo SVG exists at `/public/icons/logo-fff.svg`
- [ ] Adornment SVGs exist at `/public/icons/adornment-house.svg` and `/public/icons/adornment-taper.svg`
- [ ] All SVGs are accessible via `SITE_BASE_URL/icons/...`

---

## Phase 1: Individual Email Template Testing

### V1 - Guest Booking Request Confirmation

**Trigger:** Initial booking request submission

- [ ] Email is sent to guest's email address (not test email)
- [ ] Subject line: "Ihre Buchungsanfrage wurde erhalten - Buchungscode: [CODE]"
- [ ] Logo displays correctly in header
- [ ] Booking code is highlighted and clearly visible
- [ ] All booking details are formatted correctly:
  - [ ] Check-in date: German format (e.g., "28. Januar 2026")
  - [ ] Check-out date: German format
  - [ ] Number of guests displayed correctly
  - [ ] "Mit Hund: Ja" appears if `with_dog === "yes"`
- [ ] Adornment SVG appears at bottom
- [ ] Footer contact placeholders are present
- [ ] Colors match brand (#faf2f0, #6d7ca7, #3d3638)

### H1 - Host New Booking Notification

**Trigger:** Initial booking request submission

- [ ] Email is sent to host email from `host_config`
- [ ] Subject line: "Neue Buchungsanfrage - [First Name] [Last Name]"
- [ ] Logo displays correctly
- [ ] All guest information is displayed:
  - [ ] Guest name, email, phone
  - [ ] Guest message (if provided)
  - [ ] Booking details
- [ ] Admin link button works: `/admin/bookings/[id]`
- [ ] Button styling matches brand (#6d7ca7)
- [ ] Adornment appears
- [ ] Footer is present

### V2 - Guest Payment Request

**Trigger:** Host accepts booking and sets price

- [ ] Email is sent to guest's email
- [ ] Subject line: "Zahlungsaufforderung für Ihre Buchung - [CODE]"
- [ ] Price is formatted correctly: "€150,00" (comma for decimals)
- [ ] Payment button is visible and styled correctly:
  - [ ] Red background (#bc0c38)
  - [ ] Darker border (#9b203f)
  - [ ] Link points to `/payment/[bookingCode]`
- [ ] All booking details are correct
- [ ] Important notice about 7-day payment deadline is visible
- [ ] Adornment appears

### H2 - Host Payment Link Sent Confirmation

**Trigger:** Host accepts booking and sets price

- [ ] Email is sent to host email
- [ ] Subject line: "Zahlungslink an Gast gesendet - [CODE]"
- [ ] Confirms payment link was sent to guest
- [ ] Shows accepted price amount
- [ ] All guest and booking details are displayed
- [ ] Adornment appears

### V3 - Guest Payment Success

**Trigger:** Stripe webhook after successful payment

- [ ] Email is sent to guest's email (NOT host - critical!)
- [ ] Subject line: "Zahlung erfolgreich - Vielen Dank für Ihre Buchung!"
- [ ] Payment confirmation message is clear
- [ ] Paid amount is displayed: "€150,00"
- [ ] Note about separate receipt email is present
- [ ] Booking details are shown
- [ ] Adornment appears

### H3 - Host Payment Received Notification

**Trigger:** Stripe webhook after successful payment

- [ ] Email is sent to host email (NOT guest - critical!)
- [ ] Subject line: "Zahlung erhalten - Buchung [CODE] bestätigt"
- [ ] Payment amount is displayed
- [ ] All guest information is shown
- [ ] Booking is marked as confirmed
- [ ] Adornment appears

### V4 - Guest Check-in Reminder (Scheduled)

**Trigger:** Scheduled 1 day before check-in

- [ ] Email is scheduled correctly in `ScheduledEmails` table
- [ ] Send date is 1 day before check-in at 9:00 AM
- [ ] Email is sent to guest's email
- [ ] Subject line: "Ihr Aufenthalt beginnt bald - Check-in am [DATE]"
- [ ] Check-in instructions are present:
  - [ ] Check-in time: 15:00 Uhr
  - [ ] Check-out time: 11:00 Uhr
- [ ] Property information section includes:
  - [ ] Amenities list
  - [ ] Important notes
  - [ ] Recommendations
- [ ] All booking details are correct
- [ ] Adornment appears

### H4 - Host Check-in Reminder (Scheduled)

**Trigger:** Scheduled 1 day before check-in

- [ ] Email is scheduled correctly in `ScheduledEmails` table
- [ ] Send date is 1 day before check-in at 9:00 AM
- [ ] Email is sent to host email
- [ ] Subject line: "Gastankunft morgen - [First Name] [Last Name]"
- [ ] Guest information is displayed
- [ ] Check-in checklist is present
- [ ] All booking details are correct
- [ ] Adornment appears

### V5 - Guest Booking Declined

**Trigger:** Host declines booking

- [ ] Email is sent to guest's email
- [ ] Subject line: "Ihre Buchungsanfrage konnte nicht bestätigt werden"
- [ ] Apology message is professional
- [ ] Booking details are shown
- [ ] Alternative suggestions section is present
- [ ] Adornment appears

### H5 - Host Booking Declined Confirmation

**Trigger:** Host declines booking

- [ ] Email is sent to host email
- [ ] Subject line: "Buchungsanfrage abgelehnt - [CODE]"
- [ ] Confirms decline action
- [ ] All guest and booking details are shown
- [ ] Guest message is displayed (if provided)
- [ ] Adornment appears

---

## Phase 2: Email Routing Testing

### Critical Routing Checks

- [ ] **V1** goes to `guest_email` (not host)
- [ ] **H1** goes to `host_business_email` (not guest)
- [ ] **V2** goes to `guest_email` (not host)
- [ ] **H2** goes to `host_business_email` (not guest)
- [ ] **V3** goes to `guest_email` (not host) ⚠️ CRITICAL
- [ ] **H3** goes to `host_business_email` (not guest) ⚠️ CRITICAL
- [ ] **V4** scheduled to `guest_email` (not host)
- [ ] **H4** scheduled to `host_business_email` (not guest)
- [ ] **V5** goes to `guest_email` (not host)
- [ ] **H5** goes to `host_business_email` (not guest)

### Email Address Verification

- [ ] Guest emails use actual `guest_email` from booking (not test email)
- [ ] Host emails use `host_business_email` from `host_config` (not test email)
- [ ] Fallback to test email only when actual email is missing

---

## Phase 3: Data Formatting Testing

### Date Formatting

- [ ] All dates use German format: "28. Januar 2026"
- [ ] Month names are correct German months
- [ ] Day numbers don't have leading zeros
- [ ] Year is 4 digits

### Price Formatting

- [ ] Prices use German format: "€150,00" (comma, not period)
- [ ] Prices always show 2 decimal places
- [ ] Euro symbol (€) is present
- [ ] Large amounts format correctly (e.g., €1.234,56)

### Boolean Formatting

- [ ] `with_dog === "yes"` displays as "Ja"
- [ ] `with_dog === "no"` doesn't show the "Mit Hund" row
- [ ] `has_agreed_to_policies` is handled correctly

---

## Phase 4: Subject Line Testing

### Subject Line Format

- [ ] All subject lines are in German
- [ ] Subject lines include relevant information (booking code, name, date)
- [ ] Subject lines are not too long (under 78 characters recommended)
- [ ] Special characters display correctly

### Subject Line Content

- [ ] V1: Includes booking code
- [ ] H1: Includes guest name
- [ ] V2: Includes booking code
- [ ] H2: Includes booking code
- [ ] V3: Generic success message
- [ ] H3: Includes booking code
- [ ] V4: Includes formatted check-in date
- [ ] H4: Includes guest name
- [ ] V5: Generic decline message
- [ ] H5: Includes booking code

---

## Phase 5: Scheduling System Testing

### V4 & H4 Scheduling

- [ ] Both V4 and H4 are scheduled after payment success
- [ ] Send date is calculated correctly (1 day before check-in)
- [ ] Send time is 9:00 AM
- [ ] HTML is rendered and stored in `ScheduledEmails` table
- [ ] Subject lines are stored correctly
- [ ] Template props are stored as JSON

### Scheduled Email Processing

- [ ] Supabase Edge Function processes scheduled emails
- [ ] Emails are sent at the correct time
- [ ] Status updates correctly: `pending` → `sending` → `sent`
- [ ] Failed emails retry with exponential backoff
- [ ] Failed emails are marked as `failed` after max attempts

### Edge Cases

- [ ] Scheduling works for check-ins tomorrow (should send today)
- [ ] Scheduling works for check-ins far in the future
- [ ] Multiple bookings don't interfere with each other

---

## Phase 6: Email Client Compatibility Testing

### Desktop Clients

- [ ] **Gmail** (Chrome, Firefox, Safari)
- [ ] **Outlook** (Windows, Mac, Web)
- [ ] **Apple Mail** (Mac, iOS)
- [ ] **Thunderbird**
- [ ] **Yahoo Mail**

### Mobile Clients

- [ ] **Gmail App** (iOS, Android)
- [ ] **Apple Mail** (iOS)
- [ ] **Outlook App** (iOS, Android)
- [ ] **Yahoo Mail App**

### Rendering Checks

- [ ] Logo displays correctly in all clients
- [ ] Adornments display correctly
- [ ] Colors match brand (no color shifts)
- [ ] Buttons are clickable and styled correctly
- [ ] Tables render correctly (booking details)
- [ ] Text is readable (no font issues)
- [ ] Images don't break layout
- [ ] Responsive on mobile (max-width: 600px)

### Known Issues to Check

- [ ] Outlook doesn't add unwanted borders to images
- [ ] Gmail doesn't strip important styles
- [ ] Dark mode doesn't break colors
- [ ] Images load even with images disabled

---

## Phase 7: End-to-End Flow Testing

### Complete Booking Flow

1. [ ] Guest submits booking request
   - [ ] V1 sent to guest
   - [ ] H1 sent to host
2. [ ] Host accepts booking and sets price
   - [ ] V2 sent to guest (payment link)
   - [ ] H2 sent to host (confirmation)
3. [ ] Guest completes payment
   - [ ] V3 sent to guest (payment success)
   - [ ] H3 sent to host (payment received)
   - [ ] V4 scheduled for guest
   - [ ] H4 scheduled for host
4. [ ] Check-in reminder emails sent
   - [ ] V4 sent to guest (1 day before)
   - [ ] H4 sent to host (1 day before)

### Decline Flow

1. [ ] Guest submits booking request
   - [ ] V1 sent to guest
   - [ ] H1 sent to host
2. [ ] Host declines booking
   - [ ] V5 sent to guest
   - [ ] H5 sent to host
3. [ ] No payment or scheduling emails sent

---

## Phase 8: Edge Cases & Error Handling

### Missing Data

- [ ] Missing `guest_message` doesn't break template
- [ ] Missing `guest_phone_number` doesn't break template
- [ ] Missing `host_business_email` falls back to test email
- [ ] Missing booking data shows appropriate error

### Invalid Data

- [ ] Invalid date formats are handled
- [ ] Invalid price values are handled
- [ ] Special characters in names/emails are escaped

### Email Sending Failures

- [ ] Resend API errors are logged
- [ ] Failed emails don't break the booking flow
- [ ] Error messages are user-friendly

### Scheduling Failures

- [ ] Failed scheduled email rendering is handled
- [ ] Invalid send dates are rejected
- [ ] Database errors are logged

---

## Phase 9: Performance Testing

### Email Rendering

- [ ] All templates render quickly (< 1 second)
- [ ] HTML generation doesn't block requests
- [ ] Large booking data doesn't slow rendering

### Database Queries

- [ ] Host config is fetched efficiently
- [ ] Booking data queries are optimized
- [ ] Scheduled email inserts are fast

---

## Phase 10: Production Readiness

### Configuration

- [ ] `SITE_BASE_URL` is set to production URL
- [ ] `RESEND_API_KEY` is production key
- [ ] `STRIPE_WEBHOOK_SECRET` is production secret
- [ ] Host email is production email

### Monitoring

- [ ] Email sending is logged
- [ ] Failed emails are tracked
- [ ] Scheduled email status is monitored
- [ ] Error alerts are configured

### Documentation

- [ ] Email flow is documented
- [ ] Template purposes are clear
- [ ] Configuration requirements are documented
- [ ] Troubleshooting guide exists

---

## Quick Test Script

### Manual Testing Steps

1. Create a test booking with your email
2. Check V1 and H1 are received
3. Accept booking in admin panel
4. Check V2 and H2 are received
5. Complete payment (use Stripe test mode)
6. Check V3 and H3 are received
7. Verify V4 and H4 are scheduled in database
8. Wait for scheduled time or manually trigger
9. Check V4 and H5 are received

### Test Data

```
Guest Email: [your-test-email]
Host Email: [from host_config]
Check-in: Tomorrow (for quick scheduling test)
Check-out: Day after tomorrow
Guests: 2
With Dog: Yes
```

---

## Notes

- All emails should be tested in both development and production environments
- Use email testing services (Litmus, Email on Acid) for comprehensive client testing
- Monitor Resend dashboard for delivery rates
- Check spam folders if emails don't arrive
- Verify all links work correctly
- Test with actual booking data, not just test data

---

## Sign-off

- [ ] All Phase 1 tests passed
- [ ] All Phase 2 tests passed
- [ ] All Phase 3 tests passed
- [ ] All Phase 4 tests passed
- [ ] All Phase 5 tests passed
- [ ] All Phase 6 tests passed
- [ ] All Phase 7 tests passed
- [ ] All Phase 8 tests passed
- [ ] All Phase 9 tests passed
- [ ] All Phase 10 tests passed

**Tested by:** **\*\*\*\***\_**\*\*\*\***  
**Date:** **\*\*\*\***\_**\*\*\*\***  
**Environment:** [ ] Development [ ] Production  
**Status:** [ ] Pass [ ] Fail [ ] Partial

---

## Known Issues & Future Improvements

- [ ] Document any issues found during testing
- [ ] List any improvements needed
- [ ] Track email open rates
- [ ] Monitor click-through rates on payment links
