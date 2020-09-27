import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import {Layout} from 'antd';

const ReactMarkdownSC = {
  MARKDOWN: styled(ReactMarkdown)`
    a {
      color: red;
    }
  `,
  CONTENT: styled(Layout.Content)`
    overflow-x: hidden;
    @media (max-width: 500px) {
      padding: 0!important;
    }
  `,
};
export default ReactMarkdownSC;
