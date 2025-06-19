const fs = require("fs");
const path = require("path");

const html = `
<!DOCTYPE html>
<html>
  <head><meta http-equiv="refresh" content="0; url=/" /></head>
  <body><p>Redirecting...</p></body>
</html>
`.trim();

fs.writeFileSync(path.join(__dirname, "dist", "404.html"), html);
console.log("✅ Created dist/404.html with redirect to /");
