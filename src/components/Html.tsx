import sanitizeHTML from 'sanitize-html';
import { SAFE_HTML_TAGS } from '../constants/SafeHTMLTags';

interface HtmlProps {
  html: string;
}

const HTML_SANITIZE_OPTIONS = {
  allowedTags: SAFE_HTML_TAGS,
};

export function Html({ html }: HtmlProps) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: sanitizeHTML(html, HTML_SANITIZE_OPTIONS)
      }}
    />
  );
}