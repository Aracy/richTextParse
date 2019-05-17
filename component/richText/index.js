// component/richText.js
const Parse = require('./wxParse.js')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        //要解析的富文本内容
        content: {
            type: String,
        },
        //图片的padding
        imgStyle: {
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 数据监听
     */
    observers: {
        "content" (content) {
            if (!this.data.width) {
                return
            }
            Parse.wxParse('article', 'html', content, this, 0)
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        measureLength() {
            wx.createSelectorQuery().in(this).select('#measureLen').boundingClientRect(res => {
                this.setData({
                    width: res.width
                })
            }).exec()
        },
        /**
         * 图片加载成功
         * 
         * @param event 
         */
        wxParseImgLoad(event) {
            //图片的原始宽高
            const originalWidth = event.detail.width;
            const originalHeight = event.detail.height;
            //图片计算后的宽高
            var autoWidth, autoHeight;
            if (originalWidth > this.data.width) {
                autoWidth = this.data.width;
                autoHeight = originalHeight / originalWidth * autoWidth;
            } else {
                autoWidth = originalWidth;
                autoHeight = originalHeight;
            }

            //图片数据的Index
            const idx = event.currentTarget.dataset.idx;

            const tagFrom = event.currentTarget.dataset.from;
            var temData = this.data[tagFrom];
            if (!temData || temData.images.length == 0) {
                return;
            }
            var temImages = temData.images;
            var index = temImages[idx].index
            var key = `${tagFrom}`

            for (var i of index.split('.')) key += `.nodes[${i}]`
            var keyW = key + '.width'
            var keyH = key + '.height'

            this.setData({
                [keyW]: autoWidth,
                [keyH]: autoHeight,
                [`${key}.imgStyle`]: this.data.imgStyle,
            })
        },

        /**
         * 点击链接
         * 
         * @param event 事件信息
         */
        wxParseTagATap(event) {
            this.triggerEvent('LinkTap', event.currentTarget.dataset)
        }
    },
    /**
     * 组件生命周期
     */
    lifetimes: {
        ready() {
            this.measureLength();
            if (this.data.article) {
                return
            }
            Parse.wxParse('article', 'html', this.data.content, this, 0)
            setTimeout(() => {
                console.log(this)
            }, 1500)
            console.log(__wxAppCode__)
        }
    }
})