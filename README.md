dbpasCarousel
=============

Another jQuery carousel plugin! <br />
Inspired by this [web.enavu.com](http://web.enavu.com/tutorials/making-an-infinite-jquery-carousel/) article.

[Demo](http://dbpas.github.io/dbpasCarousel/)

###Install
```html
<head>
  ...
  <link rel="stylesheet" type="text/css" href="jquery.dbpas.carousel.css" />
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
  <script src="javascripts/jquery.dbpas.carousel.js"></script>
  <script>
    $(document).ready(function() {
      $('ul').dbpasCarousel({options});
    });
  </script>
  ...
</head>
```
###Options
|Option         |Description                                                                              |Type      |Default |
|---------------|-----------------------------------------------------------------------------------------|----------|--------|
|`itemsVisible` |Number of items to display. For smooth movement, leave at a minimum 2 items out of view. |`int`     |2       |
|`slideDelay`   |This is the carousel animations duration, in milliseconds.                               |`int`     |500     |
|`autoSlide`    |Move carousel without user interaction when page is ready.                               |`boolean` |0       |
|`autoDelay`    |The frequency the auto slide moves the carousel, in milliseconds.                        |`int`     |5000    |
|`hoverPause`   |Pause auto slide when hovering over carousel.                                            |`boolean` |1       |
|`imgCaption`   |Auto generate captions for each slide using `img` `alt` attribute.                       |`boolean` |1       |
|`onComplete`   |callback function                                                                        |`function`|null    |

###Usage
####Simple Images
Place your images into the `li` elements.
```html
<body>
  ...
  <ul>
    <li><img src="http://lorempixel.com/100/100/abstract" alt="image 1" /></li>
    <li><img src="http://lorempixel.com/100/100/animals" alt="image 2" /></li>
    <li><img src="http://lorempixel.com/100/100/nature" alt="image 3" /></li>
    <li><img src="http://lorempixel.com/100/100/people" alt="image 4" /></li>
  </ul>
  ...
</body>
```
####Varying Content
Wrap your content with a `div` and place it into the `li` elements.
```html
<body>
  ...
  <ul>
    <li>
      <div>
        <h3>Paragraph 1</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum accumsan sapien congue, iaculis sem at, blandit tortor. Vestibulum eget orci a leo mattis commodo ut quis diam. Nullam porttitor tempus nunc, ac luctus lectus euismod eget. Vestibulum vestibulum neque vel enim condimentum consequat. Mauris gravida eros sapien, id bibendum nunc vulputate quis. Nam facilisis turpis ligula, vitae bibendum elit adipiscing ac. Phasellus id lectus varius, imperdiet urna vitae, ornare est.
        </p>
      </div>
    </li>
    <li>
      <div>
        <h3>Paragraph 2</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum accumsan sapien congue, iaculis sem at, blandit tortor. Vestibulum eget orci a leo mattis commodo ut quis diam. Nullam porttitor tempus nunc, ac luctus lectus euismod eget. Vestibulum vestibulum neque vel enim condimentum consequat. Mauris gravida eros sapien, id bibendum nunc vulputate quis. Nam facilisis turpis ligula, vitae bibendum elit adipiscing ac. Phasellus id lectus varius, imperdiet urna vitae, ornare est.
        </p>
      </div>
    </li>
    <li>
      <div>
        <h3>Paragraph 3</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum accumsan sapien congue, iaculis sem at, blandit tortor. Vestibulum eget orci a leo mattis commodo ut quis diam. Nullam porttitor tempus nunc, ac luctus lectus euismod eget. Vestibulum vestibulum neque vel enim condimentum consequat. Mauris gravida eros sapien, id bibendum nunc vulputate quis. Nam facilisis turpis ligula, vitae bibendum elit adipiscing ac. Phasellus id lectus varius, imperdiet urna vitae, ornare est.
        </p>
      </div>
    </li>
    <li>
      <div>
        <h3>Paragraph 4</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum accumsan sapien congue, iaculis sem at, blandit tortor. Vestibulum eget orci a leo mattis commodo ut quis diam. Nullam porttitor tempus nunc, ac luctus lectus euismod eget. Vestibulum vestibulum neque vel enim condimentum consequat. Mauris gravida eros sapien, id bibendum nunc vulputate quis. Nam facilisis turpis ligula, vitae bibendum elit adipiscing ac. Phasellus id lectus varius, imperdiet urna vitae, ornare est.
        </p>
      </div>
    </li>
  </ul>
  ...
</body>
```
