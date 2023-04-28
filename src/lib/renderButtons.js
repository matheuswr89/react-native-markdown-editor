import React from 'react';
import {FlatList, Text, TouchableOpacity} from 'react-native';

import {View} from 'react-native';
import Formats from './Formats';

const defaultStyles = {padding: 8, fontSize: 16, color: '#000'};

const defaultMarkdownButton = ({item, state, setState, buttonStyles}) => {
  return (
    <TouchableOpacity onPress={() => item.onPress({state, setState, item})}>
      <Text style={buttonStyles || defaultStyles}>{item.title}</Text>
    </TouchableOpacity>
  );
};

export const renderFormatButtons = ({state, setState}, buttonStyles) => {
  const list = (
    <FlatList
      data={Formats}
      keyboardShouldPersistTaps="always"
      renderItem={({item, index}) => (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          {defaultMarkdownButton({item, state, setState, buttonStyles})}
        </View>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
  return list;
};
