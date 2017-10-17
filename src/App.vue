<template>
  <div id='app'>
    <v-header v-bind:seller='seller'></v-header>
    <div class='tab11 border-1px'>
      <div class='table-item'><router-link to='/goodsinfo'>商品</router-link></div>
      <div class='table-item'><router-link to='/commentsinfo'>评论</router-link></div>
      <div class='table-item'><router-link to='/sellerinfo'>商家</router-link></div>
    </div>
    <keep-alive>
      <router-view v-if='goods.length > 0' v-bind:ratings="ratings" v-bind:seller='seller' v-bind:goods='goods'></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from './components/header/header.vue';
  import * as api from './api/apihelp';
  export default {
    data () {
      return {
        seller: {},
        goods: [],
        ratings: [],
        curentselect: 1
      };
    },
    components: {
      'v-header': header
    },
    methods: {
      appshow (type) {
        this.curentselect = type;
      }
    },
    created: function () {
      var datapara = {'type': '4', 'requestCode': 'sdsd', 'data': ''};
      api.getAll(datapara).then(res => {
        this.seller = {
          avater: 'http://img8.zol.com.cn/bbs/upload/12598/12597931.gif',
          name: '美式美食 (好吃)',
          description: '蜂鸟配送',
          deliveryTime: 38,
          score: 4.5,
          minPrice: 20,
          rankRate: 69.2,
          deliveryPrice: 4,
          serviceScore: 3.6,
          foodScore: 4.3,
          ratingCount: 24,
          sellCount: 90,
          bulletin: '昨日，一篇微博在网上疯传。地铁5号线上，一名猥琐男子猥亵女乘客并咬民警。' +
          '北京晨报记者从警方处了解到，7月10日早高峰，一名男子在拥挤的地铁车厢里对一名女孩实施猥亵行为，' +
          '北京晨报记者从警方处了解到，7月10日早高峰，一名男子在拥挤的地铁车厢里对一名女孩实施猥亵行为，' +
          '北京晨报记者从警方处了解到，7月10日早高峰，一名男子在拥挤的地铁车厢里对一名女孩实施猥亵行为，' +
          '被便衣民警发现，男子被捕时咬了民警一口。经鉴定，民警受轻微伤，正在恢复中。目前，涉案男子被北京警方刑事拘留',
          supports: [
            {
              type: 0,
              description: '在线支付满28减5'
            },
            {
              type: 1,
              description: '该商家支持发票，请下单后写好发票抬头'
            },
            {
              type: 2,
              description: '单人精彩套餐'
            },
            {
              type: 1,
              description: '该商家支持发票，请下单后写好发票抬头'
            },
            {
              type: 3,
              description: 'VC无限橙果汁全场8折'
            }
          ],
          'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg',
          'pics': [
            'http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180',
            'http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180',
            'http://fuss10.elemecdn.com/f/96/3d608c5811bc2d902fc9ab9a5baa7jpeg.jpeg?imageView2/1/w/180/h/180',
            'http://fuss10.elemecdn.com/6/ad/779f8620ff49f701cd4c58f6448b6jpeg.jpeg?imageView2/1/w/180/h/180'
          ],
          'infos': [
            '该商家支持发票,请下单写好发票抬头',
            '品类:其他菜系,包子粥店',
            '北京市昌平区回龙观西大街龙观置业大厦底商B座102单元1340',
            '营业时间:10:00-20:30'
          ]
        };
        this.goods = [
          {
            name: '热销榜',
            type: -1,
            foods: [
              {
                name: '皮蛋瘦肉粥',
                price: 10,
                oldPrice: '18',
                description: '咸粥',
                sellCount: 229,
                rating: 100,
                info: '记者从警方处了解到，7月10日早高峰，一名男子在拥挤的地铁车厢里对一名女孩实施猥亵行为',
                ratings: [
                  {
                    username: '3********C',
                    rateTime: 1469281964000,
                    rateType: 1,
                    text: '还不可以',
                    avatar: 'http://img3.imgtn.bdimg.com/it/u=957681876,1920510249&fm=214&gp=0.jpg'
                  },
                  {
                    username: '3********C',
                    rateTime: 1469281964000,
                    rateType: 0,
                    text: '还可以',
                    avatar: 'http://img3.imgtn.bdimg.com/it/u=957681876,1920510249&fm=214&gp=0.jpg'
                  },
                  {
                    username: '3********C',
                    rateTime: 1469281964000,
                    rateType: 0,
                    text: '',
                    avatar: 'http://img3.imgtn.bdimg.com/it/u=957681876,1920510249&fm=214&gp=0.jpg'
                  },
                  {
                    username: '3********C',
                    rateTime: 1469281964000,
                    rateType: 1,
                    text: '还可以',
                    avatar: 'http://img3.imgtn.bdimg.com/it/u=957681876,1920510249&fm=214&gp=0.jpg'
                  },
                  {
                    username: '3********C',
                    rateTime: 1469281964000,
                    rateType: 0,
                    text: '还可以',
                    avatar: 'http://img3.imgtn.bdimg.com/it/u=957681876,1920510249&fm=214&gp=0.jpg'
                  },
                  {
                    username: '3********C',
                    rateTime: 1469281964000,
                    rateType: 1,
                    text: '还可以',
                    avatar: 'http://img3.imgtn.bdimg.com/it/u=957681876,1920510249&fm=214&gp=0.jpg'
                  }
                ],
                icon: 'http://img5.imgtn.bdimg.com/it/u=3672445592,1042791943&fm=200&gp=0.jpg',
                image: 'http://mpic.tiankong.com/d73/a85/d73a85568df649d152e3a25ad4995f9d/C1C7F619288CCE91E63AA87AE264704D.jpg'
              },
              {
                name: '皮蛋瘦肉粥2',
                price: 10,
                oldPrice: '',
                description: '咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥咸粥',
                sellCount: 229,
                rating: 100,
                info: '记者从警方处了解到，7月10日早高峰，一名男子在拥挤的地铁车厢里对一名女孩实施猥亵行为',
                ratings: [],
                icon: 'http://img5.imgtn.bdimg.com/it/u=3672445592,1042791943&fm=200&gp=0.jpg',
                image: 'http://pic.58pic.com/58pic/15/39/92/15b58PICSAZ_1024.jpg'
              },
              {
                name: '皮蛋瘦肉粥3',
                price: 10,
                oldPrice: '',
                description: '咸粥',
                sellCount: 229,
                rating: 100,
                info: '记者从警方处了解到，7月10日早高峰，一名男子在拥挤的地铁车厢里对一名女孩实施猥亵行为',
                ratings: [
                  {
                    username: '3********C',
                    rateTime: 1469281964000,
                    rateType: 0,
                    text: '还可以',
                    avatar: 'http://a0.att.hudong.com/67/36/300278486496132808365180158_950.png'
                  }
                ],
                icon: 'http://img5.imgtn.bdimg.com/it/u=3672445592,1042791943&fm=200&gp=0.jpg',
                image: 'http://pic.58pic.com/58pic/15/39/92/15b58PICSAZ_1024.jpg'
              }
            ]
          },
          {
            name: '冷饮',
            type: 0,
            foods: [
              {
                name: '果汁',
                price: 10,
                oldPrice: '',
                description: '咸粥',
                sellCount: 229,
                rating: 100,
                info: '记者从警方处了解到，7月10日早高峰，一名男子在拥挤的地铁车厢里对一名女孩实施猥亵行为',
                ratings: [
                  {
                    username: '3********C',
                    rateTime: 1469281964000,
                    rateType: 0,
                    text: '还可以',
                    avatar: 'http://img3.imgtn.bdimg.com/it/u=957681876,1920510249&fm=214&gp=0.jpg'
                  }
                ],
                icon: 'http://img5.imgtn.bdimg.com/it/u=3672445592,1042791943&fm=200&gp=0.jpg',
                image: 'http://pic.58pic.com/58pic/15/39/92/15b58PICSAZ_1024.jpg'
              },
              {
                name: '果汁2',
                price: 10,
                oldPrice: '',
                description: '咸粥',
                sellCount: 229,
                rating: 100,
                info: '记者从警方处了解到，7月10日早高峰，一名男子在拥挤的地铁车厢里对一名女孩实施猥亵行为',
                ratings: [
                  {
                    username: '3********C',
                    rateTime: 1469281964000,
                    rateType: 0,
                    text: '还可以',
                    avatar: 'http://pic.58pic.com/58pic/12/21/22/54P58PICBkX.jpg'
                  }
                ],
                icon: 'http://img5.imgtn.bdimg.com/it/u=3672445592,1042791943&fm=200&gp=0.jpg',
                image: 'http://pic.58pic.com/58pic/15/39/92/15b58PICSAZ_1024.jpg'
              },
              {
                name: '果汁3',
                price: 10,
                oldPrice: '',
                description: '咸粥',
                sellCount: 229,
                rating: 100,
                info: '记者从警方处了解到，7月10日早高峰，一名男子在拥挤的地铁车厢里对一名女孩实施猥亵行为',
                ratings: [
                  {
                    username: '3********C',
                    rateTime: 1469281964000,
                    rateType: 0,
                    text: '还可以',
                    avatar: 'http://a0.att.hudong.com/67/36/300278486496132808365180158_950.png'
                  }
                ],
                icon: 'http://img5.imgtn.bdimg.com/it/u=3672445592,1042791943&fm=200&gp=0.jpg',
                image: 'http://pic.58pic.com/58pic/15/39/92/15b58PICSAZ_1024.jpg'
              }
            ]
          },
          {
            name: '皮皮虾',
            type: 1,
            foods: [
              {
                name: '皮皮虾',
                price: 10,
                oldPrice: '',
                description: '咸粥',
                sellCount: 229,
                rating: 100,
                info: '记者从警方处了解到，7月10日早高峰，一名男子在拥挤的地铁车厢里对一名女孩实施猥亵行为',
                ratings: [
                  {
                    username: '3********C',
                    rateTime: 1469281964000,
                    rateType: 0,
                    text: '还可以',
                    avatar: 'http://img3.imgtn.bdimg.com/it/u=957681876,1920510249&fm=214&gp=0.jpg'
                  }
                ],
                icon: 'http://img5.imgtn.bdimg.com/it/u=3672445592,1042791943&fm=200&gp=0.jpg',
                image: 'http://pic.58pic.com/58pic/15/39/92/15b58PICSAZ_1024.jpg'
              },
              {
                name: '皮皮虾2',
                price: 10,
                oldPrice: '',
                description: '咸粥',
                sellCount: 229,
                rating: 100,
                info: '记者从警方处了解到，7月10日早高峰，一名男子在拥挤的地铁车厢里对一名女孩实施猥亵行为',
                ratings: [
                  {
                    username: '3********C',
                    rateTime: 1469281964000,
                    rateType: 0,
                    text: '还可以',
                    avatar: 'http://pic.58pic.com/58pic/12/21/22/54P58PICBkX.jpg'
                  }
                ],
                icon: 'http://img5.imgtn.bdimg.com/it/u=3672445592,1042791943&fm=200&gp=0.jpg',
                image: 'http://pic.58pic.com/58pic/15/39/92/15b58PICSAZ_1024.jpg'
              },
              {
                name: '皮皮虾3',
                price: 10,
                oldPrice: '',
                description: '咸粥',
                sellCount: 229,
                rating: 100,
                info: '记者从警方处了解到，7月10日早高峰，一名男子在拥挤的地铁车厢里对一名女孩实施猥亵行为',
                ratings: [
                  {
                    username: '3********C',
                    rateTime: 1469281964000,
                    rateType: 0,
                    text: '还可以',
                    avatar: 'http://a0.att.hudong.com/67/36/300278486496132808365180158_950.png'
                  }
                ],
                icon: 'http://img5.imgtn.bdimg.com/it/u=3672445592,1042791943&fm=200&gp=0.jpg',
                image: 'http://pic.58pic.com/58pic/15/39/92/15b58PICSAZ_1024.jpg'
              }
            ]
          },
          {
            name: 'aaaa',
            type: 2,
            foods: [
              {
                name: '皮蛋瘦肉粥',
                price: 10,
                oldPrice: '',
                description: '咸粥',
                sellCount: 229,
                rating: 100,
                info: '记者从警方处了解到，7月10日早高峰，一名男子在拥挤的地铁车厢里对一名女孩实施猥亵行为',
                ratings: [
                  {
                    username: '3********C',
                    rateTime: 1469281964000,
                    rateType: 0,
                    text: '还可以',
                    avatar: 'http://img3.imgtn.bdimg.com/it/u=957681876,1920510249&fm=214&gp=0.jpg'
                  }
                ],
                icon: 'http://img5.imgtn.bdimg.com/it/u=3672445592,1042791943&fm=200&gp=0.jpg',
                image: 'http://pic.58pic.com/58pic/15/39/92/15b58PICSAZ_1024.jpg'
              }
            ]
          },
          {
            name: 'bbbb',
            type: 3,
            foods: [
              {
                name: '皮蛋瘦肉粥',
                price: 10,
                oldPrice: '',
                description: '咸粥',
                sellCount: 229,
                rating: 100,
                info: '记者从警方处了解到，7月10日早高峰，一名男子在拥挤的地铁车厢里对一名女孩实施猥亵行为',
                ratings: [
                  {
                    username: '3********C',
                    rateTime: 1469281964000,
                    rateType: 0,
                    text: '还可以',
                    avatar: 'http://img3.imgtn.bdimg.com/it/u=957681876,1920510249&fm=214&gp=0.jpg'
                  }
                ],
                icon: 'http://img5.imgtn.bdimg.com/it/u=3672445592,1042791943&fm=200&gp=0.jpg',
                image: 'http://pic.58pic.com/58pic/15/39/92/15b58PICSAZ_1024.jpg'
              }
            ]
          },
          {
            name: 'cccc',
            type: 4,
            foods: [
              {
                name: '皮蛋瘦肉粥',
                price: 10,
                oldPrice: '',
                description: '咸粥',
                sellCount: 229,
                rating: 100,
                info: '记者从警方处了解到，7月10日早高峰，一名男子在拥挤的地铁车厢里对一名女孩实施猥亵行为',
                ratings: [
                  {
                    username: '3********C',
                    rateTime: 1469281964000,
                    rateType: 0,
                    text: '还可以',
                    avatar: 'http://img3.imgtn.bdimg.com/it/u=957681876,1920510249&fm=214&gp=0.jpg'
                  }
                ],
                icon: 'http://img5.imgtn.bdimg.com/it/u=3672445592,1042791943&fm=200&gp=0.jpg',
                image: 'http://pic.58pic.com/58pic/15/39/92/15b58PICSAZ_1024.jpg'
              }
            ]
          },
          {
            name: 'ddddd',
            type: 5,
            foods: [
              {
                name: '皮蛋瘦肉粥',
                price: 10,
                oldPrice: '',
                description: '咸粥',
                sellCount: 229,
                rating: 100,
                info: '记者从警方处了解到，7月10日早高峰，一名男子在拥挤的地铁车厢里对一名女孩实施猥亵行为',
                ratings: [
                  {
                    username: '3********C',
                    rateTime: 1469281964000,
                    rateType: 0,
                    text: '还可以',
                    avatar: 'http://img3.imgtn.bdimg.com/it/u=957681876,1920510249&fm=214&gp=0.jpg'
                  }
                ],
                icon: 'http://img5.imgtn.bdimg.com/it/u=3672445592,1042791943&fm=200&gp=0.jpg',
                image: 'http://pic.58pic.com/58pic/15/39/92/15b58PICSAZ_1024.jpg'
              }
            ]
          },
          {
            name: '这是这么长的类型',
            type: 6,
            foods: [
              {
                name: '皮蛋瘦肉粥',
                price: 10,
                oldPrice: '',
                description: '咸粥',
                sellCount: 229,
                rating: 100,
                info: '记者从警方处了解到，7月10日早高峰，一名男子在拥挤的地铁车厢里对一名女孩实施猥亵行为',
                ratings: [
                  {
                    username: '3********C',
                    rateTime: 1469281964000,
                    rateType: 0,
                    text: '还可以',
                    avatar: 'http://img3.imgtn.bdimg.com/it/u=957681876,1920510249&fm=214&gp=0.jpg'
                  }
                ],
                icon: 'http://img5.imgtn.bdimg.com/it/u=3672445592,1042791943&fm=200&gp=0.jpg',
                image: 'http://pic.58pic.com/58pic/15/39/92/15b58PICSAZ_1024.jpg'
              }
            ]
          },
          {
            name: 'ffff',
            type: 7,
            foods: [
              {
                name: '皮蛋瘦肉粥',
                price: 10,
                oldPrice: '',
                description: '咸粥',
                sellCount: 229,
                rating: 100,
                info: '记者从警方处了解到，7月10日早高峰，一名男子在拥挤的地铁车厢里对一名女孩实施猥亵行为',
                ratings: [
                  {
                    username: '3********C',
                    rateTime: 1469281964000,
                    rateType: 0,
                    text: '还可以',
                    avatar: 'http://img3.imgtn.bdimg.com/it/u=957681876,1920510249&fm=214&gp=0.jpg'
                  }
                ],
                icon: 'http://img5.imgtn.bdimg.com/it/u=3672445592,1042791943&fm=200&gp=0.jpg',
                image: 'http://pic.58pic.com/58pic/15/39/92/15b58PICSAZ_1024.jpg'
              }
            ]
          },
          {
            name: 'gggg',
            type: 8,
            foods: [
              {
                name: '皮蛋瘦肉粥',
                price: 10,
                oldPrice: '',
                description: '咸粥',
                sellCount: 229,
                rating: 100,
                info: '记者从警方处了解到，7月10日早高峰，一名男子在拥挤的地铁车厢里对一名女孩实施猥亵行为',
                ratings: [
                  {
                    username: '3********C',
                    rateTime: 1469281964000,
                    rateType: 0,
                    text: '还可以',
                    avatar: 'http://img3.imgtn.bdimg.com/it/u=957681876,1920510249&fm=214&gp=0.jpg'
                  }
                ],
                icon: 'http://img5.imgtn.bdimg.com/it/u=3672445592,1042791943&fm=200&gp=0.jpg',
                image: 'http://pic.58pic.com/58pic/15/39/92/15b58PICSAZ_1024.jpg'
              }
            ]
          },
          {
            name: 'hhhhh',
            type: 9,
            foods: [
              {
                name: '皮蛋瘦肉粥',
                price: 10,
                oldPrice: '',
                description: '咸粥',
                sellCount: 229,
                rating: 100,
                info: '记者从警方处了解到，7月10日早高峰，一名男子在拥挤的地铁车厢里对一名女孩实施猥亵行为',
                ratings: [
                  {
                    username: '3********C',
                    rateTime: 1469281964000,
                    rateType: 0,
                    text: '还可以',
                    avatar: 'http://img3.imgtn.bdimg.com/it/u=957681876,1920510249&fm=214&gp=0.jpg'
                  }
                ],
                icon: 'http://img5.imgtn.bdimg.com/it/u=3672445592,1042791943&fm=200&gp=0.jpg',
                image: 'http://pic.58pic.com/58pic/15/39/92/15b58PICSAZ_1024.jpg'
              }
            ]
          },
          {
            name: 'iiiii',
            type: 10,
            foods: [
              {
                name: '皮蛋瘦肉粥',
                price: 10,
                oldPrice: '',
                description: '咸粥',
                sellCount: 229,
                rating: 100,
                info: '记者从警方处了解到，7月10日早高峰，一名男子在拥挤的地铁车厢里对一名女孩实施猥亵行为',
                ratings: [
                  {
                    username: '3********C',
                    rateTime: 1469281964000,
                    rateType: 0,
                    text: '还可以',
                    avatar: 'http://img3.imgtn.bdimg.com/it/u=957681876,1920510249&fm=214&gp=0.jpg'
                  }
                ],
                icon: 'http://img5.imgtn.bdimg.com/it/u=3672445592,1042791943&fm=200&gp=0.jpg',
                image: 'http://pic.58pic.com/58pic/15/39/92/15b58PICSAZ_1024.jpg'
              }
            ]
          }
        ];
        this.ratings = [
          {
            'username': '3******c',
            'rateTime': 1469281964000,
            'deliveryTime': 30,
            'score': 5,
            'rateType': 0,
            'text': '不错,粥很好喝,我经常吃这一家,非常赞,以后也会常来吃,强烈推荐.',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [
              '南瓜粥',
              '皮蛋瘦肉粥',
              '扁豆焖面',
              '娃娃菜炖豆腐',
              '牛肉馅饼'
            ]
          },
          {
            'username': '2******3',
            'rateTime': 1469271264000,
            'deliveryTime': '',
            'score': 4,
            'rateType': 0,
            'text': '服务态度不错',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [
              '扁豆焖面'
            ]
          },
          {
            'username': '3******b',
            'rateTime': 1469261964000,
            'score': 3,
            'rateType': 1,
            'text': '',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [

            ]
          },
          {
            'username': '1******c',
            'rateTime': 1469261864000,
            'deliveryTime': 20,
            'score': 5,
            'rateType': 0,
            'text': '良心店铺',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [
            ]
          },
          {
            'username': '2******d',
            'rateTime': 1469251264000,
            'deliveryTime': 10,
            'score': 4,
            'rateType': 0,
            'text': '',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [
            ]
          },
          {
            'username': '9******0',
            'rateTime': 1469241964000,
            'deliveryTime': 70,
            'score': 1,
            'rateType': 1,
            'text': '送货速度蜗牛一样',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [
            ]
          },
          {
            'username': 'd******c',
            'rateTime': 1469231964000,
            'deliveryTime': 30,
            'score': 5,
            'rateType': 0,
            'text': '很喜欢的粥店',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [
            ]
          },
          {
            'username': '2******3',
            'rateTime': 1469221264000,
            'deliveryTime': '',
            'score': 4,
            'rateType': 0,
            'text': '量给的还可以',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [
            ]
          },
          {
            'username': '3******8',
            'rateTime': 1469211964000,
            'deliveryTime': '',
            'score': 3,
            'rateType': 1,
            'text': '',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [
            ]
          },
          {
            'username': 'a******a',
            'rateTime': 1469201964000,
            'deliveryTime': '',
            'score': 4,
            'rateType': 0,
            'text': '孩子喜欢吃这家',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [
              '南瓜粥'
            ]
          },
          {
            'username': '3******3',
            'rateTime': 1469191264000,
            'deliveryTime': '',
            'score': 4,
            'rateType': 0,
            'text': '粥挺好吃的',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [
            ]
          },
          {
            'username': 't******b',
            'rateTime': 1469181964000,
            'deliveryTime': '',
            'score': 3,
            'rateType': 1,
            'text': '',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [
            ]
          },
          {
            'username': 'f******c',
            'rateTime': 1469171964000,
            'deliveryTime': 15,
            'score': 5,
            'rateType': 0,
            'text': '送货速度很快',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [
            ]
          },
          {
            'username': 'k******3',
            'rateTime': 1469161264000,
            'deliveryTime': '',
            'score': 4,
            'rateType': 0,
            'text': '',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [
            ]
          },
          {
            'username': 'u******b',
            'rateTime': 1469151964000,
            'deliveryTime': '',
            'score': 4,
            'rateType': 0,
            'text': '下雨天给快递小哥点个赞',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [
            ]
          },
          {
            'username': 's******c',
            'rateTime': 1469141964000,
            'deliveryTime': '',
            'score': 4,
            'rateType': 0,
            'text': '好',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [
            ]
          },
          {
            'username': 'z******3',
            'rateTime': 1469131264000,
            'deliveryTime': '',
            'score': 5,
            'rateType': 0,
            'text': '吃了还想再吃',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [
            ]
          },
          {
            'username': 'n******b',
            'rateTime': 1469121964000,
            'deliveryTime': '',
            'score': 3,
            'rateType': 1,
            'text': '发票开的不对',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [
            ]
          },
          {
            'username': 'm******c',
            'rateTime': 1469111964000,
            'deliveryTime': 30,
            'score': 5,
            'rateType': 0,
            'text': '好吃',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [
            ]
          },
          {
            'username': 'l******3',
            'rateTime': 1469101264000,
            'deliveryTime': 40,
            'score': 5,
            'rateType': 0,
            'text': '还不错吧',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [
            ]
          },
          {
            'username': '3******o',
            'rateTime': 1469091964000,
            'deliveryTime': '',
            'score': 2,
            'rateType': 1,
            'text': '',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [

            ]
          },
          {
            'username': '3******p',
            'rateTime': 1469081964000,
            'deliveryTime': '',
            'score': 4,
            'rateType': 0,
            'text': '很喜欢的粥',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [

            ]
          },
          {
            'username': 'o******k',
            'rateTime': 1469071264000,
            'deliveryTime': '',
            'score': 5,
            'rateType': 0,
            'text': '',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': []
          },
          {
            'username': 'k******b',
            'rateTime': 1469061964000,
            'deliveryTime': '',
            'score': 4,
            'rateType': 0,
            'text': '',
            'avatar': 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
            'recommend': [
            ]
          }
        ];
      })
      .catch(err => {
        console.log('error' + err);
      });
    }
  };
</script>

<style lang='stylus' rel='stylesheet/stylus'>

  @import 'common/stylus/index.styl'
  .tab11
      display : flex
      width: 100%
      height: 40px
      line-height:40px
      border-1px(rgba(7,17,27,0.1))
      .table-item
         flex: 1
         text-align: center
         & > a
              display: block
              font-size: 14px;
              color: rgb(77,85,93)
              &.router-link-exact-active
                color: rgb(220,20,20)
</style>
