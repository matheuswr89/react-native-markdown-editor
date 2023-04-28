import {
  FontAwesome as IconFontAwesome,
  Fontisto as IconFontisto,
  MaterialCommunityIcons as IconMaterialCommunityIcons,
} from 'react-native-vector-icons';
import applyListFormat from './applyListFormat';
import applyWebLinkFormat from './applyWebLinkFormat';
import applyWrapFormat from './applyWrapFormat';
import applyWrapFormatNewLines from './applyWrapFormatNewLines';

export default [
  {
    key: 'B',
    title: <IconFontisto name="bold" size={14} />,
    wrapper: '**',
    onPress: applyWrapFormat,
  },
  {
    key: 'I',
    title: <IconFontisto name="italic" size={14} />,
    wrapper: '*',
    onPress: applyWrapFormat,
  },
  {
    key: 'S',
    title: <IconFontAwesome name="strikethrough" size={18} />,
    wrapper: '~~',
    onPress: applyWrapFormat,
  },
  {
    key: 'C',
    title: <IconFontisto name="code" size={14} />,
    wrapper: '`',
    onPress: applyWrapFormat,
  },
  {
    key: 'CC',
    title: <IconMaterialCommunityIcons name="code-braces" size={20} />,
    wrapper: '```',
    onPress: applyWrapFormatNewLines,
  },
  {
    key: 'L',
    title: <IconFontAwesome name="list-ul" size={18} />,
    prefix: '-',
    onPress: applyListFormat,
  },
  {
    key: 'LN',
    title: <IconFontAwesome name="list-ol" size={18} />,
    prefix: '1.',
    onPress: applyListFormat,
  },
  {
    key: 'WEB',
    title: <IconFontisto name="link" size={14} />,
    prefix: '[]()',
    onPress: applyWebLinkFormat,
  },
  {
    key: 'IMG',
    title: <IconFontAwesome name="image" size={18} />,
    prefix: '![]()',
    onPress: applyWebLinkFormat,
  },
  {key: 'H1', title: 'H1', prefix: '#', onPress: applyListFormat},
  {key: 'H2', title: 'H2', prefix: '##', onPress: applyListFormat},
  {key: 'H3', title: 'H3', prefix: '###', onPress: applyListFormat},
  {key: 'H4', title: 'H4', prefix: '####', onPress: applyListFormat},
  {key: 'H5', title: 'H5', prefix: '#####', onPress: applyListFormat},
  {key: 'H6', title: 'H6', prefix: '######', onPress: applyListFormat},
];
