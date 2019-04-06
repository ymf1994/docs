# CSS

## 语法

 - 为选择器分组时，将单独的选择器单独放在一行。

 - 为了代码的易读性，在每个声明块的左花括号前添加一个空格。

 - 声明块的右花括号应当单独成行。

 - 每条声明语句的 : 后应该插入一个空格。

 - 为了获得更准确的错误报告，每条声明都应该独占一行。

 - 所有声明语句都应当以分号结尾。最后一条声明语句后面的分号是可选的，但是，如果省略这个分号，你的代码可能更易出错。

 - 对于以逗号分隔的属性值，每个逗号后面都应该插入一个空格（例如，box-shadow）。

 - 不要在 rgb()、rgba()、hsl()、hsla() 或 rect() 值的内部的逗号后面插入空格。这样利于从多个属性值（既加逗号也加空格）中区分多个颜色值（只加逗号，不加空格）。

 - 对于属性值或颜色参数，省略小于 1 的小数前面的 0 （例如，.5 代替 0.5；-.5px 代替 -0.5px）。

 - 十六进制值应该全部小写，例如，#fff。在扫描文档时，小写字符易于分辨，因为他们的形式更易于区分。

 - 尽量使用简写形式的十六进制值，例如，用 #fff 代替 #ffffff。
为选择器中的属性添加双引号，例如，input[type="text"]。只有在某些情况下是可选的，但是，为了代码的一致性，建议都加上双引号。

 - 避免为 0 值指定单位，例如，用 margin: 0; 代替 margin: 0px;。

```css
/* Bad CSS */
.selector, .selector-secondary, .selector[type=text] {
  padding:15px;
  margin:0px 0px 15px;
  background-color:rgba(0, 0, 0, 0.5);
  box-shadow:0px 1px 2px #CCC,inset 0 1px 0 #FFFFFF
}

/* Good CSS */
.selector,
.selector-secondary,
.selector[type="text"] {
  padding: 15px;
  margin-bottom: 15px;
  background-color: rgba(0,0,0,.5);
  box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
}
```

## 命名 [BEM 规范]

