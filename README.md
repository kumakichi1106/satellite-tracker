# satellite-tracker

TLEデータをもとに衛星の現在位置を計算し、3D地球上にリアルタイム表示するWebアプリケーション

## デモ


## 開発

```bash
yarn install
yarn dev
```

## ビルド

```bash
yarn build
```

## 機能
- CelesTrakからTLEデータを取得
- satellite.jsで衛星位置を計算
- Three.jsで地球と衛星位置を3D表示
- 日本中心のビュー
- 将来的に可視窓計算、軌道予測、コンステレーション表示に対応予定

## 技術スタック
- React + Vite
- TypeScript
- Three.js
- satellite.js
- Tailwind CSS
- CelesTrak API
