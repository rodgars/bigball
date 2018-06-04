Country flags in single CSS sprite
==================================

CSS Sprites - a method to optimize page loads by combining a large number of small images into one. 

## Usage

Include CSS file in your HTML code then insert a transparent 1x1 pixel image with classes `flag` and `flag-{country code}`. The country code is in the format ISO 3166-1 alpha-2:

```html
<html>
    <head>
        <link href="flags.css" rel=stylesheet type="text/css">
    </head>
    <body>
        <img src="blank.gif" class="flag flag-cz" alt="Czech Republic" />
    </body>
</html>
```

## Included flags


* Argentina (ar)
* Australia (au)
* Belgium (be)
* Brazil (br)
* Colombia (co)
* Costa Rica (cr)
* Croatia (hr)
* Denmark (dk)
* Egypt (eg)
* France (fr)
* Germany (de)
* Iceland (is)
* Iran, Islamic Republic of (ir)
* Japan (jp)
* Korea, Republic of (kr)
* Mexico (mx)
* Morocco (ma)
* Nigeria (ng)
* Panama (pa)
* Peru (pe)
* Poland (pl)
* Portugal (pt)
* Russian Federation (ru)
* Saudi Arabia (sa)
* Senegal (sn)
* Serbia (rs)
* Spain (es)
* Sweden (se)
* Switzerland (ch)
* Tunisia (tn)
* United Kingdom (gb)
* Uruguay (uy)

## Links

* [CSS Flag Sprites generator](https://www.flag-sprites.com/ "Country flags in single CSS sprite")
* [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)