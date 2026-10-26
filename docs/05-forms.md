# Forms

The two forms are the site's reason to exist. Both are built from the FormField component.

## Candidate profile: two steps

The brief lists 20 fields (16 from TRC and 4 suggested additions). One long pass loses people who are only casually looking. Splitting it captures the same data with far more completions.

### Step 1: the public form, nine fields

| Field | Type | Required |
|---|---|---|
| Full name | Short text | Yes |
| Email address | Email | Yes |
| Contact number | Phone | Yes |
| Total experience | Years and months | Yes |
| Current location | City dropdown | Yes |
| Preferred locations | Multi-select cities | Yes |
| Key skills | Tags plus free text | Yes |
| Resume | PDF or Word upload | Yes |
| Consent | Checkbox, wording from legal | Yes |

Submit is here. The record and resume are captured at this point.

### Step 2: "Complete your profile", optional

Shown on the confirmation screen, with a progress indicator.

- Current CTC (one number, in LPA)
- Expected CTC (LPA)
- Notice period: Immediate, 15, 30, 60 or 90 days
- Preferred mode of work: Remote, Office or Hybrid
- Current company and designation
- College, education and degree
- LinkedIn or GitHub link
- Brief note about experience (about 500 characters)
- Reason for looking for a change

### Left off the website

| Field from the brief | Why | Where it goes |
|---|---|---|
| Full CTC breakup (fixed, variable, bonus, ESOPs, other, total) | No competitor asks this on a web form; it is the most likely drop-off point | The recruiter call. If TRC insists, a single total in step 2 with an optional "add breakup" expander. |
| Reason for gap in resume | Reads as screening before a conversation | The recruiter call |
| Hometown | Not needed to make a match | Drop |

**Do not collect Gender or Date of Birth** (ABC Consultants does). Neither helps a match, and both create discrimination risk.

## Company enquiry ("Hire from us")

Short by design. A company is a sales lead, not a database record. The recruiter qualifies on the call.

- Company name
- Contact person
- Work email
- Phone
- Roles needed (multi-select from the four practices)
- Number of openings
- Location
- Hiring timeline
- Job description upload (optional)
- Message

## Form rules

Taken from NN/g's form guidance (May 2016) and built into the components:

- One column. Labels above the field, never a placeholder used as a label.
- Required fields are marked, and the form says once at the top what the asterisk means.
- Error messages start with the word "Error", say how to fix it, and keep what the person typed.
- Controls are at least 44px tall.
- Every form states what happens next, above the submit button.
- The submit label names the action: "Submit your profile", not "Send".

## Handling submissions

Recommended in Next.js: one Server Action per form that

1. validates the input on the server,
2. writes the submission to a database,
3. stores the resume in private file storage,
4. sends a notification to the tech hiring inbox, and
5. redirects to `/thank-you/`, which records the conversion.

A CRM can be connected later without changing the forms.

## Data protection

- The DPDP Act, 2023 applies. DPDP Rules notified November 2025; main obligations from 13 May 2027 (PIB and DSCI summaries).
- The consent notice must say what is collected, why, and who it is shared with, and how to withdraw consent.
- Resumes are personal data: private storage, restricted access, a retention period.
- TRC's legal team writes the consent wording and the privacy policy. This design system does not draft them.