使用[ BEM ](https://en.bem.info/)命名规范，理论上讲，每行 css 代码都只有一个选择器。

BEM代表“块（block）,元素（element）,修饰符（modifier）”, 常用这三个实体开发组件。

参考:

 - [BEM Naming](http://getbem.com/naming/) 
 - [BEM的优势](http://www.cnblogs.com/dujishi/p/5862911.html)

在选择器中，由以下三种符合来表示扩展的关系：

```
-   中划线 ：仅作为连字符使用，表示某个块或者某个子元素的多单词之间的连接记号。
__  双下划线：双下划线用来连接块和块的子元素
_   单下划线：单下划线用来描述一个块或者块的子元素的一种状态(modifier的写法略有不同)

type-block__element_modifier
```
### 块（block）

一个块是设计或布局的一部分，它有具体且唯一地意义 ，要么是语义上的要么是视觉上的。

在大多数情况下，任何独立的页面元素（或复杂或简单）都可以被视作一个块。它的HTML容器会有一个唯一的CSS类名，也就是这个块的名字。

针对块的CSS类名会加一些前缀（ `ui-` ），这些前缀在CSS中有类似 **命名空间** 的作用。

一个块的正式（实际上是半正式的）定义有下面三个基本原则：

    1. CSS中只能使用类名（不能是ID）。
    
    2. 每一个块名应该有一个命名空间（前缀）
    
    3. 每一条CSS规则必须属于一个块。

例如：一个自定义列表 `.list` 是一个块，通常自定义列表是算在 `mod` 类别的，在这种情况下，一个 list 列表的block写法应该为:

```css
.list
```
### 元素（element）

块中的子元素是块的子元素，并且子元素的子元素在 `bem` 里也被认为是块的直接子元素。一个块中元素的类名必须用父级块的名称作为前缀。

如上面的例子，`li.item` 是列表的一个子元素，

```
.list{}
.list .item{}

.list{}
.list__item{}
```

### 修饰符（modifier）

一个“修饰符”可以理解为一个块的特定状态，标识着它持有一个特定的属性。

用一个例子来解释最好不过了。一个表示按钮的块默认有三个大小：小，中，大。为了避免创建三个不同的块，最好是在块上加修饰符。这个修饰符应该有个名字（比如：`size` ）和值（ `small`，`normal` 或者 `big` ）。

如上面的例子中，表示一个选中的列表，和一个激活的列表项

```
.list{}
.list.select{}
.list .item{}
.list .item.active{}

.list{}
.list_select{}
.list__item{}
.list__item_active{}
```
### BEM解决问题
组件之间的完全解耦，不会造成命名空间的污染，如：.mod-xxx ul li 的写法带来的潜在的嵌套风险。

## LESS 书写规范
使用 `.less` 后缀的文件来存储变量、混合代码以及最终合并压缩。

| 子less          | 注解                               |
| -------------- | -------------------------------- |
| `lib-base.less`     | 预定义的变量，例如颜色、字号、字体                |
| `lib-mixins.less`  | 用于混合的代码，例如渐变、半透明的混合 |
| `lib-reset.less`   | 初始化                              |
| `lib-ui.less`      | 颗粒化ui功能                          |
| `xxx.less` | 模块样式                             |

`.less` 文件的引用顺序会对最终编译的样式的作用域和优先级产生影响，请尽量按照由底层到自定义的顺序来引用。


### 书写原则

##### 1\. 原则上不会出现`2层以上`选择器嵌套

使用`BEM`原则，用命名来解耦，所有类名都为一层，增加效率和复用性

##### 2\. 两层选择器嵌套出现在`.mod-xxx__item_current`子元素的情况，如下：

使用**推荐**的嵌套写法

**常规写法：**

```css
.xxx{}
.xxx__item{}
.xxx__item_current{}
// 嵌套写法
.xxx__item_current .mod-xxx__link{}
```

**推荐：**

```css
.xxx{}
.xxx__item{}
.xxx__item_hightlight{}
.xxx__product-name{}
.xxx__link{}
.xxx__ming-zi-ke-yi-hen-chang{}

// 嵌套写法
.xxx__item_current{
    .xxx__link{}
}
```

对应的HTML结构如下：

```
<ul class="xxx">
    <li class="xxx__item">第一项
        <div class="xxx__product-name">我是名称</div>
        <span class="xxx__ming-zi-ke-yi-hen-chang">看类名</span>
        <a href="#" class="xxx__link">我是link</a>
    <li>
    <li class="xxx__item xxx__item_current">第二项 且 当前选择项
        <div class="xxx__product-name">我是名称</div>
        <a href="#" class="xxx__item-link">我是link</a>
    <li>
    <li class="xxx__item xxx__item_hightlight">第三项 且 特殊高亮
         <div class="xxx__product-name">我是名称</div>
        <a href="#" class="xxx__item-link">我是link</a>
    <li>
</ul>
```

## 缩进
soft tab (4个空格)


## 换行
以下几种情况不需要换行：

* '{'前

以下几种情况需要换行：

* '{'后和'}'前
* 每个属性独占一行
* 多个规则的分隔符','后

```css
/* not good */
.element
{color: red; background-color: black;}

/* good */
.element {
    color: red;
    background-color: black;
}

/* not good */
.element, .dialog {
    ...
}

/* good */
.element,
.dialog {
    ...
}
```

## 空行
以下几种情况需要空行：

* 文件最后保留一个空行
* '}'后最好跟一个空行，包括scss中嵌套的规则
* 属性之间需要适当的空行，具体见属性声明顺序


```css
/* not good */
.element {
    ...
}
.dialog {
    color: red;
    &:after {
        ...
    }
}

/* good */
.element {
    ...
}

.dialog {
    color: red;

    &:after {
        ...
    }
    
}
```

## 注释

注释统一用'/* */'（scss中也不要用'//'）；

缩进与下一行代码保持一致；

可位于一个代码行的末尾，与代码间隔一个空格。

```css
/* Modal header */
.modal-header {
    ...
}

/*
 * Modal header
 */
.modal-header {
    ...
}

.modal-header {
    /* 50px */
    width: 50px;

    color: red; /* color red */
}
```

## 引号
最外层统一使用双引号
url的内容要用引号
属性选择器中的属性值需要引号

```
.element:after {
    content: "";
    background-image: url("logo.png");
}

li[data-type="single"] {
    ...
}

```

## 属性声明顺序

相关的属性声明应当归为一组，并按照下面的顺序排列：

Positioning
Box model
Typographic
Visual
由于定位（positioning）可以从正常的文档流中移除元素，并且还能覆盖盒模型（box model）相关的样式，因此排在首位。盒模型排在第二位，因为它决定了组件的尺寸和位置。

其他属性只是影响组件的内部（inside）或者是不影响前两组属性，因此排在后面。

```
.declaration-order {
    display: block;
    float: right;

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;

    border: 1px solid #e5e5e5;
    border-radius: 3px;
    width: 100px;
    height: 100px;

    font: normal 13px "Helvetica Neue", sans-serif;
    line-height: 1.5;
    text-align: center;

    color: #333;
    background-color: #f5f5f5;

    opacity: 1;
}
// 下面是推荐的属性的顺序
[
    [
        "display",
        "visibility",
        "float",
        "clear",
        "overflow",
        "overflow-x",
        "overflow-y",
        "clip",
        "zoom"
    ],
    [
        "table-layout",
        "empty-cells",
        "caption-side",
        "border-spacing",
        "border-collapse",
        "list-style",
        "list-style-position",
        "list-style-type",
        "list-style-image"
    ],
    [
        "-webkit-box-orient",
        "-webkit-box-direction",
        "-webkit-box-decoration-break",
        "-webkit-box-pack",
        "-webkit-box-align",
        "-webkit-box-flex"
    ],
    [
        "position",
        "top",
        "right",
        "bottom",
        "left",
        "z-index"
    ],
    [
        "margin",
        "margin-top",
        "margin-right",
        "margin-bottom",
        "margin-left",
        "-webkit-box-sizing",
        "-moz-box-sizing",
        "box-sizing",
        "border",
        "border-width",
        "border-style",
        "border-color",
        "border-top",
        "border-top-width",
        "border-top-style",
        "border-top-color",
        "border-right",
        "border-right-width",
        "border-right-style",
        "border-right-color",
        "border-bottom",
        "border-bottom-width",
        "border-bottom-style",
        "border-bottom-color",
        "border-left",
        "border-left-width",
        "border-left-style",
        "border-left-color",
        "-webkit-border-radius",
        "-moz-border-radius",
        "border-radius",
        "-webkit-border-top-left-radius",
        "-moz-border-radius-topleft",
        "border-top-left-radius",
        "-webkit-border-top-right-radius",
        "-moz-border-radius-topright",
        "border-top-right-radius",
        "-webkit-border-bottom-right-radius",
        "-moz-border-radius-bottomright",
        "border-bottom-right-radius",
        "-webkit-border-bottom-left-radius",
        "-moz-border-radius-bottomleft",
        "border-bottom-left-radius",
        "-webkit-border-image",
        "-moz-border-image",
        "-o-border-image",
        "border-image",
        "-webkit-border-image-source",
        "-moz-border-image-source",
        "-o-border-image-source",
        "border-image-source",
        "-webkit-border-image-slice",
        "-moz-border-image-slice",
        "-o-border-image-slice",
        "border-image-slice",
        "-webkit-border-image-width",
        "-moz-border-image-width",
        "-o-border-image-width",
        "border-image-width",
        "-webkit-border-image-outset",
        "-moz-border-image-outset",
        "-o-border-image-outset",
        "border-image-outset",
        "-webkit-border-image-repeat",
        "-moz-border-image-repeat",
        "-o-border-image-repeat",
        "border-image-repeat",
        "padding",
        "padding-top",
        "padding-right",
        "padding-bottom",
        "padding-left",
        "width",
        "min-width",
        "max-width",
        "height",
        "min-height",
        "max-height"
    ],
    [
        "font",
        "font-family",
        "font-size",
        "font-weight",
        "font-style",
        "font-variant",
        "font-size-adjust",
        "font-stretch",
        "font-effect",
        "font-emphasize",
        "font-emphasize-position",
        "font-emphasize-style",
        "font-smooth",
        "line-height",
        "text-align",
        "-webkit-text-align-last",
        "-moz-text-align-last",
        "-ms-text-align-last",
        "text-align-last",
        "vertical-align",
        "white-space",
        "text-decoration",
        "text-emphasis",
        "text-emphasis-color",
        "text-emphasis-style",
        "text-emphasis-position",
        "text-indent",
        "-ms-text-justify",
        "text-justify",
        "letter-spacing",
        "word-spacing",
        "-ms-writing-mode",
        "text-outline",
        "text-transform",
        "text-wrap",
        "-ms-text-overflow",
        "text-overflow",
        "text-overflow-ellipsis",
        "text-overflow-mode",
        "-ms-word-wrap",
        "word-wrap",
        "-ms-word-break",
        "word-break"
    ],
    [
        "color",
        "background",
        "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader",
        "background-color",
        "background-image",
        "background-repeat",
        "background-attachment",
        "background-position",
        "-ms-background-position-x",
        "background-position-x",
        "-ms-background-position-y",
        "background-position-y",
        "-webkit-background-clip",
        "-moz-background-clip",
        "background-clip",
        "background-origin",
        "-webkit-background-size",
        "-moz-background-size",
        "-o-background-size",
        "background-size"
    ],
    [
        "outline",
        "outline-width",
        "outline-style",
        "outline-color",
        "outline-offset",
        "opacity",
        "filter:progid:DXImageTransform.Microsoft.Alpha(Opacity",
        "-ms-filter:\\'progid:DXImageTransform.Microsoft.Alpha",
        "-ms-interpolation-mode",
        "-webkit-box-shadow",
        "-moz-box-shadow",
        "box-shadow",
        "filter:progid:DXImageTransform.Microsoft.gradient",
        "-ms-filter:\\'progid:DXImageTransform.Microsoft.gradient",
        "text-shadow"
    ],
    [
        "-webkit-transition",
        "-moz-transition",
        "-ms-transition",
        "-o-transition",
        "transition",
        "-webkit-transition-delay",
        "-moz-transition-delay",
        "-ms-transition-delay",
        "-o-transition-delay",
        "transition-delay",
        "-webkit-transition-timing-function",
        "-moz-transition-timing-function",
        "-ms-transition-timing-function",
        "-o-transition-timing-function",
        "transition-timing-function",
        "-webkit-transition-duration",
        "-moz-transition-duration",
        "-ms-transition-duration",
        "-o-transition-duration",
        "transition-duration",
        "-webkit-transition-property",
        "-moz-transition-property",
        "-ms-transition-property",
        "-o-transition-property",
        "transition-property",
        "-webkit-transform",
        "-moz-transform",
        "-ms-transform",
        "-o-transform",
        "transform",
        "-webkit-transform-origin",
        "-moz-transform-origin",
        "-ms-transform-origin",
        "-o-transform-origin",
        "transform-origin",
        "-webkit-animation",
        "-moz-animation",
        "-ms-animation",
        "-o-animation",
        "animation",
        "-webkit-animation-name",
        "-moz-animation-name",
        "-ms-animation-name",
        "-o-animation-name",
        "animation-name",
        "-webkit-animation-duration",
        "-moz-animation-duration",
        "-ms-animation-duration",
        "-o-animation-duration",
        "animation-duration",
        "-webkit-animation-play-state",
        "-moz-animation-play-state",
        "-ms-animation-play-state",
        "-o-animation-play-state",
        "animation-play-state",
        "-webkit-animation-timing-function",
        "-moz-animation-timing-function",
        "-ms-animation-timing-function",
        "-o-animation-timing-function",
        "animation-timing-function",
        "-webkit-animation-delay",
        "-moz-animation-delay",
        "-ms-animation-delay",
        "-o-animation-delay",
        "animation-delay",
        "-webkit-animation-iteration-count",
        "-moz-animation-iteration-count",
        "-ms-animation-iteration-count",
        "-o-animation-iteration-count",
        "animation-iteration-count",
        "-webkit-animation-direction",
        "-moz-animation-direction",
        "-ms-animation-direction",
        "-o-animation-direction",
        "animation-direction"
    ],
    [
        "content",
        "quotes",
        "counter-reset",
        "counter-increment",
        "resize",
        "cursor",
        "-webkit-user-select",
        "-moz-user-select",
        "-ms-user-select",
        "user-select",
        "nav-index",
        "nav-up",
        "nav-right",
        "nav-down",
        "nav-left",
        "-moz-tab-size",
        "-o-tab-size",
        "tab-size",
        "-webkit-hyphens",
        "-moz-hyphens",
        "hyphens",
        "pointer-events"
    ]
]
```

