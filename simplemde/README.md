# SimpleMDE & Markdown
This example shows how to create a WYSIWYG editor for markdown and abstractor for enduro.js to render it in templates. Both abstractor and markdown editor use the same rendering engine, so the results are consistent.

## Quick setup on your project
Clone or download this repo.

Run at your project's folder:

```
npm install marked --save
bower install simplemde --save
```

Copy files from these locations to corresponding ones in your project:
```
\app\abstractors\marked.js
\assets\admin_extensions\marked.js
\pages\custom_types\marked.hbs
```

Use `marked` fields and `$marked_customtype: 'marked'` in your cms files. That's it!
