# Markus Engine
**markus.View -- рутовый элемент всего дерева объектов. Отвечает за загрузку дерева и манипуляцию с элементами.**

```js
const mark = new markus.View('view.mark', {player: Player});
mark.onReady(() => {
  mark.get('resources').load(() => {
    mark.get('app').start();
  });
});
```

**add(str|array|object, parent=view)** Добавляет пресет в родительский элемент
```js
mark.add('enemy.zombie(level=23)', enemyController);
mark.add([presetEnemy, presetEnemy], enemyController);
mark.add(presetEnemy, enemyController);
```

**remove(str|array|object, parent=view)** Удаляет элемент в родительский элемент
```js
mark.remove('enemy.zombie(level=23)', enemyController);
mark.remove([Enemy, Enemy], enemyController);
mark.remove(Enemy, enemyController);
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
