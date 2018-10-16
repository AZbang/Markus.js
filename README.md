# Markus (v0.1)
__The framework for creating declarative interfaces based on pixi.js__

![preview](preview.png)



## Mark lang
**Basic syntax constructions:**
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


## Markus Engine
```js
const mark = new Markus({player: Player});
await mark.view('view.mark');

mark.get('resources').load(() => {
  mark.get('app').start();
});
```

**view(filepath)** Обрабатывает markfilе
```js
mark.view('view.mark').then(() => console.log(mark.root));
> [Resources, App]
```

**addRoot(el) | removeRoot(el)** Добавляет элемент в рутовый список элементов, чтобы он стал видимым для Markus
```js
mark.addRoot(app);
mark.addRoot(resources);
mark.removeRoot(resources);
console.log(mark.root)
> [app]
```

**get(query) | getAll(query)** Возвращает один или несколько элементов из `root` списка, имеющих сходный селектор. Красивая обертка метода `find`
```js
mark.get('sprite.cat');
> Sprite

mark.get('sprite.cat.black');
> null

mark.getAll('sprite.cat');
> [Sprite, Sptite, Sprite]

mark.getAll('#cat');
> null
```

**find(parsedQuery, elements=[], isAll=false)** Находит элементы внутри списка `elements`, имеющие сходный селектор. `parsedQuery` это объект вида `{element: 'el', tags: [], id: ''}`. Если `isAll = true`, то поиск не заканчивается на первом элементе, а на метод возвршает массив найденный элементов.
```js
mark.find({element: 'sprite', tags: ['cat'], mark.root, true});
> [Sprite, Sptite, Sprite]
```



## Markus Basic Elements
**app => BasicElement => PIXI.Application**
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

**resources => BasicElement**
Загружает все ресурсы, которые были задекларированы в свойствах элемента
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

**styles => BasicElement**
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

#### Basic Display Elements
Базовые отображаемые элементы имеют общие свойства:
```js
// computed pos like css position absolute. If parent block prop inlineItems=false
@x 0
@y 0
@top 0
@left 0
@right 0
@bottom 0
@centerX 0
@centerY 0
// if false, then position computing relative parent block. Default: false
@global off

@marginX 10
@marginY 20
@anchor .5
@anchorX .5
@anchorY .5

// transform
@w 100
@h 100
@scale 1.2
@scaleX 1.2
@scaleY 1.2
@angle 45
```

**block => DisplayElement => BasicElement => PIXI.Container**
```js
block
  // Расссчитывает позиции детей в виде списка.
  // Если включено, то свойства детей связанные с абсолютным позиционированием
  // не обрабатываются, обрабатывается только margin свойства.
  // Default: off
  @inlineItems on
```

**sprite => Markus.elements.Sprite extends PIXI.Sprite**
```js
sprite
  @texture cat.png
```

**text => DisplayElement => BasicElement => PIXI.Text**
```js
text | TEXT VALUE
  @fill #fff
  @stroke #000
  @font Bebas Neue
  @size 24

  | MULTILINE TEXT
```


## Markus Parser
```js
const parser = new MarkusParser();
await parser.parseMarkfile('mark.view');
> [{type="elementNode", element: 'app', props: {...}, presets: [...]}]
```

**parseMarkfile(path)** Парсит markfile в AST пресетов
```js
await parser.parseMarkfile(['./mark.view');
> [{type="elementNode", element: 'app', props: {...}, presets: [...]}]
```

**imports(pathes)** Загружает массив markfiles
```js
await parser.imports(['./mark.view', './resources.mark']);
> [{name: 'mark.view', path: './mark.view', data: '...'}, {...}]
```

**getImports(str)** Находит все запросы на импорт в файле из конструкции `import path`
```js
parser.getImports([
  'import resources.mark',
  'app(w=1920, h=900)',
  ' import scenes.mark'
].join('\n'));
> ['resources.mark', 'styles.mark']
```

**parsePresets(markfile) => parsePreset(line)** <br>
Парсит строку на отдельные данные пресета
```js
parser.parsePreset('    text.tag#id(visible = yes) | VALUE')
> {
  type: 'elementNode',
  depth: 2
  element: 'text',
  id: 'id',
  tags: ['tag'],
  props: {visible: true},
  value: 'VALUE'
}

parser.parsePreset('    | VALUE TEXT')
> {
  depth: 2,
  type: 'valueNode',
  value: 'VALUE TEXT'
}

parser.parsePreset('  @prop .3324')
> {
  depth: 1,
  type: 'propNode',
  name: 'prop',
  value: 0.3324
}
```

**generateTree(presets)** <br>
Генерирует AST из пресетов основываясь на `type` и `depth` свойствах пресета
```js
parser.generateTree([
  {type: 'elementNode', depth: 0, element: 'app'},
  {type: 'elementNode', depth: 1, element: 'text'},
  {type: 'propNode', depth: 2, name: 'text', value=''}
  {type: 'valueNode', depth: 3, value='TEXT NODE'}
])

> {type: 'elementNode', depth: 0, element: 'app', presets: [{
    type: 'elementNode', depth: 1, element: 'text', props: {
      text: 'TEXT NODE'
    }}
  }]
}
```

**parseQuery(query)**
Parse query selector to object
```js
parser.parseQuery('element.tag.tag2#id');
> {element: 'element', tags: ['tag', 'tag2'], id: 'id'}
```

**parseValue(str)**
Convert value from props with support js types
```js
parser.parseValue('no'|'off'|'false');
> false
parser.parseValue('yes'|'on'|'true');
> true
parser.parseValue('.5'|'+34'|'-34'|'3.32432');
> Number
parser.parseValue('anystring');
> String
```

**getImports(str)** Находит все запросы на импорт в файле из конструкции `import path`
```js
parser.getImports([
  'import resources.mark',
  'app(w=1920, h=900)',
  ' import scenes.mark'
].join('\n'));
> ['resources.mark', 'styles.mark']
```

**getDepth(line)**
Находит глубину вхождения элемента.
Рассчитывается по количеству табов вначале строки
```js
parser.getDepth("\t\t\t\t")
> 4
```

**getElement(line)**
Извлекает имя элемента
```js
parser.getElement("sprite.tag#id(prop=data)")
> "sprite"
```

**getAttr(line)**
Извлекает свойство элемента из конструкции вида `@prop data`
```js
parser.getAttr("@attr on")
> ["attr", true]
```

**getValue(line)**
Извлекает текстовое значение из конструкции вида `| .+`
```js
parser.getValue("| SOME VALUE ");
> "SOME VALUE "
```


**getProps(line)**
Извлекает все свойства элемента из конструкции `(prop=data, ...)`
```js
parser.getProps("el(texture=cat.png, font= Bebas Neue, visible = off)")
> {texture: "cat.png", font="Bebas Neue", visible: false}
```

**getTags(line)**
Извлекает все теги элемента из конструкции `.tag_name`
```js
parser.getTags("el.tag1#id.tag2.tag3")
> ["tag1", "tag2", "tag3"]
```

**getId(line)**
Извлекает id элемента из конструкции `#id_name`
```js
parser.getId("el.tag1#cat.tag2.tag3")
> "cat"
```


## Custom Element
```javascript
import Markus from 'markus'

class CustomElement extends Markus.BasicElement(PIXI.Sprite) {
  constructor(mark, parent, data) {
    super(mark, parent, data, argForPIXISprit);

  }
  onUpdate(dt) {

  }
}
```
