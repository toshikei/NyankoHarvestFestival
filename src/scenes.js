var MyLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var size = cc.director.getWinSize();

        //音楽再生エンジン
        audioEngine = cc.audioEngine;
        //bgm再生
        if (!audioEngine.isMusicPlaying()) {
          //audioEngine.playMusic("res/bgm_main.mp3", true);
          audioEngine.playMusic(res.main_mp3, true);
        }

                var TitleBG =
                cc.Sprite.create(res.TitleBG_png);
                TitleBG.setPosition(size.width / 2, size.height /1.8);
                TitleBG.setScale(1);
                this.addChild(TitleBG, 0);

                var Title = cc.Sprite.create(res.Title_png);
                Title.setPosition(size.width / 2, size.height /1.2);
                Title.setScale(0.8);
                this.addChild(Title, 0);

                var Ready = cc.Sprite.create(res.ready_png);
                Ready.setPosition(size.width / 2, size.height /8);
                Ready.setScale(0.8);
                this.addChild(Ready, 0);

                var howto1 = cc.Sprite.create(res.howto1_png);
                howto1.setPosition(size.width / 6, size.height /2.2);
                howto1.setScale(0.6);
                this.addChild(howto1, 0);

                var howto2 = cc.Sprite.create(res.howto2_png);
                howto2.setPosition(size.width / 2, size.height /2.2);
                howto2.setScale(0.6);
                this.addChild(howto2, 0);

                var howto3 = cc.Sprite.create(res.howto3_png);
                howto3.setPosition(size.width / 1.2, size.height /2.2);
                howto3.setScale(0.6);
                this.addChild(howto3, 0);


        // タップイベントリスナーを登録する
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        return true;
    },

    onTouchBegan: function(touch, event) {
        return true;
    },
    onTouchMoved: function(touch, event) {},
    onTouchEnded: function(touch, event) {
        // 次のシーンに切り替える
        cc.director.runScene(new gameScene());
        if (audioEngine.isMusicPlaying()) {
          //audioEngine.stopMusic();
          audioEngine.playEffect(res.button_mp3);
        }

    },
});

var TitleScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
    }
});

var gameover = cc.Layer.extend({
  ctor: function() {
          this._super();
          var size = cc.director.getWinSize();
          // 背景レイヤーをその場で作る
          var backgroundLayer = cc.Sprite.create(res.background_png);
          backgroundLayer.setPosition(size.width,size.height /2 );
          this.addChild(backgroundLayer);

          var label01 = cc.Sprite.create(res.title_png);　
          label01.setPosition(size.width / 2, size.height * 0.6);　
          this.addChild(label01);
}
});
