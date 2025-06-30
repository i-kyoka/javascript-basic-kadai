//変数の初期化　''は後から文字列を代入することができる
let untyped = '';
let typed = '';
let score = 0;

//HTML要素の取得（表示する文字のところ＝untyped)
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typedcount = document.getElementById('typedcount');

//配列
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

//ランダムなテキストを表示する機能
const createText = () => {
  //正タイプした文字列をクリア
  typed = '';
  typedfield.textContent = typed;
  //変数randomに配列のインデックス数からランダムな数値を代入する
  let random = Math.floor(Math.random() * textLists.length);
  //配列からランダムにテキストを取得し画面に表示する
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};
 


//キー入力の判定ができる機能
const keyPress = e =>{
  //誤タイプの場合
  if(e.key !== untyped.substring(0, 1)){
    wrap.classList.add('mistyped');
    //100ms後に背景色を元に戻す
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    },100);
  return;
  }

  //正タイプの場合
  //score加算
  score++
  typedcount.textContent = score;
  //(typed=)''に(untyped.substring(0,1)=)１文字目が追加される
  typed += untyped.substring(0,1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  //テキストがなくなったら新しいテキストを表示
  if(untyped === ''){
    createText();
  }
};

//タイピングスキルのランクを判定する機能
const rankCheck = score =>{
  //テキストを格納する変数を作る
  let text ='';
  //スコアに応じて異なるメッセージを変数textに代入する
  if(score < 100){
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  }else if(score < 200){
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  }else if(score < 300){
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
  }else if(score < 400){
    text = `あなたのランクはSです。\nおめでとうございます！`;
  }

  return`${score}文字打てました！\n${text}\n【OK】リトライ/【キャンセル】終了`;
 
};

//ゲームを終了する機能
const gameOver = id =>{
  clearInterval(id);
  setTimeout((id) =>{
    const result = confirm(rankCheck(score));
    //OKボタンを押すとリロードする
    if (result == true){
      window.location.reload();
    }
  },10);
  
};

//カウントダウンタイマーの機能
const timer = () =>{
  //タイマー部分のHTMl要素を取得する
  let time = count.textContent;
  const id = setInterval(() =>{

    //カウントダウンをする
    time--;
    count.textContent = time;

    //カウントが0になったらタイマーを停止する
    if(time <= 0){
      gameOver(id);
      untyped = 'タイムアップ！';
      untypedfield.textContent = untyped;
    }
  },1000);

  


};

//キーボードのイベント処理
start.addEventListener('click',() => {
  //カウントダウンタイマーを開始する
  timer();
  //関数の呼び出し　ランダムなテキストを表示する　
  createText();
  //「スタート」ボタンを非表示にする
  start.style.display = 'none';
  //キーボード入力時にkeypress関数の呼び出し
  document.addEventListener('keypress',keyPress);

});

untypedfield.textContent = 'スタートボタンで開始';
