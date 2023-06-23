import * as cheerio from 'cheerio';

export const parseHTML = (text) => {
  const $ = cheerio.load(text, {
    decodeEntities: false,
  }, false);
  const head = '######';

  $('code').each(function (i, e) {
    const content = $(this)
      .toString()
      .replace('<code>', '')
      .replace('</code>', '');

    const code = '```\n' + content.trim() + '\n```';
    $(this).replaceWith(code);
  });
  $('pre').each(function (i, e) {
    const content = $(this)
      .toString()
      .replace('<pre>', '')
      .replace('</pre>', '');
    const code = '```\n' + content.trim() + '\n```';
    $(this).replaceWith(code);
  });
  $('div').each(function (i, e) {
    $(this).replaceWith($(this).html().trim());
  });
  $('img').each(function (i, e) {
    const img = `![img${i}](${$(this).attr('src')})`;
    $(this).replaceWith(img);
  });
  $('a').each(function () {
    let link = `[${$(this).text()}](${$(this).attr('href')})`;
    $(this).replaceWith(link);
  });
  $('b').each(function () {
    const link = `**${$(this).text()}**`;
    $(this).replaceWith(link);
  });
  $('del').each(function () {
    const link = `~~${$(this).text()}~~`;
    $(this).replaceWith(link);
  });
  $('hr').each(function () {
    $(this).replaceWith('---');
  });
  $('i').each(function () {
    const link = `*${$(this).text()}*`;
    $(this).replaceWith(link);
  });
  $('p').each(function () {
    $(this).replaceWith($(this).text());
  });
  $('br').each(function () {
    $(this).replaceWith('\n');
  });
  for (let i = 1; i <= 6; i++) {
    $('h' + i).each(function () {
      const headMarkdown = `${head.substring(0, i)} ${$(this).text()}`;
      $(this).replaceWith(headMarkdown);
    });
  }
  return $.html()
  .toString()
  .replace(/&amp;/g, "&")
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&le;/g, '≤')
  .replace(/&ge;/g, '≥')
  .replace(/&#(\d+);/g, function (m, n) {
    return String.fromCharCode(n);
  });
};
