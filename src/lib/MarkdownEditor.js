import React, {Fragment, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {useMarkdown, useMarkdownHookOptions} from 'react-native-marked';
import {MaterialCommunityIcons as IconMaterialCommunityIcons} from 'react-native-vector-icons';
import {parseHTML} from './parseHtml';
import {renderFormatButtons} from './renderButtons';

const styles = StyleSheet.create({
  composeText: {
    borderWidth: 2,
    padding: 4,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    paddingLeft: 8,
    fontSize: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 2,
    borderTopWidth: 0,
    backgroundColor: '#fff',
  },
  inlinePadding: {
    padding: 8,
  },
  preview: {
    borderWidth: 2,
    padding: 4,
    paddingLeft: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  icon: {
    padding: 8,
    borderRightWidth: 2,
    color: '#000',
  },
});

export default function MarkdownEditor({
  placeholder,
  markdown,
  onMarkdownChange,
  buttonStyles,
  buttonContainerStyles,
  textInputStyles,
  markdownViewStyles,
  placeholderTextColor,
  colorScheme,
}) {
  const [showPreview, setShowPreview] = useState(false);
  const [state, setState] = useState({
    text: '',
    selection: {
      start: 0,
      end: 0,
    },
  });

  useEffect(() => {
    setState((p) => ({
      ...p,
      text: markdown || '',
    }));
  }, [markdown]);

  const convertMarkdown = () => {
    setShowPreview(!showPreview);
  };

  const onSelectionChange = (event) => {
    const values = event.nativeEvent.selection;
    setState((p) => ({
      ...p,
      selection: values,
    }));
  };

  const changeText = (input) => {
    setState((p) => ({
      ...p,
      text: input,
    }));
    if (onMarkdownChange) onMarkdownChange(input);
  };

  return (
    <KeyboardAvoidingView behavior="height">
      {!showPreview && (
        <TextInput
          style={textInputStyles || styles.composeText}
          multiline
          underlineColorAndroid="transparent"
          onChangeText={changeText}
          onSelectionChange={onSelectionChange}
          value={state.text}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || '#000'}
        />
      )}
      {showPreview ? (
        <RenderPreview
          text={state.text}
          style={markdownViewStyles}
          scheme={colorScheme}
        />
      ) : null}
      <View style={buttonContainerStyles || styles.buttonContainer}>
        <TouchableOpacity
          onPress={convertMarkdown}
          style={{
            borderRightColor: buttonStyles?.color || '#000',
            borderRightWidth: 2,
          }}
        >
          <Text style={buttonStyles || styles.icon}>
            <IconMaterialCommunityIcons
              name={showPreview ? 'eye-off' : 'eye'}
              size={20}
            />
          </Text>
        </TouchableOpacity>
        <View pointerEvents={showPreview ? 'none' : 'auto'} style={{flex: 1}}>
          {renderFormatButtons({state, setState}, buttonStyles)}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const RenderPreview = ({text, style, scheme}) => {
  const colorScheme = useColorScheme();

  const options: useMarkdownHookOptions = {
    colorScheme: scheme || colorScheme,
  };
  const elements = useMarkdown(
    text === '' ? 'Markdown preview here' : parseHTML(text),
    options,
  );
  return (
    <View style={style || styles.preview}>
      {elements.map((element, index) => (
        <Fragment key={`demo_${index}`}>{element}</Fragment>
      ))}
    </View>
  );
};
