import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import cjkFriendly from 'markdown-it-cjk-friendly'

// withMermaid でラップすると ```mermaid コードブロックが図としてレンダリングされる
export default withMermaid({
  ...defineConfig({
    lang: 'ja-JP',
    title: 'stock-monitor',
    description: '理不尽に安く売られた優良株を自動で狩るハンティングシステム — 思想と仕組みの解説',

    // GitHub Pages 等のサブパス配信なら base を設定（Vercel/Netlify のルート配信なら不要）
    // base: '/stock-monitor-docs/',

    lastUpdated: true,
    cleanUrls: true,

    // ── Markdown 拡張 ──────────────────────────────────
    // VitePress 1.x は日本語の直後に来る **「…」 等を太字と認識できない弱点がある。
    // markdown-it-cjk-friendly を足すと CJK でも **bold** が正しく効く（2.0 の標準と同じ）。
    markdown: {
      config: (md) => {
        md.use(cjkFriendly)
      },
    },

    head: [
      ['meta', { name: 'theme-color', content: '#3c8772' }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:title', content: 'stock-monitor ドキュメント' }],
    ],

    themeConfig: {
      nav: [
        { text: 'アプリ解説', link: '/guide/overview' },
        { text: '機能ガイド', link: '/guide/features' },
        { text: '運用・チューニング', link: '/guide/operations' },
        { text: '開発プロセス', link: '/guide/development' },
        { text: '用語集', link: '/guide/glossary' },
      ],

      sidebar: [
        {
          text: 'はじめに',
          items: [{ text: 'ホーム', link: '/' }],
        },
        {
          text: 'システムを理解する',
          items: [
            { text: 'stock-monitor とは（アプリ解説）', link: '/guide/overview' },
            { text: '機能ガイド', link: '/guide/features' },
            { text: '運用・チューニングガイド', link: '/guide/operations' },
            { text: '用語集', link: '/guide/glossary' },
          ],
        },
        {
          text: '開発者向け',
          items: [
            { text: '開発プロセス', link: '/guide/development' },
          ],
        },
      ],

      // ローカル全文検索。日本語は標準でも動くが、トークナイズが弱いと感じたら
      // Algolia DocSearch への切り替えを検討（README 参照）。
      search: {
        provider: 'local',
        options: {
          translations: {
            button: { buttonText: '検索', buttonAriaLabel: '検索' },
            modal: {
              noResultsText: '見つかりませんでした',
              resetButtonTitle: '条件をリセット',
              footer: {
                selectText: '選択',
                navigateText: '移動',
                closeText: '閉じる',
              },
            },
          },
        },
      },

      docFooter: { prev: '前のページ', next: '次のページ' },
      outline: { label: 'このページの内容' },
      lastUpdatedText: '最終更新',
      returnToTopLabel: 'トップへ戻る',
      darkModeSwitchLabel: '外観',
      lightModeSwitchTitle: 'ライトモードに切り替え',
      darkModeSwitchTitle: 'ダークモードに切り替え',

      // 本体リポジトリが private のため editLink は省略（公開リンクにならないよう注意）
    },
  }),

  // ── mermaid 図の表示設定 ──────────────────────────────
  mermaid: {
    theme: 'default',
    themeVariables: {
      fontSize: '18px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Sans", "Noto Sans JP", Meiryo, sans-serif',
    }
  }

})
