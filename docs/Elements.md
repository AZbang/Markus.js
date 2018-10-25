# Markus Basic Elements

**app => Element => PIXI.Application**
```js
app
  // width and height game screen. Scaling to window size
  @w 1280
  @h 720
  // backgroundColor for renderer
  @color 0xFFFFFF
  // pixel smoothness when scaling textures. Default: true
  @smooth off
```
```js
// activate children presets and game ticker
mark.get('app').start();
```

**resources => Element =>  PIXI.loaders.Loader**
Загружает все ресурсы, которые были задекларированы в свойствах этого элемента
```js
resources
  @bg background.png
  @sptires sprites.json
```
```js
// All methods PIXI.loaders.Loader
mark.get('resources').load(() => {
  mark.get('app').start();
});
```

**styles => Element**
Генерирует базу свойств для элементов по селектору. При активации пресета элементу передаются все свойства из базы стилей подходящие по селектору
```js
styles
  .enemy.org
    @agresssive yes
    @health 10
    @damage 2
    @defense 24
    @message
      | I KILL YOU!
      | AGHRHRARRHA!!!
```
```js
element.tags = ['enemy', 'org'];
mark.get('styles').get(element);
> {agresssive: true, health: 10...}
```
**display => Element**
Абстрактный элемент от которого наследуют все pixi элементы
```js
// computed pos like css position absolute. If parent block prop inlineItems=false
@top 0
@left 0
@right 0
@bottom 0
@centerX 0
@centerY 0

// transform
@w 100
@h 100
@angle 45
```

**block => Display => Element => PIXI.Container**
```js
block
  // Расссчитывает позиции детей в виде списка.
  // Если включено, то свойства детей связанные с абсолютным позиционированием
  // не обрабатываются, обрабатывается только margin свойства.
  // Default: off
  @inlineItems on
```

**sprite => Display => Element => PIXI.Sprite**
```js
sprite
  @srt cat.png
```

**text => Display => Element => PIXI.Text**
```js
text | TEXT VALUE
  @fill #fff
  @stroke #000
  @font Bebas Neue
  @size 24

  | MULTILINE TEXT
```
