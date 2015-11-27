export default function(title, body) {
  return `<!doctype html>
<html lang="en">
<head>
  <link rel="stylesheet" href="/public/fonts.css">
  <link rel="stylesheet" href="/public/app.css">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
  <title>${title}</title>
</head>
<body>
  <nav><img class="logo" src="/public/images/logo.png"></nav>
  ${body}
  <script src="/public/app.js"></script>
</body>
</html>`;
}
