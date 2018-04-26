Page({
  data: {
    columnInfo: [], //每列的宽度
    bodyWidth: 0, // 总宽度
    fixedList: [],  //侧边栏数据
    showFixedLeft: false,  //显示侧边栏
    fixedListTop: 0, //侧边栏滚动位置
    datas: []
  },
  onLoad() {
    this.loadMore();
  },
  /**
   * 计算单元格与scroll-view宽度
   */
  calc_col_width() {
    this.setData({
      columnInfo: [],
      bodyWidth: 0,
    });
    let keys = Object.keys(this.data.datas[0]);
    let { bodyWidth } = this.data;
    wx.createSelectorQuery().selectAll('#table-body > .body > .tr > .td > .content').boundingClientRect(rects => {
      let row_info = rects.slice(0, keys.length);
      let columnInfo = {};
      row_info.map((row, i) => {
        let width = this.get_str_length(keys[i]) > row.width ? this.get_str_length(keys[i]) : row.width;
        columnInfo[keys[i]] = width;
        bodyWidth += width;
        this.setData({
          columnInfo,
          columns: Object.keys(columnInfo),
          bodyWidth
        });
      });
      console.log(this.data.columnInfo);
    }).exec();
  },
  /**
   * 根据内容返回单元格宽度
   * @param str 单元格数据
   */
  get_str_length(str) {
    var length = 0;
    for (let i = 0; i < str.length; i++) {
      let c = str.charAt(i);
      if (/^[\u0000-\u00ff]$/.test(c)) {
        length += 0.8;
      }
      else {
        length += 1;
      }
    }
    return length * 16
  },
  /**
   * 显示侧边栏
   */
  showFixList(){
    const {datas, columns} = this.data;
    wx.createSelectorQuery().selectAll(`#table-body > .body > .tr > .${columns[0]}`).boundingClientRect(rects => {
      let fixedList = [];
      rects.map((r, i)=>{
        fixedList.push({
          height: r.height,
          width: r.width,
          data: datas[i][columns[0]]
        })
      });
      this.setData({
        fixedList,
        showFixedLeft: true,
      })
    }).exec();
  },
  /**
   * 设置左边固定栏目的滚动位置
   */
  setFixedListPosition(e){
    this.showFixList();
    this.setData({fixedListTop: e.detail.scrollTop})
  },
  /**
   * 加载更多, 通过绑定bindscrolltolower
   */
  loadMore() {
    wx.showLoading({
      title: '加载数据...',
    });
    const { datas } = this.data;
    setTimeout(() => {
      // 模拟异步
      for(let i = 0; i <= 10; i++){
        datas.push({
          "Aid": 43805,
          "MakeDate": "2018-04-25 00:00:00",
          "Name": "≥¬Êº¡’/Ω®ø®",
          "Doctor": "‘∑–°Ÿª",
          "CustomerManager": "∫Œ»Ω¡’",
          "IcNo": "800000998",
          "IsHospital": "Œ¥µΩ‘∫",
          "IsHospital1": "Œ¥µΩ‘∫",
          "P2D": "9:30",
          "P4D": "",
          "Project9": "",
          "Project4": "9:20",
          "Project13": "",
          "sort": 830,
        });
      }
      // 在此更新数据
      this.setData({ datas });
      this.calc_col_width();
      wx.hideLoading();
    }, 3000);
  }
})