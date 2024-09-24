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

You can create a bundle with the following commands:
```
npm run easydb -- --instance-url=https://heidicon.ub.uni-heidelberg.de
npm run bundle
```

This will generate `bundle.{js,css}` in the `bundle/` directory. You can look at the provided
`index.html` for an example of how to integrate into your HTML page.

## Issues

If you find any issues with using this component, please open an issue.
Preferrably, include the following information:

* The instance URL where this is happening
* The System ID of the object that triggers the behaviour (if non-standard, also the mask)
* A screenshot of the intended and the observed behaviour
