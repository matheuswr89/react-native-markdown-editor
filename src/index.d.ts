import {ComponentType} from 'react';
import MarkdownEditor from './lib/MarkdownEditor';

export function replaceBetween(): string;
export function isStringWebLink(): boolean;

export interface MarkdownEditorProps {
  onMarkdownChange: (text: string) => void;
  placeholder?: string;
  markdown?: string;
  buttonStyles?: StyleSheet.NamedStyles<any>;
  buttonContainerStyles?: StyleSheet.NamedStyles<any>;
  textInputStyles?: StyleSheet.NamedStyles<any>;
  markdownViewStyles?: StyleSheet.NamedStyles<any>;
  placeholderTextColor?: string;
}

type MarkdownStatic = ComponentType<MarkdownEditorProps>;
export const MarkdownEditor: MarkdownStatic;
export type MarkdownEditor = MarkdownStatic;

export default MarkdownEditor;
