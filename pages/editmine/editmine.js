const app = getApp()
import {
  prod
} from '../../utils/env';
const {
  baseUrl
} = prod;
import {
  editinfo
} from "../../utils/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    baseUrl: baseUrl,
    detailinfo: {},
    isdetailinfo: false,
    aaa: [{
        id: 1,
        name: "北京",
        city: [{
          id: "北京市",
          name: "北京市",
        }, ],
      },
      {
        id: 2,
        name: "天津",
        city: [{
          id: "天津市",
          name: "天津市",
        }, ],
      },
      {
        id: 3,
        name: "河北",
        city: [{
            id: "石家庄市",
            name: "石家庄市",
          },
          {
            id: "唐山市",
            name: "唐山市",
          },
          {
            id: "秦皇岛市",
            name: "秦皇岛市",
          },
          {
            id: "邯郸市",
            name: "邯郸市",
          },
          {
            id: "邢台市",
            name: "邢台市",
          },
          {
            id: "保定市",
            name: "保定市",
          },
          {
            id: "张家口市",
            name: "张家口市",
          },
          {
            id: "承德市",
            name: "承德市",
          },
          {
            id: "沧州市",
            name: "沧州市",
          },
          {
            id: "廊坊市",
            name: "廊坊市",
          },
          {
            id: "衡水市",
            name: "衡水市",
          },
        ],
      },
      {
        id: 4,
        name: "山西",
        city: [{
            id: "太原市",
            name: "太原市",
          },
          {
            id: "大同市",
            name: "大同市",
          },
          {
            id: "阳泉市",
            name: "阳泉市",
          },
          {
            id: "长治市",
            name: "长治市",
          },
          {
            id: "晋城市",
            name: "晋城市",
          },
          {
            id: "朔州市",
            name: "朔州市",
          },
          {
            id: "晋中市",
            name: "晋中市",
          },
          {
            id: "运城市",
            name: "运城市",
          },
          {
            id: "忻州市",
            name: "忻州市",
          },
          {
            id: "临汾市",
            name: "临汾市",
          },
          {
            id: "吕梁市",
            name: "吕梁市",
          },
        ],
      },
      {
        id: 5,
        name: "内蒙古",
        city: [{
            id: "呼和浩特市",
            name: "呼和浩特市",
          },
          {
            id: "包头市",
            name: "包头市",
          },
          {
            id: "乌海市",
            name: "乌海市",
          },
          {
            id: "赤峰市",
            name: "赤峰市",
          },
          {
            id: "通辽市",
            name: "通辽市",
          },
          {
            id: "鄂尔多斯市",
            name: "鄂尔多斯市",
          },
          {
            id: "呼伦贝尔市",
            name: "呼伦贝尔市",
          },
          {
            id: "巴彦淖尔市",
            name: "巴彦淖尔市",
          },
          {
            id: "乌兰察布市",
            name: "乌兰察布市",
          },
          {
            id: "兴安盟",
            name: "兴安盟",
          },
          {
            id: "锡林郭勒盟",
            name: "锡林郭勒盟",
          },
          {
            id: "阿拉善盟",
            name: "阿拉善盟",
          },
        ],
      },
      {
        id: 6,
        name: "辽宁",
        city: [{
            id: "沈阳市",
            name: "沈阳市",
          },
          {
            id: "大连市",
            name: "大连市",
          },
          {
            id: "鞍山市",
            name: "鞍山市",
          },
          {
            id: "抚顺市",
            name: "抚顺市",
          },
          {
            id: "本溪市",
            name: "本溪市",
          },
          {
            id: "丹东市",
            name: "丹东市",
          },
          {
            id: "锦州市",
            name: "锦州市",
          },
          {
            id: "营口市",
            name: "营口市",
          },
          {
            id: "阜新市",
            name: "阜新市",
          },
          {
            id: "辽阳市",
            name: "辽阳市",
          },
          {
            id: "盘锦市",
            name: "盘锦市",
          },
          {
            id: "铁岭市",
            name: "铁岭市",
          },
          {
            id: "朝阳市",
            name: "朝阳市",
          },
          {
            id: "葫芦岛市",
            name: "葫芦岛市",
          },
        ],
      },
      {
        id: 7,
        name: "吉林",
        city: [{
            id: "长春市",
            name: "长春市",
          },
          {
            id: "吉林市",
            name: "吉林市",
          },
          {
            id: "四平市",
            name: "四平市",
          },
          {
            id: "辽源市",
            name: "辽源市",
          },
          {
            id: "通化市",
            name: "通化市",
          },
          {
            id: "白山市",
            name: "白山市",
          },
          {
            id: "松原市",
            name: "松原市",
          },
          {
            id: "白城市",
            name: "白城市",
          },
          {
            id: "延边",
            name: "延边",
          },
        ],
      },
      {
        id: 8,
        name: "黑龙江",
        city: [{
            id: "哈尔滨市",
            name: "哈尔滨市",
          },
          {
            id: "齐齐哈尔市",
            name: "齐齐哈尔市",
          },
          {
            id: "鸡西市",
            name: "鸡西市",
          },
          {
            id: "鹤岗市",
            name: "鹤岗市",
          },
          {
            id: "双鸭山市",
            name: "双鸭山市",
          },
          {
            id: "大庆市",
            name: "大庆市",
          },
          {
            id: "伊春市",
            name: "伊春市",
          },
          {
            id: "佳木斯市",
            name: "佳木斯市",
          },
          {
            id: "七台河市",
            name: "七台河市",
          },
          {
            id: "牡丹江市",
            name: "牡丹江市",
          },
          {
            id: "黑河市",
            name: "黑河市",
          },
          {
            id: "绥化市",
            name: "绥化市",
          },
          {
            id: "大兴安岭地区",
            name: "大兴安岭地区",
          },
        ],
      },
      {
        id: 9,
        name: "上海",
        city: [{
          id: "上海市",
          name: "上海市",
        }, ],
      },
      {
        id: 10,
        name: "江苏",
        city: [{
            id: "南京市",
            name: "南京市",
          },
          {
            id: "无锡市",
            name: "无锡市",
          },
          {
            id: "徐州市",
            name: "徐州市",
          },
          {
            id: "常州市",
            name: "常州市",
          },
          {
            id: "苏州市",
            name: "苏州市",
          },
          {
            id: "南通市",
            name: "南通市",
          },
          {
            id: "连云港市",
            name: "连云港市",
          },
          {
            id: "淮安市",
            name: "淮安市",
          },
          {
            id: "盐城市",
            name: "盐城市",
          },
          {
            id: "扬州市",
            name: "扬州市",
          },
          {
            id: "镇江市",
            name: "镇江市",
          },
          {
            id: "泰州市",
            name: "泰州市",
          },
          {
            id: "宿迁市",
            name: "宿迁市",
          },
        ],
      },
      {
        id: 11,
        name: "浙江",
        city: [{
            id: "杭州市",
            name: "杭州市",
          },
          {
            id: "宁波市",
            name: "宁波市",
          },
          {
            id: "温州市",
            name: "温州市",
          },
          {
            id: "嘉兴市",
            name: "嘉兴市",
          },
          {
            id: "湖州市",
            name: "湖州市",
          },
          {
            id: "绍兴市",
            name: "绍兴市",
          },
          {
            id: "金华市",
            name: "金华市",
          },
          {
            id: "衢州市",
            name: "衢州市",
          },
          {
            id: "舟山市",
            name: "舟山市",
          },
          {
            id: "台州市",
            name: "台州市",
          },
          {
            id: "丽水市",
            name: "丽水市",
          },
        ],
      },
      {
        id: 12,
        name: "安徽",
        city: [{
            id: "合肥市",
            name: "合肥市",
          },
          {
            id: "芜湖市",
            name: "芜湖市",
          },
          {
            id: "蚌埠市",
            name: "蚌埠市",
          },
          {
            id: "淮南市",
            name: "淮南市",
          },
          {
            id: "马鞍山市",
            name: "马鞍山市",
          },
          {
            id: "淮北市",
            name: "淮北市",
          },
          {
            id: "铜陵市",
            name: "铜陵市",
          },
          {
            id: "安庆市",
            name: "安庆市",
          },
          {
            id: "黄山市",
            name: "黄山市",
          },
          {
            id: "滁州市",
            name: "滁州市",
          },
          {
            id: "阜阳市",
            name: "阜阳市",
          },
          {
            id: "宿州市",
            name: "宿州市",
          },
          {
            id: "巢湖市",
            name: "巢湖市",
          },
          {
            id: "六安市",
            name: "六安市",
          },
          {
            id: "亳州市",
            name: "亳州市",
          },
          {
            id: "池州市",
            name: "池州市",
          },
          {
            id: "宣城市",
            name: "宣城市",
          },
        ],
      },
      {
        id: 13,
        name: "福建",
        city: [{
            id: "福州市",
            name: "福州市",
          },
          {
            id: "厦门市",
            name: "厦门市",
          },
          {
            id: "莆田市",
            name: "莆田市",
          },
          {
            id: "三明市",
            name: "三明市",
          },
          {
            id: "泉州市",
            name: "泉州市",
          },
          {
            id: "漳州市",
            name: "漳州市",
          },
          {
            id: "南平市",
            name: "南平市",
          },
          {
            id: "龙岩市",
            name: "龙岩市",
          },
          {
            id: "宁德市",
            name: "宁德市",
          },
        ],
      },
      {
        id: 14,
        name: "江西",
        city: [{
            id: "南昌市",
            name: "南昌市",
          },
          {
            id: "景德镇市",
            name: "景德镇市",
          },
          {
            id: "萍乡市",
            name: "萍乡市",
          },
          {
            id: "九江市",
            name: "九江市",
          },
          {
            id: "新余市",
            name: "新余市",
          },
          {
            id: "鹰潭市",
            name: "鹰潭市",
          },
          {
            id: "赣州市",
            name: "赣州市",
          },
          {
            id: "吉安市",
            name: "吉安市",
          },
          {
            id: "宜春市",
            name: "宜春市",
          },
          {
            id: "抚州市",
            name: "抚州市",
          },
          {
            id: "上饶市",
            name: "上饶市",
          },
        ],
      },
      {
        id: 15,
        name: "山东",
        city: [{
            id: "济南市",
            name: "济南市",
          },
          {
            id: "青岛市",
            name: "青岛市",
          },
          {
            id: "淄博市",
            name: "淄博市",
          },
          {
            id: "枣庄市",
            name: "枣庄市",
          },
          {
            id: "东营市",
            name: "东营市",
          },
          {
            id: "烟台市",
            name: "烟台市",
          },
          {
            id: "潍坊市",
            name: "潍坊市",
          },
          {
            id: "济宁市",
            name: "济宁市",
          },
          {
            id: "泰安市",
            name: "泰安市",
          },
          {
            id: "威海市",
            name: "威海市",
          },
          {
            id: "日照市",
            name: "日照市",
          },
          {
            id: "莱芜市",
            name: "莱芜市",
          },
          {
            id: "临沂市",
            name: "临沂市",
          },
          {
            id: "德州市",
            name: "德州市",
          },
          {
            id: "聊城市",
            name: "聊城市",
          },
          {
            id: "滨州市",
            name: "滨州市",
          },
          {
            id: "荷泽市",
            name: "荷泽市",
          },
        ],
      },
      {
        id: 16,
        name: "河南",
        city: [{
            id: "郑州市",
            name: "郑州市",
          },
          {
            id: "开封市",
            name: "开封市",
          },
          {
            id: "洛阳市",
            name: "洛阳市",
          },
          {
            id: "平顶山市",
            name: "平顶山市",
          },
          {
            id: "安阳市",
            name: "安阳市",
          },
          {
            id: "鹤壁市",
            name: "鹤壁市",
          },
          {
            id: "新乡市",
            name: "新乡市",
          },
          {
            id: "焦作市",
            name: "焦作市",
          },
          {
            id: "濮阳市",
            name: "濮阳市",
          },
          {
            id: "许昌市",
            name: "许昌市",
          },
          {
            id: "漯河市",
            name: "漯河市",
          },
          {
            id: "三门峡市",
            name: "三门峡市",
          },
          {
            id: "南阳市",
            name: "南阳市",
          },
          {
            id: "商丘市",
            name: "商丘市",
          },
          {
            id: "信阳市",
            name: "信阳市",
          },
          {
            id: "周口市",
            name: "周口市",
          },
          {
            id: "驻马店市",
            name: "驻马店市",
          },
        ],
      },
      {
        id: 17,
        name: "湖北",
        city: [{
            id: "武汉市",
            name: "武汉市",
          },
          {
            id: "黄石市",
            name: "黄石市",
          },
          {
            id: "十堰市",
            name: "十堰市",
          },
          {
            id: "宜昌市",
            name: "宜昌市",
          },
          {
            id: "襄樊市",
            name: "襄樊市",
          },
          {
            id: "鄂州市",
            name: "鄂州市",
          },
          {
            id: "荆门市",
            name: "荆门市",
          },
          {
            id: "孝感市",
            name: "孝感市",
          },
          {
            id: "荆州市",
            name: "荆州市",
          },
          {
            id: "黄冈市",
            name: "黄冈市",
          },
          {
            id: "咸宁市",
            name: "咸宁市",
          },
          {
            id: "随州市",
            name: "随州市",
          },
          {
            id: "恩施",
            name: "恩施",
          },
          {
            id: "神农架",
            name: "神农架",
          },
        ],
      },
      {
        id: 18,
        name: "湖南",
        city: [{
            id: "长沙市",
            name: "长沙市",
          },
          {
            id: "株洲市",
            name: "株洲市",
          },
          {
            id: "湘潭市",
            name: "湘潭市",
          },
          {
            id: "衡阳市",
            name: "衡阳市",
          },
          {
            id: "邵阳市",
            name: "邵阳市",
          },
          {
            id: "岳阳市",
            name: "岳阳市",
          },
          {
            id: "常德市",
            name: "常德市",
          },
          {
            id: "张家界市",
            name: "张家界市",
          },
          {
            id: "益阳市",
            name: "益阳市",
          },
          {
            id: "郴州市",
            name: "郴州市",
          },
          {
            id: "永州市",
            name: "永州市",
          },
          {
            id: "怀化市",
            name: "怀化市",
          },
          {
            id: "娄底市",
            name: "娄底市",
          },
          {
            id: "湘西",
            name: "湘西",
          },
        ],
      },
      {
        id: 19,
        name: "广东",
        city: [{
            id: "广州市",
            name: "广州市",
          },
          {
            id: "韶关市",
            name: "韶关市",
          },
          {
            id: "深圳市",
            name: "深圳市",
          },
          {
            id: "珠海市",
            name: "珠海市",
          },
          {
            id: "汕头市",
            name: "汕头市",
          },
          {
            id: "佛山市",
            name: "佛山市",
          },
          {
            id: "江门市",
            name: "江门市",
          },
          {
            id: "湛江市",
            name: "湛江市",
          },
          {
            id: "茂名市",
            name: "茂名市",
          },
          {
            id: "肇庆市",
            name: "肇庆市",
          },
          {
            id: "惠州市",
            name: "惠州市",
          },
          {
            id: "梅州市",
            name: "梅州市",
          },
          {
            id: "汕尾市",
            name: "汕尾市",
          },
          {
            id: "河源市",
            name: "河源市",
          },
          {
            id: "阳江市",
            name: "阳江市",
          },
          {
            id: "清远市",
            name: "清远市",
          },
          {
            id: "东莞市",
            name: "东莞市",
          },
          {
            id: "中山市",
            name: "中山市",
          },
          {
            id: "潮州市",
            name: "潮州市",
          },
          {
            id: "揭阳市",
            name: "揭阳市",
          },
          {
            id: "云浮市",
            name: "云浮市",
          },
        ],
      },
      {
        id: 20,
        name: "广西",
        city: [{
            id: "南宁市",
            name: "南宁市",
          },
          {
            id: "柳州市",
            name: "柳州市",
          },
          {
            id: "桂林市",
            name: "桂林市",
          },
          {
            id: "梧州市",
            name: "梧州市",
          },
          {
            id: "北海市",
            name: "北海市",
          },
          {
            id: "防城港市",
            name: "防城港市",
          },
          {
            id: "钦州市",
            name: "钦州市",
          },
          {
            id: "贵港市",
            name: "贵港市",
          },
          {
            id: "玉林市",
            name: "玉林市",
          },
          {
            id: "百色市",
            name: "百色市",
          },
          {
            id: "贺州市",
            name: "贺州市",
          },
          {
            id: "河池市",
            name: "河池市",
          },
          {
            id: "来宾市",
            name: "来宾市",
          },
          {
            id: "崇左市",
            name: "崇左市",
          },
        ],
      },
      {
        id: 21,
        name: "海南",
        city: [{
            id: "海口市",
            name: "海口市",
          },
          {
            id: "三亚市",
            name: "三亚市",
          },
        ],
      },
      {
        id: 22,
        name: "重庆",
        city: [{
          id: "重庆市",
          name: "重庆市",
        }, ],
      },
      {
        id: 23,
        name: "四川",
        city: [{
            id: "成都市",
            name: "成都市",
          },
          {
            id: "自贡市",
            name: "自贡市",
          },
          {
            id: "攀枝花市",
            name: "攀枝花市",
          },
          {
            id: "泸州市",
            name: "泸州市",
          },
          {
            id: "德阳市",
            name: "德阳市",
          },
          {
            id: "绵阳市",
            name: "绵阳市",
          },
          {
            id: "广元市",
            name: "广元市",
          },
          {
            id: "遂宁市",
            name: "遂宁市",
          },
          {
            id: "内江市",
            name: "内江市",
          },
          {
            id: "乐山市",
            name: "乐山市",
          },
          {
            id: "南充市",
            name: "南充市",
          },
          {
            id: "眉山市",
            name: "眉山市",
          },
          {
            id: "宜宾市",
            name: "宜宾市",
          },
          {
            id: "广安市",
            name: "广安市",
          },
          {
            id: "达州市",
            name: "达州市",
          },
          {
            id: "雅安市",
            name: "雅安市",
          },
          {
            id: "巴中市",
            name: "巴中市",
          },
          {
            id: "资阳市",
            name: "资阳市",
          },
          {
            id: "阿坝",
            name: "阿坝",
          },
          {
            id: "甘孜",
            name: "甘孜",
          },
          {
            id: "凉山",
            name: "凉山",
          },
        ],
      },
      {
        id: 24,
        name: "贵州",
        city: [{
            id: "贵阳市",
            name: "贵阳市",
          },
          {
            id: "六盘水市",
            name: "六盘水市",
          },
          {
            id: "遵义市",
            name: "遵义市",
          },
          {
            id: "安顺市",
            name: "安顺市",
          },
          {
            id: "铜仁地区",
            name: "铜仁地区",
          },
          {
            id: "黔西",
            name: "黔西",
          },
          {
            id: "毕节地区",
            name: "毕节地区",
          },
          {
            id: "黔东",
            name: "黔东",
          },
          {
            id: "黔南",
            name: "黔南",
          },
        ],
      },
      {
        id: 25,
        name: "云南",
        city: [{
            id: "昆明市",
            name: "昆明市",
          },
          {
            id: "曲靖市",
            name: "曲靖市",
          },
          {
            id: "玉溪市",
            name: "玉溪市",
          },
          {
            id: "保山市",
            name: "保山市",
          },
          {
            id: "昭通市",
            name: "昭通市",
          },
          {
            id: "丽江市",
            name: "丽江市",
          },
          {
            id: "思茅市",
            name: "思茅市",
          },
          {
            id: "临沧市",
            name: "临沧市",
          },
          {
            id: "楚雄",
            name: "楚雄",
          },
          {
            id: "红河",
            name: "红河",
          },
          {
            id: "文山",
            name: "文山",
          },
          {
            id: "西双版纳",
            name: "西双版纳",
          },
          {
            id: "大理",
            name: "大理",
          },
          {
            id: "德宏",
            name: "德宏",
          },
          {
            id: "怒江",
            name: "怒江",
          },
          {
            id: "迪庆",
            name: "迪庆",
          },
        ],
      },
      {
        id: 26,
        name: "西藏",
        city: [{
            id: "拉萨市",
            name: "拉萨市",
          },
          {
            id: "昌都地区",
            name: "昌都地区",
          },
          {
            id: "山南地区",
            name: "山南地区",
          },
          {
            id: "日喀则地区",
            name: "日喀则地区",
          },
          {
            id: "那曲地区",
            name: "那曲地区",
          },
          {
            id: "阿里地区",
            name: "阿里地区",
          },
          {
            id: "林芝地区",
            name: "林芝地区",
          },
        ],
      },
      {
        id: 27,
        name: "陕西",
        city: [{
            id: "西安市",
            name: "西安市",
          },
          {
            id: "铜川市",
            name: "铜川市",
          },
          {
            id: "宝鸡市",
            name: "宝鸡市",
          },
          {
            id: "咸阳市",
            name: "咸阳市",
          },
          {
            id: "渭南市",
            name: "渭南市",
          },
          {
            id: "延安市",
            name: "延安市",
          },
          {
            id: "汉中市",
            name: "汉中市",
          },
          {
            id: "榆林市",
            name: "榆林市",
          },
          {
            id: "安康市",
            name: "安康市",
          },
          {
            id: "商洛市",
            name: "商洛市",
          },
        ],
      },
      {
        id: 28,
        name: "甘肃",
        city: [{
            id: "兰州市",
            name: "兰州市",
          },
          {
            id: "嘉峪关市",
            name: "嘉峪关市",
          },
          {
            id: "金昌市",
            name: "金昌市",
          },
          {
            id: "白银市",
            name: "白银市",
          },
          {
            id: "天水市",
            name: "天水市",
          },
          {
            id: "武威市",
            name: "武威市",
          },
          {
            id: "张掖市",
            name: "张掖市",
          },
          {
            id: "平凉市",
            name: "平凉市",
          },
          {
            id: "酒泉市",
            name: "酒泉市",
          },
          {
            id: "庆阳市",
            name: "庆阳市",
          },
          {
            id: "定西市",
            name: "定西市",
          },
          {
            id: "陇南市",
            name: "陇南市",
          },
          {
            id: "临夏",
            name: "临夏",
          },
          {
            id: "甘南",
            name: "甘南",
          },
        ],
      },
      {
        id: 29,
        name: "青海",
        city: [{
            id: "西宁市",
            name: "西宁市",
          },
          {
            id: "海东地区",
            name: "海东地区",
          },
          {
            id: "海北",
            name: "海北",
          },
          {
            id: "黄南",
            name: "黄南",
          },
          {
            id: "海南",
            name: "海南",
          },
          {
            id: "果洛",
            name: "果洛",
          },
          {
            id: "玉树",
            name: "玉树",
          },
          {
            id: "海西",
            name: "海西",
          },
        ],
      },
      {
        id: 30,
        name: "宁夏",
        city: [{
            id: "银川市",
            name: "银川市",
          },
          {
            id: "石嘴山市",
            name: "石嘴山市",
          },
          {
            id: "吴忠市",
            name: "吴忠市",
          },
          {
            id: "固原市",
            name: "固原市",
          },
          {
            id: "中卫市",
            name: "中卫市",
          },
        ],
      },
      {
        id: 31,
        name: "新疆",
        city: [{
            id: "乌鲁木齐市",
            name: "乌鲁木齐市",
          },
          {
            id: "克拉玛依市",
            name: "克拉玛依市",
          },
          {
            id: "吐鲁番地区",
            name: "吐鲁番地区",
          },
          {
            id: "哈密地区",
            name: "哈密地区",
          },
          {
            id: "昌吉",
            name: "昌吉",
          },
          {
            id: "博尔塔拉",
            name: "博尔塔拉",
          },
          {
            id: "巴音郭楞",
            name: "巴音郭楞",
          },
          {
            id: "阿克苏地区",
            name: "阿克苏地区",
          },
          {
            id: "克孜勒苏柯尔克孜",
            name: "克孜勒苏柯尔克孜",
          },
          {
            id: "喀什地区",
            name: "喀什地区",
          },
          {
            id: "和田地区",
            name: "和田地区",
          },
          {
            id: "伊犁哈萨克",
            name: "伊犁哈萨克",
          },
          {
            id: "塔城地区",
            name: "塔城地区",
          },
          {
            id: "阿勒泰地区",
            name: "阿勒泰地区",
          },
          {
            id: "石河子市",
            name: "石河子市",
          },
          {
            id: "阿拉尔市",
            name: "阿拉尔市",
          },
          {
            id: "图木舒克市",
            name: "图木舒克市",
          },
          {
            id: "五家渠市",
            name: "五家渠市",
          },
        ],
      },
      {
        id: 32,
        name: "香港",
        city: [{
          id: "香港",
          name: "香港",
        }, ],
      },
      {
        id: 33,
        name: "澳门",
        city: [{
          id: "澳门",
          name: "澳门",
        }, ],
      },
      {
        id: 34,
        name: "台湾",
        city: [{
          id: "台湾",
          name: "台湾",
        }, ],
      },
    ],
    multiArray: [
      ['无脊柱动物', '脊柱动物'],
      ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'],
      ['猪肉绦虫', '吸血虫']
    ],
    formObj: {
      xcxbesee: 0,
      xcxsex: 0,
      xcxbornday: '',
      xcxname: '',
      xcxremark: '',
      aa: '甘肃省',
      bb: '兰州市',
      cc: '全部',
    },
    sexarray: [{
      name: '保密',
      id: 0
    }, {
      name: '男',
      id: 1
    }, {
      name: '女',
      id: 2
    }],
    gettime: `${new Date().getFullYear()}-${(new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : `0${new Date().getMonth() + 1}`}-${new Date().getDate() > 9 ? new Date().getDate() : `0${new Date().getDate()}`}`,
    multiIndex: [1, 0, 0],
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.multiArray[2] = ['蛔虫'];
                break;
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  editchange() {
    if (this.data.edit) {
      this.setData({
        detailinfo: app.globalData.detailinfo,
        isdetailinfo: app.globalData.isdetailinfo
      })
      this.setData({
        ['formObj.xcxsex']: app.globalData.detailinfo.xcxsex,
        ['formObj.xcxbornday']: app.globalData.detailinfo.xcxbornday ? app.globalData.detailinfo.xcxbornday : '保密',
        ['formObj.xcxname']: app.globalData.detailinfo.xcxname,
        ['formObj.xcxremark']: app.globalData.detailinfo.xcxremark,
        ['formObj.xcxbesee']: app.globalData.detailinfo.xcxbesee,
      })
    }
    this.setData({
      edit: !this.data.edit,
    })
  },
  previewImage(e) {
    if (e.currentTarget.dataset.img) {
      wx.previewImage({
        current: e.currentTarget.dataset.img, // 当前显示图片的http链接
        urls: e.currentTarget.dataset.current // 需要预览的图片http链接列表
      })
    }
  },
  sexChange: function (e) {
    this.setData({
      ['formObj.xcxsex']: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ['formObj.xcxbornday']: e.detail.value
    })
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
  },
  saveinfo() {
    this.editinfo()
  },
  xcxremarkChange(e) {
    this.setData({
      ['formObj.xcxremark']: e.detail.value,
    })
  },
  xcxnameChange(e) {
    this.setData({
      ['formObj.xcxname']: e.detail.value,
    })
  },
  editinfo() {
    editinfo({
      xcxname: this.data.formObj.xcxname,
      xcxsex: this.data.formObj.xcxsex,
      xcxbornday: this.data.formObj.xcxbornday,
      xcxremark: this.data.formObj.xcxremark,
      openid: this.data.detailinfo.openid
    }).then(res => {
      if (res.data.success) {
        app.globalData.userInfo = res.data.data.usertable,
          app.globalData.hasUserInfo = true,
          this.setData({
            detailinfo: app.globalData.userInfo,
            isdetailinfo: app.globalData.isdetailinfo
          })
        wx.showToast({
          title: res.data.msg,
        })
        this.setData({
          edit: false,
        })
        wx.switchTab({
          url: "/pages/mine/mine",
        })
      } else {
        console.log(res.data.msg)
      }
    })
  },
  onLoad: function (options) {
    this.setData({
      detailinfo: app.globalData.detailinfo,
      isdetailinfo: app.globalData.isdetailinfo
    })
    this.setData({
      ['formObj.xcxsex']: app.globalData.detailinfo.xcxsex,
      ['formObj.xcxbornday']: app.globalData.detailinfo.xcxbornday ? app.globalData.detailinfo.xcxbornday : '保密',
      ['formObj.xcxname']: app.globalData.detailinfo.xcxname,
      ['formObj.xcxremark']: app.globalData.detailinfo.xcxremark,
      ['formObj.xcxbesee']: app.globalData.detailinfo.xcxbesee,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  // 用户点击右上角分享
  onShareAppMessage: function () {
    return {
      title: '扩列cp圈 -- 共享扩列群',
      imageUrl: '/assets/icon/sharephoto.jpg', //图片地址
      path: '/pages/hall/hall?jump=382739709', // 用户点击首先进入的当前页面
      success: function (res) {
        // 转发成功
        console.log("转发成功:");
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:");
      }
    }
  },
  //用户点击右上角分享朋友圈
  onShareTimeline: function () {
    return {
      title: '扩列cp圈 -- 共享扩列群',
      imageUrl: '/assets/icon/sharephoto.jpg', //图片地址
      path: '/pages/hall/hall?jump=382739709', // 用户点击首先进入的当前页面
      success: function (res) {
        // 转发成功
        console.log("转发成功:");
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:");
      }
    }
  },
  upImgClick: function (e) {
    const that = this
    console.log(e, that.data.tempFilePaths)
    if (app.globalData.isdetailinfo) {
      console.log('详情')
    } else if (app.globalData.detailinfo && app.globalData.detailinfo.openid) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          let filePath = res.tempFilePaths;
          wx.uploadFile({
            url: baseUrl + "/uploadheadimg",
            filePath: filePath[0],
            name: 'file',
            formData: {
              'openid': app.globalData.detailinfo.openid
            },
            success(res) {
              console.log(JSON.parse(res.data))
              if (JSON.parse(res.data).success) {
                app.globalData.userInfo = JSON.parse(res.data).data.usertable,
                  app.globalData.hasUserInfo = true
                that.setData({
                  detailinfo: app.globalData.userInfo,
                })
              } else {
                console.log(JSON.parse(JSON.parse(res.data).msg)) //接口返回值
              }
            }
          })
        },
        fail: function (e) {
          console.error(e)
        }
      })
    } else {
      wx.showToast({
        title: '请先登录',
      })
    }

  },
})