# Satellite Tracker

TLEデータをもとに衛星の現在位置と予測軌道を計算し、3D地球上に可視化するWebアプリケーションです。

TLE解析、衛星位置計算、3D可視化、Reactアプリケーション設計の学習を目的として実装しています。

## Features

- TLEデータから衛星の現在位置を計算
- satellite.jsによる緯度・経度・高度の算出
- React Three Fiberによる3D地球表示
- 衛星マーカーのリアルタイム更新
- 選択した衛星の詳細情報表示
- 選択した衛星の予測軌道ライン表示
- TLEグループ切り替え
  - Space Stations
  - Weather
  - GPS Operational
- 衛星一覧からの選択
- CelesTrakの過剰アクセス制限を避けるためのモックTLE対応

## デモ

[Satellite Tracker](https://kumakichi1106.github.io/satellite-tracker/)

![Satellite Tracker Screenshot](./docs/images/satellite-tracker-screenshot.png)

## 開発

```bash
yarn install
yarn dev
```

## ビルド

```bash
yarn build
```

## 設計思想

本プロジェクトでは、実務での保守性や機能追加を意識したレイヤー分離を行っています。

API通信、ドメインロジック、状態管理、表示コンポーネントを分けることで、チーム開発でも変更箇所を追いやすい構成を目指しています。

Context Providerでアプリ全体の状態とデータ取得を集約し、各Container ComponentではContextの値をPresentational Componentへ受け渡す構成にしています。

## フォルダ構成

```text
src/
  components/
    earth-viewer/        # 3D地球・衛星マーカー・軌道線の表示
    orbit-line/          # 軌道予測ライン
    satellite-info/      # 選択中衛星の詳細表示
    satellite-list/      # 衛星一覧・TLEグループ選択
    satellite-marker/    # 衛星マーカー
    tle-group-selector/  # TLEグループ選択UI
    icons/               # アイコンコンポーネント
    ui/                  # 汎用UIコンポーネント
  constants/             # TLEグループ、API URLなどの定数
  contexts/              # アプリ全体の衛星状態管理
  dataModel/             # TLE、衛星位置、軌道予測のデータモデル
  domain/                # 衛星位置計算、座標変換、軌道予測
  hooks/                 # Reactとdomain/infrastructureを接続する処理
  infrastructure/        # CelesTrak API通信、モックTLE
  ```

## 技術スタック

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Three.js
- React Three Fiber
- @react-three/drei
- satellite.js
- CelesTrak GP data

## Notes

現在はCelesTrakへの過剰アクセスを避けるため、モックTLEデータを利用しています。

実APIに切り替える場合は、`src/infrastructure/celestrakClient.ts` の `USE_MOCK_TLE` を変更します。

ただし、CelesTrakは短時間の過剰アクセスでIP制限されるため、実APIを利用する場合は以下の対策が必要です。

- TLEグループごとの件数制限
- activeのような大規模グループの検索・絞り込み
- 不必要な再取得の抑制

## Future Work

- 衛星検索
- 表示件数の制限
- 選択衛星へのカメラフォーカス
- 地上局からの可視判定
- 軌道予測の表示範囲切り替え
