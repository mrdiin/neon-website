import PropTypes from 'prop-types';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import useCopyToClipboard from 'hooks/use-copy-to-clipboard';

import CheckIcon from './images/check.inline.svg';
import CopyIcon from './images/copy.inline.svg';

const DEFAULT_LANGUAGE = 'bash';

const CodeBlock = ({ className, children, ...otherProps }) => {
  const { isCopied, handleCopy } = useCopyToClipboard(3000);

  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : DEFAULT_LANGUAGE;
  const code = children.trim();

  return (
    <div className="group relative" {...otherProps}>
      <SyntaxHighlighter language={language} useInlineStyles={false}>
        {code}
      </SyntaxHighlighter>
      <button
        className="invisible absolute top-2 right-2 rounded border border-gray-5 bg-white p-1.5 opacity-0 transition-[background-color,opacity,visibility] duration-200 group-hover:visible group-hover:opacity-100"
        type="button"
        disabled={isCopied}
        onClick={() => handleCopy(code)}
      >
        {isCopied ? <CheckIcon className="h-4 w-4 text-primary-1" /> : <CopyIcon />}
      </button>
    </div>
  );
};

CodeBlock.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

CodeBlock.defaultProps = {
  className: null,
};

export default CodeBlock;
