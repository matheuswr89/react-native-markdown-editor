import {isStringWebLink, replaceBetween} from './utils';

export default ({state, setState, item}) => {
  let {text, selection} = state;
  let newSelection;
  const selectedText = text.substring(selection.start, selection.end);
  const adtion = item.key === 'IMG' ? 1 : 0;
  if (selection.start !== selection.end) {
    if (isStringWebLink(selectedText)) {
      newSelection = {
        start: selection.start + 1 + adtion,
        end: selection.start + 1 + adtion,
      };
    } else {
      newSelection = {
        start: selection.end + 3 + adtion,
        end: selection.end + 3 + adtion,
      };
    }
  } else {
    newSelection = {
      start: selection.start + 1 + adtion,
      end: selection.start + 1 + adtion,
    };
  }
  let newText = replaceBetween(text, selection, `${item.prefix}`);
  setState({
    text: newText,
    selection: newSelection,
  });
};
