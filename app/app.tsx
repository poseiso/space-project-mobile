import { useEffect, useState } from "react"
import { useFonts } from "expo-font"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"

import { initI18n } from "./i18n"
import { AppNavigator } from "./navigators/AppNavigator"
import { useNavigationPersistence } from "./navigators/navigationUtilities"
import { ThemeProvider } from "./theme/context"
import { customFontsToLoad } from "./theme/typography"
import { loadDateFnsLocale } from "./utils/formatDate"
import * as storage from "./utils/storage"
import { LoadingScreen } from "./screens/LoadingScreen"

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

export function App() {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  // Wait for initial app state init
  if (!isRestored || !isI18nInitialized || (!areFontsLoaded && !fontLoadError)) {
    return (
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ThemeProvider>
          <LoadingScreen/>
        </ThemeProvider>
      </SafeAreaProvider>
    )
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <KeyboardProvider>
          <ThemeProvider>
            <AppNavigator
              initialState={initialNavigationState}
              onStateChange={onNavigationStateChange}
            />
          </ThemeProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  )
}
