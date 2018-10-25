# Markus (v0.1)
__The framework for creating declarative interfaces based on pixi.js__

![preview](preview.png)

## Зачем это нужно?
* **Tree elements -- удобное представления всех игровых сущностей в виде декларации единого дерева**<br>

* **Mixins свойств -- позволяет создавать пресеты свойств, которые можно передать любым элементам дерева**<br>

* **Manipulations with elements -- единое дерево позволяет легко манипулировать элементами в любом месте вашего приложения**<br>

* **Basic Elements -- Markus предоставляет множество базовых элементов для ваших игровых интерфейсов**

* **Custom Elements -- вы создаете собственные классы, которые позже декларируете в общем дереве элементов**


## Mark lang
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

## Basic docs
* **[markus.View](preview.png)**
* **[markus.Parser](preview.png)**
* **[markus.Elements](preview.png)**
