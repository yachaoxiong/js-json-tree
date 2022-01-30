# JSON tree viewer

_A JSON view component for React._

**Here is the [demo](https://json-treeview.vercel.app/)**

## Feature

- [x] expand/collapse the JSON tree
- [x] remove/edit nodes
- [x] Copy resource
- [x] type of each node
## Install
```bash
npm install --save js-json-tree
```
## How to use

```jsx
import JsonTree from 'js-json-tree';
const exampleData={
  "id":2,
  "name":"test",
  "fruit":["apple","banana"],
  "hours":{"monday":{
    "opens_at":"8:38 AM",
    "closes_at":"8:31 PM",
    "is_closed":true
    }
  }
}
<JsonTree resource={exampleData}>

```

## Contact Me

If you have more idea about improving this package, feel free to reach me at <ericxiongdeveloper@gmail.com>
