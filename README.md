# svelte-easydb-detail-view

This project reimplements the detail view of [EasyDB](https://www.programmfabrik.de/easydb/) as a Svelte component.
The purpose is to build stand-alone web applications that display objects managed in EasyDB.

## Installation

```bash
git clone https://github.com/ssciwr/svelte-easydb-detail-view.git
cd svelte-easydb-detail-view
npm install
```

## Demo

A demonstrator app can be started with:

```bash
npm run dev
```

## Usage

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Svelte Component</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" type="text/css" crossorigin href="bundle.css">
    <script src="bundle.js"></script>
</head>
<body>
    <easydb-detail-view uuid="e95dcb74-77f6-4794-b468-506da8b7a3a1"/>
</body>
</html>
```

## Issues

If you find any issues with using this component, please open an issue.
Preferrably, include the following information:

* The instance URL where this is happening
* The UUID of the object that triggers the behaviour (if non-standard, also the mask)
* A screenshot of the intended and the observed behaviour
