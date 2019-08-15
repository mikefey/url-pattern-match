# Url Pattern Match

## A small JavaScript library to match url patterns and get param values

Example:
```javascript
import pathMatch from './path-match';

// MATCH
const pattern = 'admin/pages/:page_id/sections/:section_id/edit'; // The pattern to compare against, ":page_id" and ":section_id" are route params
const path = 'admin/pages/1/sections/5/edit'; // A url path
const params = pathMatch(route, path); // Returns [1, 5] - :page_id and :section_id from the path

// NO MATCH
const pattern = 'admin/pages/:page_id/sections/:section_id/edit';
const path = 'admin/sites/5/sections/2';
const params = pathMatch(route, path); // Returns null

```
# path-match
