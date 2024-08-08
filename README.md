---
marp: true
theme: default
_class: lead
paginate: true
backgroundColor:
backgroundImage: url('https://marp.app/assets/hero-background.svg')
---

<!--
headingDivider: 1
-->

#

## 参考 URL

Udemy[Next.js フルスタック Web アプリケーション開発入門](https://defidejp.udemy.com/course/nextjs-fullstack/learn/lecture/42377730)

## 技術スタック

NEXT.js
MongoDB

# データフェッチの種類

**fetch を使用したサーバー（SC から）上でのデータフェッチ**

- サーバーで実行。
- SEO の向上。
- 初期表示のパフォーマンス向上。

**ルートハンドラを介したクライアント（CC から）上でのデータフェッチ**
クライアントからルートハンドラを呼び出し、ルートハンドラはサーバーで実行され、データをクライアントへ返す。

- ユーザーのブラウザで実行。
- 初期ロード時間の短縮。
- SEO 効果が限定的。

# ルートハンドラー

**従来 Express などで開発をしていたバックエンド開発で使用していた API を NEXT.js 上で直接記入するための機能**

ルートハンドラーには、
ブラウザからのアクセス
コンポーネント（クライアントコンポーネント）からのアクセス
の２種類がある。

# ☆Server Components とルートハンドラ ☆

Server Components はサーバー上でレンダリングされるため、データを取得するために Server Component からルートハンドラを呼び出す必要はありません。代わりに、Server Component 内で直接データを取得できます。

#

## ルートハンドラの特徴

- アップディレクトリ構造を利用して、API のエンドポイントのパスも定義できる。
- app>api 直下にルートハンドラを作成することでページと API のルートを区別しやすい。
- api を作成する場合、route.ts で定義する。

#

## ブラウザからのアクセス: 完全なページリロード、サーバーへのフルリクエスト/レスポンス。(従来型の Web サイト)

ユーザーがブラウザのアドレスバーに URL を入力するか、リンクをクリックして特定の URL に移動する際に発生する

- ブラウザリクエスト: ブラウザがサーバーに HTTP リクエストを送信
- サーバーレスポンス: サーバーがリクエストされた URL に対応するルートハンドラを呼び出し、適切なレスポンスを返す
- ページリロード: ブラウザはサーバーから受け取ったレスポンスを使用してページをリロードする。

#

## コンポーネントからのアクセス: クライアントサイドでの部分的なページ更新、サーバーとの通信は最小限。(SPA などのウェブサイト)

シングルページアプリケーション（SPA）などのクライアントサイドで行われるルーティングのケース。

- クライアントサイドルーティング：ブラウザの URL が JS によって変更
- コンポーネントレンダリング：ブラウザ内で行われ、サーバーとの通信は不要。（データフェッチは別途 API リクエストがおこなわれる）
- 部分的なページ更新: ページ全体のリロードなしで、必要な部分だけが更新

# ブラウザからルートハンドラにアクセスするとき

- 関数名が HTTP メソッドと対応する。
- HTTP メソッドが異なれば、１つのファイルに複数のルートハンドラを定義できる。
- NextResponse の json メソッドの第一引数にオブジェクトを、第二引数にステータスコードも設定できる。
- ルートハンドラは、デフォルトは revalidate なしでビルドされるので、リクエスト時にダイナミックレンダリングさせたいときは、dynamic = force-dynamic を指定する。（ルートセグメントコンフィグという）
- ブラウザの/api/tasks で表示される

#

```
//app>api>tasks>route.ts
import { NextResponse } from "next/server";
//task型を定義
export interface Task {
  id:number;
  name:string;
}

const tasks:Task[] = {
  {id: 1, name: "mathmetic"},
  {id: 2, name: "japanese"}
}

export const GET = async () => {
  return NextResponse.json({ tasks }, {
    status: 200
  })
}

export const dymanic = 'force-dynamic'
```

# コンポーネントからルートハンドラにアクセスするとき

- ルートハンドラに API リクエストを送信する関数を定義する
- API リクエストの送信には fetch 関数を使用する
- 第一引数にはリクエスト先の URL,第二引数には HTTP メソッド（デフォルトの GET メソッドは省略可）や、キャッシュの種類(デフォルトの cache:no-store は省略可)を記載できる。、
- NEXT.js のフェッチにはキャッシュ機能がある

#

```
//app>task>page.tsx
const getTasks = async () => {
  const response = await fetch("http://localhost:3000/api/tasks", {
    method: "GET",
    cache: "no-store"
  })
  return await response.json();
}

const TaskPage =　async () => {
  const tasks = (await getTasks()).tasks as Task[];
  return (
    <div>
      {tasks.map((task)=>(
        <div key={task.id}>{task.name}</div>
      ))}
    </div>);
};
export default TaskPage;
```

# ServerActions

**クライアントから直接呼び出すことのできるサーバー側の非同期関数**

# ミドルウェア
