# richTextParse

项目是对[wxParse](https://github.com/icindy/wxParse)开源项目的封装，做成插件的形式方便使用。封装的过程中优化了在开发中遇到的一些问题：超链接会单独成为一行、video受富文本中的样式控制会出现超出屏幕的问题、图片长度超出限定长度后会有滚动条等等问题。


## 使用

组件没有使用npm，将component下的richText文件夹直接复制到项目中按官方文档引用即可
```json
"usingComponents": {
      "richText":"/component/richText/index"
}
```


**属性介绍**

| 属性名   | 类型    | 默认值 | 是否必须 | 说明                                          |
|----------|---------|--------|----------|-----------------------------------------------|
| content  | String  | ''     | 是       | 要解析的富文本                                |
| imgStyle | String  | ''     | 否       | 所有图片的样式，图片的box-size默认为boder-box |
| lazyLoad | Boolean | true   | 否       | 图片是否开启懒加载模式，默认开启              |

**事件介绍**

| 属性名  | detail           |
|---------|------------------|
| ImgLoad | 图片的长度和宽度 |
| LinkTap | src 超链接的地址 |

```
<richText content='<a href="https://www.baidu.com">baidu</a>' bindLinkTap="onLinkTap"  />
```
