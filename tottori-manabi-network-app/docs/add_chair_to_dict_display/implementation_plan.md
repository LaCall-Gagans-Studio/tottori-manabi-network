# 実装計画 - 施設詳細ページへの代表者氏名追加

施設詳細ページにおいて、団体名や住所と並べて代表者氏名（`chair` フィールド）を表示するように変更します。

## 変更内容

### 1. 型定義の更新

`src/app/(frontend)/lib/getDict.ts` の `Dict` インターフェースに `chair` フィールドを追加します。これにより、TypeScript で `dict.chair` にアクセスできるようになります。

### 2. 施設詳細ページの修正

`src/app/(frontend)/dicts/[slug]/page.tsx` において、`dict.name`, `dict.org`, `dict.address` が表示されている箇所に `dict.chair` を追加します。

## 修正詳細

#### [MODIFY] [getDict.ts](<file:///c:/Users/Tohma/Dev/tottori-manabi-network/tottori-manabi-network-app/src/app/(frontend)/lib/getDict.ts>)

- `Dict` インターフェースに `chair: string` を追加。

#### [MODIFY] [page.tsx](<file:///c:/Users/Tohma/Dev/tottori-manabi-network/tottori-manabi-network-app/src/app/(frontend)/dicts/[slug]/page.tsx>)

- 団体名 (`dict.org`) の下、または住所 (`dict.address`) の近くに `代表者：{dict.chair}` を追加。

## 検証計画

### 手動確認

1. `npm run lint` を実行し、型エラーや構文エラーがないことを確認する。
2. （ローカル開発環境が利用可能な場合）特定の施設詳細ページを開き、代表者氏名が正しく表示されていることを視認する。
   - 期待値：団体名、代表者氏名、住所が順番に表示されていること。
