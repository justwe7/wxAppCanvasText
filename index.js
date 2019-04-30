class DrawTextWrap {
  constructor(props) {
    const {screen = 750} = props;
    this.rpx = wx.getSystemInfoSync().windowWidth / (screen / 2);
    this.pixelRatio = wx.getSystemInfoSync().pixelRatio;
    this.tasks = [];//初始化一个队列任务
    this.ctx = props.ctx;
    this.startX = props.startX;
    this.startY = props.startY;
    this.content = props.content;
    this.maxWidth = props.maxWidth;//文本行到 此值折行
  }
  rpxFont(fontsize) {
      return this.rpx * fontsize;
  }
  next(data) {
    const currentTask = this.tasks.shift();
    if(currentTask){
      currentTask.apply(this, [data]);//执行当前任务
    }
  }
  _lineSpacingDraw(lineArr) {
    const {fontsize = 16, color = '#333', lineHeight = 22, baseline = 'top', align = 'left'} = this.content;
    let x = this.startX,y = this.startY;
    switch (align) {
      case 'left':
        x = this.startX;
        break;
      case 'right':
        x = (this.maxWidth+this.startX);
        break;
      case 'center':
        x = ~~((this.maxWidth+this.startX*2)/2);
        break;
      default:
        break;
    }
    lineArr.forEach(element => {
      this.ctx.setTextBaseline(baseline);
      this.ctx.setFontSize(this.rpxFont(fontsize));
      this.ctx.setFillStyle(color);
      this.ctx.setTextAlign(align);
      this.ctx.fillText(element, x, y);
      y += lineHeight;
    });
  }
  _cuttingline() {//切割行为数组 一个长度为一行
    const {text, fontsize, color} = this.content;
    this.ctx.setFontSize(this.rpxFont(fontsize));
    let arrText = text.split('');//将字符切割为数组
    let drawTextArr = [],//需要绘制的文字，每个下标为段落一行
        curLineText = "",//目标行的内容
        lineNum = 0;//有几行？？
    while (arrText.length > 0) {
      const font = arrText.shift();
      const curLineWidth = this.ctx.measureText(curLineText).width;
      if (curLineWidth > this.maxWidth) {//如果超出阈值 新增一行内容
        curLineText = font;//重置 当前行内容
        drawTextArr.push(curLineText);
        lineNum++;
      } else {//否则 将当前行内容以字符为单位添加
        curLineText += font;
        drawTextArr[lineNum] = curLineText;//新增一个长度的内容
      }
    }
    this.next(drawTextArr)
  }
  draw() {
    this.ctx.save();
    this.tasks = [this._cuttingline, this._lineSpacingDraw];
    this.next();
    this.ctx.restore();
  }
}

export default DrawTextWrap;