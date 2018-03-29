import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import _ from 'lodash';

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


    this.state = {
      selectedOptions: [],
      options,
    };
  }

  handleSelect = (selectedOption) => {
    let { selectedOptions } = this.state;

    if (selectedOptions.includes(selectedOption)) {
      _.remove(selectedOptions, (option) => option === selectedOption);
    } else {
      selectedOptions.push(selectedOption);
    }

    this.setState({
      selectedOptions,
    });

    this.props.handleSelect(selectedOptions);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.options !== nextProps.options) {
      this.setState({ selectedOptions: [] });
    }
  }

  render() {
    const { 
      options,
    } = this.props;

    const RenderCheckBox = options.map((option, key) => (
      <CheckBoxItem
        key={key}
        {...this.props}
        multiple={true}
        value={option}
        selected={this.state.selectedOptions.includes(mapNumberToCharacter[key])}
        singleTap={() => this.handleSelect(mapNumberToCharacter[key])}
      />
    ));

    return (
      <View>
        {RenderCheckBox}
      </View>
    );
  }
}