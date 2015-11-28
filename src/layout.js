export default function(title, body) {
  return `<!doctype html>
<html lang="en">
<head>
  <link rel="stylesheet" href="/public/app.css">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
  <title>${title}</title>
  <link href='https://fonts.googleapis.com/css?family=Raleway:400,100,200,300,500,600,700,800,900|Open+Sans:400,600,300,300italic,400italic,600italic,700italic,800italic,800,700|Merriweather:400,300,700,300italic,900italic,700italic,400italic,900' rel='stylesheet' type='text/css'>
</head>
<body>
  <div id="react-container">${body}</div>
  <script src="/public/app.js"></script>
</body>
</html>`;
}
