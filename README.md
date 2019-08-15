# Url Pattern Match

## 🔀 A small JavaScript library to match url patterns and get param values

Example:
```javascript
import pathMatch from './path-match';

// MATCH PARAMS
const pattern = 'admin/pages/:page_slug/sections/:section_slug'; // The pattern to compare against, ":page_slug" and ":section_slug" are route params
const path = 'admin/pages/some-page/sections/a-new-section'; // A url path
const params = pathMatch(route, path); // Returns ['some-page', 'a-new-section'] - :page_slug and :section_slug from the path

// MATCH WILDCARD
const pattern = 'admin/pages/*'; // The pattern to compare against, "*" is a wildcard, so will match anything
const path = 'admin/pages/1/sections/5/edit';
const params = pathMatch(route, path); // Returns ['1/sections/5/edit']

// NO MATCH
const pattern = 'admin/pages/:page_id/sections/:section_id/edit';
const path = 'admin/sites/5/sections/2';
const params = pathMatch(route, path); // Returns null

```
