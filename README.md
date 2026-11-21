# FundiLink - Web Technologies Homework

One project, satisfying both parts of the assignment together (no separate
"university portal" folder):

- **Part 1 requirements** (semantic HTML5, three core pages, navigation
  between them, a PHP page showing the live server date/time, run through
  Apache/localhost) are met by `index.html`, `about.html`, `contact.html`,
  and `server-time.php`.
- **Part 2 requirements** (customized to a personal project, made dynamic
  with JavaScript, 3+ validated HTML5 forms, 2 user-role logins/
  registration, a dashboard per role, dummy JSON data) are met by the rest
  of the site: `login.html`, `register.html`, `dashboard-client.html`,
  `dashboard-fundi.html`, and the `data/`, `js/`, `api/` folders.

FundiLink is a local-service booking concept: clients search for and book
artisans/repair professionals ("fundis") such as electricians, plumbers,
carpenters, and tailors; fundis manage incoming booking requests.

## Pages
| Page | Purpose |
|---|---|
| `index.html` | Home - hero, live search, dynamic category listing (loaded from `data/fundis.json`) |
| `about.html` | Description, mission, vision |
| `contact.html` | Address, phone, email, validated contact form |
| `server-time.php` | PHP-rendered current server date/time (Africa/Kigali) - linked from the footer of every page |
| `login.html` | Login, toggling between client and fundi accounts |
| `register.html` | Registration, toggling between client and fundi accounts |
| `dashboard-client.html` | Browse fundis, submit a booking request, track its status |
| `dashboard-fundi.html` | Accept/decline incoming bookings, update profile |

## Running through Apache (localhost)

### Windows (XAMPP)
1. Install XAMPP, then copy this whole `fundilink` folder into `C:\xampp\htdocs\`.
2. Start Apache from the XAMPP Control Panel.
3. Visit `http://localhost/fundilink/index.html`.

### Linux (Apache2 + PHP)
```bash
sudo apt install apache2 php libapache2-mod-php
sudo cp -r fundilink /var/www/html/
chmod 666 /var/www/html/fundilink/data/*.json
sudo systemctl restart apache2
```
Then open `http://localhost/fundilink/index.html`.

The site uses `fetch()` to load the JSON files in `data/` and to call the
PHP endpoints in `api/`, which only works when served over
`http://localhost/...` through Apache - opening the HTML files directly
with `file://` will block those requests, so always browse through
localhost.

## Inspecting an HTTP request (Developer Tools)
1. Open the site in Chrome/Firefox and press F12 (or right-click > Inspect).
2. Go to the **Network** tab, then reload the page (Ctrl+R).
3. Click the request for `index.html` in the list and check **Headers** for
   the **Status Code** - it should read `200 OK`.
4. Repeat for `about.html`, `contact.html`, and `server-time.php` - all
   should return `200`. Requesting a page name that doesn't exist returns
   `404 Not Found`, which is worth showing as a comparison in your report.

## PHP date/time page
`server-time.php` prints the current server date and time using PHP's
`date()` function, timezone set to `Africa/Kigali`. Refresh the page to
watch it change - proof it's generated server-side on each request, not
static HTML.

## Forms & HTML5 validation
Three forms validate entirely through native HTML5 attributes (`required`,
`minlength`, `type="email"`, `min`/`step`, a `min` date set to today) - the
browser blocks submission and shows its own messages, with no JavaScript
re-checking the values:
- Contact form (`contact.html`)
- Booking request form (`dashboard-client.html`)
- Fundi profile update form (`dashboard-fundi.html`)

`register.html` adds `pattern`/`title` for username and phone formats, plus
the HTML5 `setCustomValidity()` API (still native validation, not a custom
JS error message) to enforce that the two password fields match.

## Logins, registration, and dashboards
- `login.html` / `register.html` toggle between **client** and **fundi** accounts.
- Everything goes through small PHP endpoints in `api/` that read and write
  JSON files in `data/` (no database):
  | Endpoint | What it does | File written |
  |---|---|---|
  | `api/register.php` | Create an account (password is hashed) | `data/registered-users.json` |
  | `api/login.php` | Check credentials (demo + registered accounts) | - |
  | `api/fundis.php` | Public fundi list, incl. newly registered fundis + profile edits | - |
  | `api/profile.php` | Save a fundi's rate, availability, bio | `data/profiles.json` |
  | `api/bookings.php` | List / add bookings, accept or decline | `data/bookings.json` |
- Accounts, profiles and bookings therefore persist across browsers, and a
  fundi who registers appears on the home page and in the client's booking
  list straight away.
- **If PHP isn't running** (page opened from a file, VS Code Live Server,
  `python -m http.server`, ...) the app automatically falls back to the
  starter data in `js/seed-data.js` plus the browser's `localStorage`, so
  login, registration, booking and the dashboards still work on that device.
  For the full JSON-file persistence, run it through Apache/PHP.
- Demo logins: client `client1` / `client123`, fundi `jpelectric` / `fundi123`.

The `data/*.json` files must be writable by the web server
(`chmod 666 data/*.json`, or `chown` them to `www-data` on Linux). If a
sign-up says "Cannot write data/...", that is the permission to fix.

## Design system
Custom "fl" monogram (two stems linked by a green crossbar, `favicon.svg`/`.png`),
forest-green/warm-white color system (`css/style.css`), Space Grotesk for headings + Inter for body
text, flat bordered layouts instead of shadowed cards.

Fonts are bundled in `fonts/` (no internet needed). If the page ever looks
unstyled, make sure you open it through `http://localhost/fundilink/...`
and that the `css/` and `fonts/` folders were copied alongside the HTML files.
