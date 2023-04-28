import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Markdown from 'react-native-marked';
import {MaterialCommunityIcons as IconMaterialCommunityIcons} from 'react-native-vector-icons';
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
}) {
  const [showPreview, setShowPreview] = useState(false);
  const [state, setState] = useState({
    text: markdown || '',
    selection: {
      start: 0,
      end: 0,
    },
  });

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

  const renderPreview = () => {
    return (
      <View style={markdownViewStyles || styles.preview}>
        <Markdown
          key={`_keyMarkdownEdit`}
          flatListProps={{
            listKey: (item, index) => `_keylistEdit${index.toString()}`,
            keyExtractor: (item, index) =>
              `_keyExtractorEdit${index.toString()}`,
            style: {marginLeft: 3},
            initialNumToRender: 5000 * 100 * 2,
          }}
          value={state.text === '' ? 'Markdown preview here' : state.text}
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView behavior="padding">
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
          selection={state.selection}
        />
      )}
      {showPreview ? renderPreview() : null}
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
