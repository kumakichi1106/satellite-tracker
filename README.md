# satellite-tracker

TLEデータをもとに衛星の現在位置を計算し、3D地球上にリアルタイム表示するWebアプリケーション

## デモ
デプロイURL / スクリーンショット / GIF

## 予定機能
- CelesTrakからTLEデータを取得
- satellite.jsで衛星位置を計算
- Three.jsで地球と衛星位置を3D表示
- 1秒ごとに衛星位置を更新
- 日本中心のビュー
- 将来的に可視窓計算、軌道予測、コンステレーション表示に対応予定

## 技術スタック
- React + Vite
- TypeScript
- Three.js
- satellite.js
- Tailwind CSS
- CelesTrak API
