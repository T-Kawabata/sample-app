Node管理：volta(バージョン指定：node , yarn )
パッケージ管理：yarn
UIフレームワーク：React + Material UI

動作確認手順
・環境構築
　1．Node 14.18.1,yarn 3.4.1 インストール
　2．任意のフォルダーにソースコードを展開
　3．展開先に パッケージのインストール (コマンド：yarn install)
　4．開発環境での確認（コマンド：yarn dev）
　5．リリース環境での確認
　　　・ビルドの実施：（コマンド：yarn build）
　　　・Webサーバーへコンテンツ登録（./buildをWebServerのRoot Documentに配置）
　　　・ブラウザにて確認（http://｛サーバーアドレス｝）

・画面構成
　1．コラムページ表示（初期画面）
　2．右上のメニューボタンのメニューかログインを選択
　3．ログイン後のトップページ表示
　4．画面上部のメニューバーから 自分の記録 せ選択
　5．自分の記録ページ表示
　6．各記録ボタンから記録位置へスクロール

・問題点
　・Safari,Firefoxへの対応（対応策：CSSinJSへのブラウザ個別設定の追加）
　・マルチデバイス対応（対応策：画面サイズ毎のスタイル切替の追加）
　・非対応ブラウザでの表示（対応策：読み込み時のブラウザ判定処理の追加、非対応ブラウザの場 警告表示）
　・再レンダリング時のレイアウト再計算の抑止（対応策：レイアウト構の見直し）
