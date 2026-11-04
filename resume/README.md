# Resume source

`resume.html` is the source of `public/Kolawole_Odewusi_Resume.pdf`. It uses the site's fonts from `node_modules` (run `npm ci` first).

To regenerate the PDF, open `resume.html` in Chromium and print to PDF on A4 with background graphics on. Alternatively, use Playwright's `page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true })`.

Keep it in step with the site: no unconfirmed metrics, no client or project names, and no phone number.
