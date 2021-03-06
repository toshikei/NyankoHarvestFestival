var itemsLayer;
var cat;
var catflg;

var score_1 = 0; //一桁
var score_2 = 0; //二桁
var score_3 = 0; //三桁
var score_label1;
var score_label2;
var score_label3;
var basket;
var time = 60;

var xSpeed = 0; //カートの移動速度

var detectedX;　 //現在タッチしているX座標
var savedX;　 //前回タッチしていたX座標
var touching = false;　 //タッチ状況管理用flag

var gameScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    gameLayer = new game();
    gameLayer.init();
    this.addChild(gameLayer);
  }
});

var game = cc.Layer.extend({
  init: function() {
    this._super();
    //グラデーション背景
    //  var backgroundLayer = cc.LayerGradient.create(cc.color(0,0,0,255), cc.color(0x46,0x82,0xB4,255));

    //森の背景
    var background = new cc.Sprite(res.background_png);
    var size = cc.director.getWinSize();
    background.setPosition(cc.p(size.width / 2.0, size.height / 2.0));
    var backgroundLayer = cc.Layer.create();
    backgroundLayer.addChild(background);
    this.addChild(backgroundLayer);

    //アイテムがおちてくるレイヤー
    itemsLayer = cc.Layer.create();
    this.addChild(itemsLayer);

    //猫を操作するレイヤー
    topLayer = cc.Layer.create();
    this.addChild(topLayer);
    cat = cc.Sprite.create(res.cat00_png);
    basket = cc.Sprite.create(res.basket_png);
    topLayer.addChild(cat, 0);
    topLayer.addChild(basket, 0);
    //猫の位置
    cat.setPosition(240, 100);
    cat.setScale(1);
    this.schedule(this.addItem, 1);
    // 籠の設定(猫が反対になってもそれに追従して反対にしたい)
    basket.setPosition(260,120);
    basket.setScale(1);
    topLayer.addChild(cat, 0);
    //タッチイベントのリスナー追加
    cc.eventManager.addListener(touchListener, this);
    //カートの移動のため　Update関数を1/60秒ごと実行させる　
    this.scheduleUpdate(this.timecount, 1);
    /* // 雲のレイヤー
        kumoLayer = cc.Layer.create();
        this.addChild(kumoLayer);
        kumo = cc.Sprite.create(res.game_cloud_png);
        kumoLayer.addChild(kumo, 0);
        kumo.setPosition(450, 300);
        */

        //スコア表示
            var score = new cc.Sprite(res.score_png);
            var size = cc.director.getWinSize();
            score.setPosition(cc.p(size.width / 1.155, size.height / 13.3));
            var scoreLayer = cc.Layer.create();
            scoreLayer.addChild(score);
            this.addChild(scoreLayer);

            score_label1 = cc.LabelTTF.create("" + score_1, "Arial",25);
            score_label1.setPosition(cc.p(size.width / 1.04, size.height / 20));
            score_label1.fillStyle = "black";
            this.addChild(score_label1);

            score_label2 = cc.LabelTTF.create("" + score_2, "Arial",25);
            score_label2.setPosition(cc.p(size.width / 1.11, size.height / 20));
            score_label2.fillStyle = "black";
            this.addChild(score_label2);

            score_label3 = cc.LabelTTF.create("" + score_3, "Arial",25);
            score_label3.setPosition(cc.p(size.width / 1.2, size.height / 20));
            score_label3.fillStyle = "black";
            this.addChild(score_label3);
        //score表示
        var score = new cc.Sprite(res.score_png);
        var size = cc.director.getWinSize();
        score.setPosition(cc.p(size.width / 1.1, size.height / 12));
        var scoreLayer = cc.Layer.create();
        scoreLayer.addChild(score);
        this.addChild(scoreLayer);

        //timerLayerの設定
        var timecount = new cc.Sprite(res.timer);
        timecount.setScale(0.9);
        timecount.setPosition(cc.p(size.width / 8 ,size.height / 1.1));
        var timerLayer = cc.Layer.create();
        timerLayer.addChild(timecount,0);
        this.addChild(timerLayer);
        // timerの表示
        var timetxt = cc.LabelTTF.create(""+time,"Arial","30",cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(timetxt);
        timetxt.fillStyle = "brack";
        timetxt.setPosition(65,285);

  },

  addItem: function() {
    var item = new Item();
    itemsLayer.addChild(item, 1);
  },
  removeItem: function(item) {
    itemsLayer.removeChild(item);
  },
  //カートの移動のため　Update関数を1/60秒ごと実行させる関数
  update: function(dt) {
    if (touching) {
      //現在タッチしているX座標と前回の座標の差分をとる
      var deltaX = savedX - detectedX;
      //差分でカートが右にいくか左にいくかを判断する
      if (deltaX > 0) {
        xSpeed = -2;
      }
      if (deltaX < 0) {
        xSpeed = 2;
      }
      //saveXに今回のX座標を代入し、onTouchMovedイベントで
      //detectedX変数が更新されても対応できるようにする
      //籠も反転させる
      savedX = detectedX;
      if (xSpeed > 0) {
        cat.setFlippedX(true);
        basket.setFlippedX(true);
        basket.setPosition(cat.getPosition().x -20, cat.getPosition().y+20);
      }
      if (xSpeed < 0) {
        cat.setFlippedX(false);
        basket.setFlippedX(false);
        basket.setPosition(cat.getPosition().x +20, cat.getPosition().y+20);
      }
      cat.setPosition(cat.getPosition().x + xSpeed, cat.getPosition().y);
    }
  }

});

function timer(){
  this.addChild(timeｔxt);
}

var Item = cc.Sprite.extend({
  ctor: function() {
    this._super();
    //ランダムに爆弾と果物を生成する
    if (Math.random() < 0.5) {
      this.initWithFile(res.bug_png);
      this.isBomb = true;
    } else {
      this.initWithFile(res.apple_png);
      this.isBomb = false;
    }
  },
  //アイテムが生成された後、描画されるときに実行
  onEnter: function() {
    this._super();
    //ランダムな位置に
    this.setPosition(Math.random() * 400 + 40, 350);
    //ランダムな座標に移動させる
    var moveAction = cc.MoveTo.create(8, new cc.Point(Math.random() * 400 + 40, -50));
    this.runAction(moveAction);
    this.scheduleUpdate();
  },
  update: function(dt) {
    //果物の処理　座標をチェックしてカートに接近したら
    if (this.getPosition().y < 35 && this.getPosition().y > 30 &&
      Math.abs(this.getPosition().x - cat.getPosition().x) < 10 && !this.isBomb) {
      gameLayer.removeItem(this);
      score_1++;
      if(score_1 > 9){
        score_2++;
        score_1 = 0;
        score_label2.setString("" + score_2);
        if(score_2 > 9){
          score_3++;
          score_2 = 0;
          score_label3.setString("" + score_3);
        }
      }
      score_label1.setString("" + score_1);
      console.log("FRUIT");
    }
    //爆弾の処理　座標をチェックしてカートの接近したら　フルーツより爆弾に当たりやすくしている
    if (this.getPosition().y < 35 && Math.abs(this.getPosition().x - cat.getPosition().x) < 25 &&
      this.isBomb) {
      gameLayer.removeItem(this);
      console.log("BOMB");
    }
    //地面に落ちたアイテムは消去
    if (this.getPosition().y < -30) {
      gameLayer.removeItem(this)
    }
  }
});

//バーチャルアナログパッド用のタッチリスナーの実装
var touchListener = cc.EventListener.create({
  event: cc.EventListener.TOUCH_ONE_BY_ONE,
  swallowTouches: true,
  onTouchBegan: function(touch, event) {
    touching = true;
    //現在タッチ中のX座標を保持する変数へ代入
    detectedX = touch.getLocation().x;
    //前回タッチしていたX座標として代入
    savedX = detectedX;
    return true;
  },
  onTouchMoved: function(touch, event) {
    //現在タッチ中のX座標を保持する変数へ代入
    detectedX = touch.getLocation().x;
  },
  onTouchEnded: function(touch, event) {
    //タッチflagをOFF
    touching = false;
  }
})
