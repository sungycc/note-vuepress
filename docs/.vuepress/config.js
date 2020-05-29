module.exports = {
  title: 'Sungy的笔记',
  description: '基于vuepress的web前端笔记',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],
  markdown: {
    lineNumbers: true,
  },
  // theme: '@vuepress/theme-vue',
  themeConfig: {
    repo: 'sungycc/blog-vuepress',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    sidebarDepth: 3,
    lastUpdated: '上次编辑时间',
    editLinkText: '在 GitHub 上编辑此页',
    nav: [
      { text: 'web', link: '/web/' },
      { text: 'node', link: '/node/' },
      { text: 'database', link: '/database/' },
      { text: '其它', link: '/other/' },
      { text: '博客', link: 'http://blog.sungy.top' },
      { text: '简历', link: 'http://resume.sungy.top' },
    ],
    sidebar:{
      '/web/': [
        '/web/',
        {
          title: '布局',
          collapsable: false,
          children: [
            '/web/object',
            '/web/span',
            '/web/center',
            '/web/float',
            '/web/flex',
            '/web/rem',
          ]
        },
        {
          title: 'javascript',
          collapsable: false,
          children: [
            '/web/this',
            '/web/prototype',
            '/web/extend',
            '/web/ajax',
            '/web/jsonp',
            '/web/arrow-function',
            '/web/promise',
          ]
        },
        {
          title: 'vue',
          collapsable: false,
          children: [
            '/web/data',
          ]
        },
        {
          title: 'react',
          collapsable: false,
          children: [
            '/web/setstate',
          ]
        },
      ],
      '/node/': [
        '/node/',
        '/node/module',
        '/node/express',
        '/node/koa',
        '/node/egg',
      ],
      '/database/': [
        '/database/',
        '/database/mysql',
        '/database/mongodb',
      ],
      '/other/': [
        '/other/',
        '/other/git',
        '/other/nginx',
        '/other/linux',
      ]
    }
  }
}
