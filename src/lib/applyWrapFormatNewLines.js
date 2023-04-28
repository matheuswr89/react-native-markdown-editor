import {replaceBetween} from './utils';

export default ({state, setState, item}) => {
  let {text, selection} = state;
  let newLine = '';
  let newPosition;
  if (selection.start === selection.end) {
    newPosition = selection.end + item.wrapper.length + 2; // +2 For two new lines
    newLine = '\n';
  } else {
    newPosition = selection.end + item.wrapper.length * 2 + 3; // +3 For three new lines
  }
  const newText = replaceBetween(
    text,
    selection,
    `${newLine}${item.wrapper.concat(
      '\n',
      text.substring(selection.start, selection.end),
      '\n',
      item.wrapper,
      '\n',
    )}`,
  );
  const extra = {
    start: newPosition,
    end: newPosition,
  };
  setState({
    text: newText,
    selection: extra,
  });
};
