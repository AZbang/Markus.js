# Markus Parser
**Парсер mark документов в дерево пресетов**

```js
const parser = new markus.Parser();
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
