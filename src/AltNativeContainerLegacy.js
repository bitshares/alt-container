/*eslint-disable*/
/**
 * AltNativeContainer.
 *
 * @see AltContainer
 */
import React from 'react-native'
import mixinContainer from './mixinContainer'
import assign from 'object.assign'
import createReactClass from 'create-react-class'

React.cre

const AltNativeContainer = createReactClass(assign({
  displayName: 'AltNativeContainer',
  mixins: [mixinContainer(React)],

  render() {
    return this.altRender(React.View)
  }
}))

export default AltNativeContainer
