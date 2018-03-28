import React, { Component } from 'react';
import { View } from 'react-native';

import CheckBoxItem from './CheckBoxItem';

const mapNumberToCharacter = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
];

export default class CheckBox extends Component {
  constructor(props) {
    super(props);

    const { options } = props;
    this.initialState = options.map((option, key) => (
      [mapNumberToCharacter[key]] = false
    ));

    this.state = {
      ...this.initialState,
    };
  }

  render() {
    const { options } = this.props;

    const RenderCheckBox = options.map((option, key) => (
      <CheckBoxItem
        {...this.props}
        multiple={true}
        value={option}
        key={key}
      />
    ));

    return (
      <View>
        {RenderCheckBox}
      </View>
    );
  }
}