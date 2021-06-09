import compose from '../helpers/compose'
import withAvoidKeyboard from './withAvoidKeyboard'
import withKeyboardDismiss from './withKeyboardDismiss'

const withKeyboard = compose(withAvoidKeyboard, withKeyboardDismiss)

export default withKeyboard
