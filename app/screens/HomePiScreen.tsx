import { FC, useEffect } from "react"
import { Image, ImageStyle, ScrollView, TextStyle, useWindowDimensions, View, ViewStyle } from "react-native"
import * as Progress from 'react-native-progress';

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { HomeTabScreenProps } from "@/navigators/HomeNavigator"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"
import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { startPiPolling, stopPiPolling, usePiStore } from '@/services/store/usePiStore'
import { formatDate } from "@/utils/formatDate"
import { spacing } from "@/theme/spacing";

const spaceProgramLogo = require("@assets/images/space-program-logo.png")

export const HomePiScreen: FC<HomeTabScreenProps<"HomePi">> =
  function HomePiScreen(_props) {
    const { themed,theme } = useAppTheme()
    const pi = usePiStore((s) => s.pi)
    const reset = usePiStore((s) => s.reset)
    const pause = usePiStore((s) => s.pause)
    const resume = usePiStore((s) => s.resume)
    const fetchPi = usePiStore((s) => s.fetchPi)
    const isLoading = usePiStore((s) => s.loading)
    const { width } = useWindowDimensions();

    useEffect(() => {
      fetchPi()
      startPiPolling()
      return () => stopPiPolling()
    }, [])

    return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        <Image style={themed($appLogo)} source={spaceProgramLogo} resizeMode="contain" />
        <Text
          style={themed($titleHeading)}
          tx="app:title"
          preset="heading"
        />
        <Text style={themed($subHeading)} tx="calculationScreen:piCalculation" preset="subheading" />
        <View style={themed($scrollContainer)}>
          <ScrollView 
            contentContainerStyle={themed($scrollContent)}
            showsHorizontalScrollIndicator={false}
          >
            <Text style={themed($scrollText)} text={`${pi?.value}`} preset="subheading" />
          </ScrollView>
        </View>
        {isLoading && <Progress.Bar indeterminate={true} color={theme.colors.tint} width={width - theme.spacing.xxl} height={12}/> }
        <Text style={themed([$centerText, {paddingTop: spacing.md}])} tx="calculationScreen:calculated" txOptions={{digit: pi?.digits}} preset="default" />
        <Text style={themed($centerText)} tx="calculationScreen:lastUpdated" txOptions={{date: formatDate(pi?.updatedAt ?? (new Date(0).toISOString()), 'yyyy-MM-dd HH:mm:ss')}} preset="default" />
        <View style={themed($buttonContainer)}>

          <Button 
            style={themed([$controlButton, {marginRight: spacing.md}])}  
            RightAccessory={(props) => (
              <Icon containerStyle={props.style} icon="caretRight" />
            )}
            onPress={()=>{resume()}} 
            tx="calculationScreen:resume"
          />
          <Button 
            style={themed($controlButton)}  
            RightAccessory={(props) => (
              <Icon containerStyle={props.style} icon="lock" />
            )}
            onPress={()=>{pause()}} 
            tx="calculationScreen:pause"
          />
            
        </View>

        <Button 
          style={themed({marginTop: spacing.md})}
          RightAccessory={(props) => (
            <Icon containerStyle={props.style} icon="x" />
          )}
          onPress={()=>{reset()}} 
          tx="calculationScreen:reset"
        />
      </View>

    </Screen>
    )
  }


const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
})

const $buttonContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xl,
  flexDirection: 'row',
  justifyContent: "space-between"
})

const $controlButton: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $appLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  marginTop: spacing.xxxl,
  height: 88,
  width: "100%",
  marginBottom: spacing.md,
})


const $titleHeading: ThemedStyle<TextStyle> = () => ({
  alignSelf: 'center',
})

const $subHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  alignSelf: 'center',
  marginBottom: spacing.md,
})

const $centerText: ThemedStyle<TextStyle> = () => ({
  alignSelf: 'center',
})

const $scrollContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  height: 200,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
  marginVertical: spacing.md,
  backgroundColor: colors.background,
  borderRadius: spacing.xs,
  borderWidth: 1,
  borderColor: colors.textDim,
})

const $scrollContent: ThemedStyle<ViewStyle> = () => ({
  flexGrow: 1,
})

const $scrollText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
  fontSize: 16,
  lineHeight: 24,
})
