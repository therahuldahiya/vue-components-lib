<p align="center">
  <img width="720" src="https://raw.githubusercontent.com/Adoratorio/vue-components-lib/master/cover.jpg" alt="Vue components lib">
</p>

<br>

From the beautiful guys 😎 of [Adoratorio](https://adoratorio.studio/)
# Components library for Vue.js
A simple library that includes various reusable components, written in vue and created to simplify the website development internal process.

You can simply download this repo from [GitHub](https://github.com/Adoratorio/vue-components-lib/archive/master.zip) or install it by npm command.

## Installation
``` cmd
# Install package
npm install @adoratorio/vue-components-lib
```

## Templates scaffolding example
```
TemplateName/
|- GroupElementsFolder/
|  |- ElementName/
|  |  └─ index.vue
|  └─ ElementName/
|     └─ index.vue
|- ElementName/
|  └─ index.vue
|- ...
└─ index.vue
```

## Available templates
+ [Loader](https://github.com/Adoratorio/vue-components-lib/tree/master/Loader)
+ [Cookie](https://github.com/Adoratorio/vue-components-lib/tree/master/Cookie)
+ [Menu](https://github.com/Adoratorio/vue-components-lib/tree/master/Menu)
+ [Slider](https://github.com/Adoratorio/vue-components-lib/tree/master/Slider)
+ [Video](https://github.com/Adoratorio/vue-components-lib/tree/master/Video)
+ [Picture](https://github.com/Adoratorio/vue-components-lib/tree/master/Picture)
+ [Form](https://github.com/Adoratorio/vue-components-lib/tree/master/Form)
+ [Footer](https://github.com/Adoratorio/vue-components-lib/tree/master/Footer)

## Development
### Import
``` js
# template import
import { TemplateName } from 'vue-components-lib/TemplateName';
import { ElementName } from 'vue-components-lib/TemplateName/GroupElementsFolder/ElementName';

# or
import TemplateName from 'vue-components-lib/TemplateName';
import ElementName from 'vue-components-lib/TemplateName/GroupElementsFolder/ElementName';
```

### Slot
You can import the chosen *Template* component and add into its [slot](https://vuejs.org/v2/guide/components-slots.html) any single *Element*, adding `slot="slotName"` to them or, if you prefer, you can import the single *Element* where you need them.
``` Vue
# add Element inside Templete
<TemplateName theme="themeName">
  <ElementName slot="slotName" />
</TemplateName>

# or use a single Element
<ElementName theme="themeName" />
```
The default structure of all *Templates* slots is an array with two strings `['heading', 'content']`, you can redefine it passing a prop to the *Template* component named slots that is an array of names of the slots that you need it.
``` Vue
<template>
  <div id="app">
    <TemplateName :slots="slots" />
  </div>
</template>

<script>
import { TemplateName } from 'vue-components-lib/TemplateName';

export default {
  name: 'App',

  components: {
    TemplateName,
  },

  data() {
    return {
      slots: ['foo', 'bar'],
    };
  },
};
</script>
```

### Themes
To select the component style you can pass the themeName in a `theme` prop to the *Template* and every child will inherit the style of the parent, or if you prefer you can define a theme for every single *Element* component passing them the `theme` prop.

Available themes:
+ Default
+ Coming soon...

``` Vue
<TemplateName theme="themeName">
  # inherit from parent
  <ElementName slot="slotName" />

  # redefine theme for a single element
  <ElementName theme="differentThemeName" />
</TemplateName>

# if don't pass anythings as theme the elemente take the 'default' aspect theme
<ElementName />

# Single Element with theme
<ElementName theme="themeName" />
```

### Style
If you want to edit the style of a *Template* or *Element* component(since the style is scoped) you can modify it with `>>>` combinator (also known as `/deep/`).
``` SCSS
.parent >>> .deep-child {
  color: red;
}
```

## License
[MIT](https://raw.githubusercontent.com/Adoratorio/vue-components-lib/master/LICENSE)

Copyright (c) Adoratorio Studio ⚡️.
