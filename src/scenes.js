var gamestart = cc.Layer.extend({
  ctor: function() {
          this._super();
          var size = cc.director.getWinSize();

          cc.audioEngine.playMusic(res.bgm_title, true);

          // 背景レイヤーをその場で作る
          var backgroundLayer = cc.Sprite.create(res.background_png);
          backgroundLayer.setPosition(size.width,size.height /2 );
          this.addChild(backgroundLayer);

          var label01 = cc.Sprite.create(res.title_png);　
          label01.setPosition(size.width / 2, size.height * 0.6);　
          this.addChild(label01);

});
