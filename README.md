# Markus (v0.2)
__The framework for creating declarative interfaces based on pixi.js__

![preview](preview.png)

# Install
```
npm i markusjs --save
```

```js
import markus from 'markusjs'

const view = new markus.View('mark/view.mark', () => {
  view.get('resources').load(() => {
    view.get('app').init();
  });
});

```

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


# Custom Element
```js
class CustomElement extends markus.Element() {
  constructor(preset) {
    super(preset);

    this.customProp = 0; // default value
  }
  saySomething(who) {
    console.log(`Hello ${who}!`);
  }
  onCreate() {
    console.log('Hello world!');
  }
  onRemove() {
    console.log('Goodbye world!');
  }
  onTick(dt) {
    console.log('Hey world!');
  }
}

markus.registerElements({CustomElement});
```

### And use
```js
CustomElement#id.tag1.tag2
  @customProp 1
  @hello(hourse)
```

# Links
* **[See documentation](https://azbang.github.io/Markus.js/docs/)**
* **[See examples](https://azbang.github.io/Markus.js/examples/)**
