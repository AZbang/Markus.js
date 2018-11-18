# Markus (v0.2)
__The framework for creating declarative interfaces based on pixi.js__

![preview](preview.png)


# Mark lang
```js
import path/file.mark

element.tag1#id(font=Bebas Neue Regular, prop1=data1) | TEXT VALUE
  @prop3 data3
  @objProp
    @x 13
    @y 45
    @text
      | TEXT

  @on pointerup
    @move(20, 10)
  @on pointerout
    @jump(20)

  childElement | SOME VALUE

element.tag#id2
  | TEXT VALUE
  | MORE TEXT
  | MULTILINE TEXT
  childElement.tag#id3(angle = 35)
```
