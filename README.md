## QR Widget Integration Guide

This tutorial describes the process of integrating the qr widget, implemented using Web Components, into your website.

### 1. QR widget intagration

#### Step 1. Connect the JavaScript file

Add the following `<script>` tag before closing head tag to your HTML file to connect the widget:

```
<script type="module" src="https://example.com/qr-widget.js"></script>
```

#### Step 2: Add the widget HTML code

Also before closing body tag, add the following element (the order of arrangement does not matter):

```
<qr-widget
	lang="ua"
	apiUrl="apiUrl"
	apiKey="apiKey"
 ></qr-widget>
```

#### Example of final HTML code

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>qr Widget Integration</title>
    <script type="module" src="https://example.com/qr-widget.js"></script>
  </head>
  <body>
    <h1>Example</h1>
  	<qr-widget
		lang="ua"
  	></qr-widget>
  </body>
</html>
```

### 2. Widget attributes

**apiUrl (required)**: URL of your API server.
**apiKey (required)**: Authorization token required to work with the API.

### 3. Customizing the widget

#### Customizing styles

You can customize the appearance of the widget by adding CSS variables to the global styles:

```
qr-widget {
  --border-color: #000;
  --background-color: #f0f0f0;
}
```

#####Available variables:

- `--border-color`: widget border color.
- `--background-color`: widget background color.

### 4. Important points

- **Compatibility**: The widget works in all modern browsers that support Web Components.
- **Initialization**: Make sure that the api-url and access-token attributes are passed correctly for successful SDK initialization.
- **Updates**: If the widget is updated on the server, your integration will automatically pull the new version (if using CDN).

### 5. Help

If you have any questions or problems with the integration, please contact our support team:

- Email: support@example.com
- Documentation: https://example.com/docs

// usage

<popup-wrapper>
  <!-- Дочерний элемент (кнопка, карточка и т.д.), который вызывает попап -->
  <button slot="trigger">Open Scanner</button>
  
  <div>
    <h2>QR Scanner</h2>
    <p>Here is your QR scanner modal content.</p>
  </div>
</popup-wrapper>
