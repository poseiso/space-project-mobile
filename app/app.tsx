import { KeyboardProvider } from "react-native-keyboard-controller"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import {Text} from "react-native"


export function App() {

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <KeyboardProvider>
        <Text/>
      </KeyboardProvider>
    </SafeAreaProvider>
  )
}
