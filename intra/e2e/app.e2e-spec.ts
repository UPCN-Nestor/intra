import { IntraPage } from './app.po';

describe('intra App', function() {
  let page: IntraPage;

  beforeEach(() => {
    page = new IntraPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
