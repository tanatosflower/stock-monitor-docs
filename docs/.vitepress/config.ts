import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// withMermaid でラップすると ```mermaid コードブロックが図としてレンダリングされる
export default withMermaid(
  defineConfig({
    lang: 'ja-JP',
    title: 'stock-monitor',
    description: '理不尽に安く売られた優良株を自動で狩るハンティングシステム — 思想と仕組みの解説',

    // GitHub Pages 等のサブパス配信なら base を設定（Vercel/Netlify のルート配信なら不要）
    // base: '/stock-monitor-docs/',

    lastUpdated: true,
    cleanUrls: true,

    head: [
      ['meta', { name: 'theme-color', content: '#3c8772' }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:title', content: 'stock-monitor ドキュメント' }],
    ],

    themeConfig: {
      nav: [
        { text: 'アプリ解説', link: '/guide/overview' },
        { text: '開発プロセス', link: '/guide/development' },
      ],

      sidebar: [
        {
          text: 'はじめに',
          items: [{ text: 'ホーム', link: '/' }],
        },
        {
          text: 'システムの解説',
          items: [
            { text: 'stock-monitor とは（アプリ解説）', link: '/guide/overview' },
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
  })
)
