# Markus (v0.1)
__The framework for creating declarative interfaces based on pixi.js__

![preview](preview.png)

# Зачем это нужно?
**Tree elements**<br>
Удобное представления всех игровых сущностей в виде декларации единого дерева

**Mixins свойств**<br>
Позволяет создавать пресеты свойств, которые можно передать любым элементам дерева

**Manipulations with elements**<br>
Единое дерево позволяет легко манипулировать элементами в любом месте вашего приложения

**Basic Elements**<br>
Markus предоставляет множество базовых элементов для ваших игровых интерфейсов

**Custom Elements**<br>
Вы создаете собственные классы, которые позже декларируете в общем дереве элементов


# Mark lang
```js
import path/file.mark

element.tag1#id(font=Bebas Neue Regular, prop1=data1) | TEXT VALUE
  @prop3 data3
  @objProp valueprop
    @x 13
    @y 45
  @text
    | TEXT

  childElement | SOME VALUE

element.tag#id2
  | TEXT VALUE
  | MORE TEXT
  | MULTILINE TEXT
  childElement.tag#id3(angle = 35)
```
