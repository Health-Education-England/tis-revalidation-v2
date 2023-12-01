import { ContentfulDocumentToHtmlPipe } from './contentful-document-to-html.pipe';

describe('ContentfulDocumentToHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new ContentfulDocumentToHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
