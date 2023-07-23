import * as cheerio from 'cheerio';

const hasInArray = (array, string) => {
  for (let i of array) {
    if (!i.includes(string)) return true;
  }
  return false;
};

export const parseHTML = (text) => {
  const array = [
    ...text.matchAll(
      /(```(.|\n)*?```|<pre>(.|\n)*?<\/pre>|<code>(.|\n)*?<\/code>)/gm,
    ),
  ];
  const $ = cheerio.load(
    text,
    {
      decodeEntities: true,
    },
    false,
  );
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
    if (!hasInArray(array, $(this).html()))
      $(this).replaceWith($(this).html().trim());
  });
  $('img').each(function (i, e) {
    if (!hasInArray(array, $(this).html())) {
      const img = `![img${i}](${$(this).attr('src')})`;
      $(this).replaceWith(img);
    }
  });
  $('a').each(function () {
    if (!hasInArray(array, $(this).html())) {
      let link = `[${$(this).text()}](${$(this).attr('href')})`;
      $(this).replaceWith(link);
    }
  });
  $('b').each(function () {
    if (!hasInArray(array, $(this).html())) {
      const link = `**${$(this).text()}**`;
      $(this).replaceWith(link);
    }
  });
  $('del').each(function () {
    if (!hasInArray(array, $(this).html())) {
      const link = `~~${$(this).text()}~~`;
      $(this).replaceWith(link);
    }
  });
  $('hr').each(function () {
    if (!hasInArray(array, $(this).html())) $(this).replaceWith('---');
  });
  $('i').each(function () {
    if (!hasInArray(array, $(this).parent().html())) {
      const link = `*${$(this).text()}*`;
      $(this).replaceWith(link);
    }
  });
  $('p').each(function () {
    if (!hasInArray(array, $(this).html())) $(this).replaceWith($(this).text());
  });
  $('br').each(function () {
    if (!hasInArray(array, $(this).html())) $(this).replaceWith('\n');
  });
  for (let i = 1; i <= 6; i++) {
    $('h' + i).each(function () {
      if (!hasInArray(array, $(this).html())) {
        const headMarkdown = `${head.substring(0, i)} ${$(this).text()}`;
        $(this).replaceWith(headMarkdown);
      }
    });
  }
  return $.html({
    decodeEntities: true,
    withEndIndices: false,
    withStartIndices: false,
    recognizeSelfClosing: false,
  })
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&le;/g, '≤')
    .replace(/&ge;/g, '≥')
    .replace(/&#(\d+);/g, function (m, n) {
      return String.fromCharCode(n);
    });
};
