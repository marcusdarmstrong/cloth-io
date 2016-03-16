import manifest from './manifest';

export default function (title, body, state) {
  return `<!doctype html>
<html lang="en">
<head>
  <link rel="stylesheet" href="/public/${manifest['app.css']}">
  <meta charset="utf-8">
  <meta name="viewport"
    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
  <title>${title}</title>
  <link href='https://fonts.googleapis.com/css?family=Raleway:700|Open+Sans:300,400,700|Merriweather:300,700,300italic,700italic' rel='stylesheet' type='text/css'>
</head>
<body>
  <div id="react-container">${body}</div>
  <script>
    window.__INITIAL_STATE__ = ${JSON.stringify(state)}
  </script>
  <script src="/public/${manifest['app.js']}"></script>
</body>
</html>`;
}
