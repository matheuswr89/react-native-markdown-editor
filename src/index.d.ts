import {ComponentType} from 'react';
import MarkdownEditor from './lib/MarkdownEditor';

export function replaceBetween(
  text: string,
  selection: Object,
  what: string,
): string;
export function isStringWebLink(value: string): boolean;
export function parseHTML(text: string): string;

export interface MarkdownEditorProps {
  onMarkdownChange: (text: string) => void;
  placeholder?: string;
  markdown?: string;
  buttonStyles?: StyleSheet.NamedStyles<any>;
  buttonContainerStyles?: StyleSheet.NamedStyles<any>;
  textInputStyles?: StyleSheet.NamedStyles<any>;
  markdownViewStyles?: StyleSheet.NamedStyles<any>;
  placeholderTextColor?: string;
  colorScheme?: string;
}

type MarkdownStatic = ComponentType<MarkdownEditorProps>;
export const MarkdownEditor: MarkdownStatic;
export type MarkdownEditor = MarkdownStatic;
export default MarkdownEditor;
