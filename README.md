# FSD imports highlight

![image](https://user-images.githubusercontent.com/102309602/228155867-748ad5dd-5bbf-43cb-8465-1627a68377ba.png)

if you want the folder to be highlighted, specify it in `fsd-imports-highlight.layers`.
example:  
```json
"fsd-imports-highlight.layers": {
  "utils": {
    "color": "#ADB9E3",
    //* Here you can specify subfolders
    "folders": ["helpers"]
  }
}
```

> Default settings.json
```json
"fsd-imports-highlight.enabled": true,
"fsd-imports-highlight.layers": {
  "app": {
    "color": "#ADB9E3",
    "backgroundColor": "#4B4353",
    "border": "1px solid #8189A5",
    "folders": [
      "providers",
      "routing",
      "store",
      "styles"
    ]
  },
  "processes": {
    "color": "#ADB9E3",
    "backgroundColor": "#4B4353",
    "border": "1px solid #8189A5",
    "folders": []
  },
  "pages": {
    "color": "#ADB9E3",
    "backgroundColor": "#4B4353",
    "border": "1px solid #8189A5",
    "folders": []
  },
  "widgets": {
    "color": "#ADB9E3",
    "backgroundColor": "#4B4353",
    "border": "1px solid #8189A5",
    "folders": []
  },
  "features": {
    "color": "#ADB9E3",
    "backgroundColor": "#4B4353",
    "border": "1px solid #8189A5",
    "folders": []
  },
  "entities": {
    "color": "#ADB9E3",
    "backgroundColor": "#4B4353",
    "border": "1px solid #8189A5",
    "folders": []
  },
  "shared": {
    "color": "#9AD5CA",
    "backgroundColor": "#475654",
    "border": "1px solid #576F6B",
    "folders": [
      "api",
      "config",
      "layouts",
      "types",
      "ui",
      "utils"
    ]
  }
}
```
