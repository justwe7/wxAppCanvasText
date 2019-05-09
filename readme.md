## 微信小程序canvas绘制可折行的文本

经常有这种绘制小程序海报，然后还能保存到本地分享的需求   
![Alt text](/img/1.png "Optional title")

> 图片用canvas画上去，css把文字写一下就ok了~~，一通操作猛如虎，写完之后二百五(😭)，好像文本没有绘制出来233。。(原来文本也得canvas绘制)，文本单行还好说，多行折行的问题，总不能自己一个字一个字的试吧。

-------------------------------------

### 实现原理
将段落内容逐字切割，使用小程序**measureText接口返回的文本宽度**把每个字符宽度不断累加，计算每一段内容是否超出设置既定宽度，超出则另起一行，直到遍历完成所有文本内容。

## 使用方式
- wepy,mpvue,Taro这种三方的辅助开发框架直接 `npm i wx-ctxtext` 引入即可
- 原生小程序开发方式比较麻烦
  1. `npm init` 初始化一个npm清单
  2. `npm i wx-ctxtext` 安装
  3. 小程序开发工具 -> 工具 -> 构建npm
  4. 使用

  ![Alt text](/img/3.png "Optional title")    
(因为项目用的三方辅助开发，只在本地跑了一个原生小程序测试了一下功能正常，不确定是否部署线上代码能否生效。。)

### 示例代码
```javascript
import DrawTextWrap from 'wx-ctxtext';
const config = {
  ctx: ctx,
  startX: 30,
  startY: 30,
  maxWidth: 300,
  content: {
    fontsize: 16,
    baseline: 'top',
    align: 'left',
    lineHeight: 20,
    color: '#988',
    text: '五年多以来，在各方共同努力下，“六廊六路多国多港”的互联互通架构基本形成，一大批合作项目落地生根，首届高峰论坛的各项成果顺利落实，150多个国家和国际组织同中国签署共建“一带一路”合作协议。'
  }
}
new DrawTextWrap(config).draw()
```
效果如下   
![Alt text](/img/2.png "Optional title")

### 配置项
> 所有单位以 750设计稿来换算的 


| 配置项           | 描述                                                                                                                  |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| ctx              | 小程序获取到的canvas画布 即：wx.createCanvasContext("renderImg")                                                      |
| [,screen]        | 设计稿宽度 默认是2倍为750px的,非必填                                                                                  |
| startX           | 基于canvas画布的x轴坐标开始绘制                                                                                       |
| startY           | 基于canvas画布的y轴坐标开始绘制                                                                                       |
| maxWidth         | 到此宽度开始折行                                                                                                      |
| content          | 文本设置样式,初始值(这些值非必填项) fontsize = 16, color = '#333', lineHeight = 22, baseline = 'top', align = 'left'  |
| content.fontsize | 文字大小                                                                                                              |
| content.baseline | 文字竖直对齐方式，参见[文档](https://developers.weixin.qq.com/miniprogram/dev/api/CanvasContext.setTextBaseline.html) |
| content.bold     | 是否加粗                                                                                                              |
| content.align    | 文字对齐                                                                                                              |
| content.color    | 文本颜色                                                                                                              |
| content.text     | 绘制的内容                                                                                                            |