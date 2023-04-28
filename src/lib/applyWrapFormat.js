import {replaceBetween} from './utils';

export default ({state, setState, item}) => {
  let {text, selection} = state;
  const newText = replaceBetween(
    text,
    selection,
    item.wrapper.concat(
      text.substring(selection.start, selection.end),
      item.wrapper,
    ),
  );
  let newPosition;
  if (selection.start === selection.end) {
    newPosition = selection.end + item.wrapper.length;
  } else {
    newPosition = selection.end + item.wrapper.length * 2;
  }
  const extra = {
    start: newPosition,
    end: newPosition,
  };
  setState({
    text: newText,
    selection: extra,
  });
};
