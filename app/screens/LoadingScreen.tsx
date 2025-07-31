import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"

const spaceProgramLogo = require("@assets/images/space-program-logo.png")

export const LoadingScreen =
  function LoadingScreen() {
    const { themed } = useAppTheme()
    return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        <Image style={themed($spaceLogo)} source={spaceProgramLogo} resizeMode="contain" />
        <Text
          style={themed($loadingText)}
          tx="app:title"
          preset="heading"
        />
        <Text style={themed($loadingText)} tx="LoadingScreen:loading" preset="subheading" />
      </View>
    </Screen>
    )
  }


const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexGrow: 1,
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
})

const $spaceLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 88,
  width: "100%",
  marginBottom: spacing.md,
})

const $loadingText: ThemedStyle<TextStyle> = () => ({
  alignSelf: 'center',
})
