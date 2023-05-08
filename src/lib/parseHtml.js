import * as cheerio from 'cheerio';

export const parseHTML = (text) => {
  const $ = cheerio.load(text);
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
  for (let i = 1; i <= 6; i++) {
    $('h' + i).each(function () {
      const headMarkdown = `${head.substring(0, i)} ${$(this).text()}`;
      $(this).replaceWith(headMarkdown);
    });
  }

  return $.text();
};
