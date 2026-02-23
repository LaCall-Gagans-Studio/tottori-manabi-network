# 修正内容の確認 - 施設詳細ページへの代表者氏名追加

施設詳細ページに代表者氏名を表示する機能を実装しました。

## 実施した変更

### 型定義の更新

- [getDict.ts](<file:///c:/Users/Tohma/Dev/tottori-manabi-network/tottori-manabi-network-app/src/app/(frontend)/lib/getDict.ts>): `Dict` インターフェースに `chair` フィールドを追加しました。

### ページコンポーネントの修正

- [page.tsx](<file:///c:/Users/Tohma/Dev/tottori-manabi-network/tottori-manabi-network-app/src/app/(frontend)/dicts/[slug]/page.tsx>): 団体名の下に「代表者：{代表者氏名}」を表示するように追加しました。

## 確認内容

### 静的解析

- `npm run lint` を実行し、型エラーや構文エラーが発生しないことを確認しました。

### 表示内容

団体名の直下に、住所と同様のスタイルで「代表者：〇〇」が表示されることを確認しました。

```tsx
<h1 className="text-3xl font-bold text-ws-primary">{dict.name}</h1>
<h2 className="text-lg">{dict.org}</h2>
<p className="text-sm text-slate-500">代表者：{dict.chair}</p> {/* 追加 */}
<p className="text-sm text-slate-500">{dict.address}</p>
```
