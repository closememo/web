import { NormalizedCacheObject } from '@apollo/client';
import { ChunkExtractor } from '@loadable/server';
import { HelmetData } from 'react-helmet-async';
import serialize from 'serialize-javascript';
import { isLocal } from 'shared/constants/env';

type HtmlProperties = {
  content: string,
  extractor: ChunkExtractor,
  apolloState: NormalizedCacheObject,
  helmetData: HelmetData
}

const DESCRIPTION_CONTENT = '클로즈메모(closememo)는 간단하게 어디서든 작성할 수 있는 웹메모장입니다.\n' +
  '클로즈메모는 검색에 대한 강력한 기능을 제공하며 작성한 메모를 자동으로 분석하여 분류하고 연결합니다.';

function createHtml({ content, extractor, apolloState, helmetData }: HtmlProperties) {

  const script = `window.addEventListener('load', function() {
    const div = document.createElement('div');
    div.innerHTML = '${serialize(extractor.getScriptTags())}';
    
    const scripts = div.getElementsByTagName('script');
    const fragment = document.createElement('fragment');
    
    for (let i = 0; i < scripts.length; i++) {
      var s = scripts[i];
      var newScript = document.createElement('script');
      
      for (let j = 0; j < s.attributes.length; j++) {
        const name = s.attributes[j].name;
        const value = s.attributes[j].value;
        
        newScript.setAttribute(name, value);
      }
      newScript.innerHTML = s.innerHTML;
      fragment.appendChild(newScript);
    }
    
    document.body.appendChild(fragment);
  })`.replace(/[\r\n]|\s{2,}/g, '');

  const initialStateString = `window.__APOLLO_STATE__ = ${serialize(apolloState, {
    isJSON: true,
  })}`;

  const googleAnalyticsScript = isLocal
    ? ''
    : `
    <script async src='https://www.googletagmanager.com/gtag/js?id=G-C01VWP6G65'></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-C01VWP6G65');
    </script>`;

  return `
    <html lang='ko'>
    <head>
      <meta charSet='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>
      <meta name='referrer' content='always' />
      <meta name='description' content='${DESCRIPTION_CONTENT}' />
      ${googleAnalyticsScript}
      ${extractor.getStyleTags()}
      ${helmetData.meta?.toString()}
      ${helmetData.link?.toString()}
      <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css' rel='stylesheet'
          integrity='sha384-uWxY/CJNBR+1zjPWmfnSnVxwRheevXITnMqoEIeG1LJrdI0GlVs/9cVSyPYXdcSF' crossorigin='anonymous'>
    </head>
    <body>
      <div id='root'>${content}</div>
      <script id='initialState'>${initialStateString}</script>
      <script id='__script'>${script}</script>
    </body>
  </html>
  `;
}

export default createHtml;
