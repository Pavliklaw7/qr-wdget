## QR Widget Integration Guide

This tutorial describes the process of integrating the **QR Widget** (implemented as a Web Component) into your website.

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
