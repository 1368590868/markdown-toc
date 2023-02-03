import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Affix, Card, Input, theme } from 'antd';
import { marked } from 'marked';
import React, { useEffect } from 'react';
import Tocify from './tocify';

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  // @ts-ignore
  const [markdown, setMarkdown] = React.useState(
    `# h1
> h1 content
## h2
> h2 content
 
**字体加粗**
### h3
h3cotent

左边 **Markdown** ，右边**HTML**

# TOC
      
    `,
  );

  useEffect(() => {
    (async function () {
      await fetch('/markdown.json')
        .then((res) => res.json())
        .then((res: any) => {
          setMarkdown(res.markdown);
        });
    })();
    console.log(123);
  }, []);

  const tocify = new Tocify();
  const renderer = new marked.Renderer();
  renderer.heading = (text: string, level: number) => {
    console.log(text);
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" ><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer: renderer,
  });

  let html = marked(markdown);
  return (
    <PageContainer>
      <Affix offsetTop={50}>
        <div className="Toc" style={{ backgroundColor: '#fff' }}>
          {tocify && tocify.render()}
        </div>
      </Affix>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            上面是TOC
          </div>
          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            左边区域为Markdown编辑区，右边区域为HTML展示区
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              minHeight: '40vh',
            }}
          >
            <div style={{ width: '45%' }}>
              <Input.TextArea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                rows={30}
              />
            </div>
            <div
              style={{
                width: '45%',
                border: '1px solid #40a9ff',
                padding: '10px',
                overflowX: 'scroll',
              }}
              className="Doc"
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
