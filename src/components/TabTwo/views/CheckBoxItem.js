import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import px2dp from '../../../util/';

const ios_blue = '#007AFF';

export default class SelectMultipleButton extends Component {

  static propTypes = {
    multiple: PropTypes.bool,

    selected: PropTypes.bool,

    value: PropTypes.oneOfType(
      [
        PropTypes.string,
        PropTypes.number
      ]
    ).isRequired,
    displayValue: PropTypes.oneOfType(
      [
        PropTypes.string,
        PropTypes.number
      ]
    ),

    highLightStyle: PropTypes.shape({
      borderColor: PropTypes.string.isRequired,
      backgroundColor: PropTypes.string.isRequired,
      textColor: PropTypes.string.isRequired,
      borderTintColor: PropTypes.string.isRequired,
      backgroundTintColor: PropTypes.string.isRequired,
      textTintColor: PropTypes.string.isRequired,
    }),

    buttonViewStyle: PropTypes.object,
    textStyle: PropTypes.object,
    singleTap: PropTypes.func,

  }

  static defaultProps = {
    selected: false,
    multiple: true,
    highLightStyle: {
      borderColor: 'gray',
      backgroundColor: 'transparent',
      textColor: 'gray',
      borderTintColor: ios_blue,
      backgroundTintColor: 'transparent',
      textTintColor: ios_blue,
    },

    singleTap: (valueTap) => { },
  }

  selectedColor = ['#FF0467', '#FC7437'];
  unSelectedColor = ['#DFD9D9', '#DFD9D9'];

  constructor(props) {
    super(props)
    this.state = {
      selected: false,
    }
  }

  componentDidMount() {
    this.setState({
      selected: this.props.selected,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected) {
      this.setState({
        selected: nextProps.selected
      })
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          if (this.props.multiple) {
            this.setState({ selected: !this.state.selected })
            this.props.singleTap(this.props.value)
          } else {
            if (!this.state.selected) {
              this.setState({ selected: !this.state.selected })
              this.props.singleTap(this.props.value)
            }
          }
          }
        }>
        <LinearGradient
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
          colors={
            this.state.selected 
            ? this.selectedColor
            : this.unSelectedColor
          }
          style={[styles.linearGradient, styles.addMarginBottom]}>
            <View style={styles.selectItem}>
              <Text style={styles.selectItemText}>{this.props.displayValue === undefined ? this.props.value : this.props.displayValue}</Text>
            </View>
        </LinearGradient>
      </TouchableOpacity >
    )
  }
}

const styles = StyleSheet.create({
  selectItemText: {
    fontFamily: 'PingFangSC-Light',
    fontSize: px2dp(20),
    marginLeft: px2dp(10),
    color: '#655757',
  },
  selectItem: {
    width: px2dp(300),
    borderRadius: px2dp(7),
    backgroundColor: '#FFF',
    justifyContent: 'center',
    paddingLeft: px2dp(12),
    paddingRight: px2dp(12),
    paddingTop: px2dp(8),
    paddingBottom: px2dp(8),
  },
  linearGradient: {
    width: px2dp(302),
    borderRadius: px2dp(8),
    paddingBottom: px2dp(1),
    paddingTop: px2dp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMarginBottom: {
    marginBottom: px2dp(20),
  },
})