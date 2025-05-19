# QR Widget

A lightweight Web Component for scanning QR codes using Lit and jsQR.

## Installation & Integration guide

1. **Clone the repository**

```bash
  git clone https://github.com/Pavliklaw7/qr-wdget.git
  cd qr-wdget
```

2. **Install dependencies**

```bash
  npm install
```

3. **Build the component**

```bash
  npm run build
```

4. **Build the component**

```bash
  npm run build
```

After building, the distributable file will be generated in the dist/ folder, e.g.:

```bash
  dist/qr-widget.js
```

## Integration

Copy the built file (qr-widget.js) from dist/ into your web project (for example, into a public/js/ folder), then include it in your HTML:

### 1. Connecting JavaScript

Before closing `</body>` add:

```html
<script type="module" src="[url to qr-widget.js]"></script>
```

### 2. Add element

In the same place insert:

```html
<qr-widget></qr-widget>
```

#### 2.1. Attributes

```html
<qr-widget immediate></qr-widget>
```

**immediate**: if set, the scanner will close immediate after detecting qr code.

### 3. Open Scanner

To open scanner by button click:

```html
<button id="openScanner">Open QR Scanner</button>

<script>
  const qrWidget = document.querySelector('qr-widget');
  document.getElementById('openScanner').addEventListener('click', () => {
    qrWidget.openCamera();
  });
</script>
```

### 4. Handle result

```js
qrWidget.onResult = (data) => {
  console.log('QR from callback:', data);
};
```

### Example of HTML

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>QR Widget</title>
  </head>
  <body>
    <button id="openScanner">Open QR Scanner</button>
    <qr-widget></qr-widget>

    <script type="module" src="./qr-widget.js"></script>

    <script>
      const qrWidget = document.querySelector('qr-widget');

      document.getElementById('openScanner').addEventListener('click', () => {
        qrWidget.openCamera();
      });

      qrWidget.onResult = (data) => {
        console.log('QR from callback:', data);
      };

      qrWidget.addEventListener('qr-scanned', (e) => {
        console.log('QR from event:', e.detail);
      });
    </script>
  </body>
</html>
```
