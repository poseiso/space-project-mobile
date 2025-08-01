import { FC, useState } from "react"
import * as Progress from 'react-native-progress';
import {
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
  Image,
  useWindowDimensions,
} from "react-native"
import { type ContentStyle } from "@shopify/flash-list"

import { Card } from "@/components/Card"
import { ListView } from "@/components/ListView"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { Switch } from "@/components/Toggle/Switch"
import { translate } from "@/i18n/translate"
import { HomeTabScreenProps } from "@/navigators/HomeNavigator"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"
import { usePiStore } from "@/services/store/usePiStore"
import { formatDate } from "@/utils/formatDate"
import { getCircumference } from "@/utils/solarSystem"

const marsIcon = require("@assets/images/mars.png")
const earthIcon = require("@assets/images/earth.png")
const sunIcon = require("@assets/images/sun.png")

type Planet = {
  name: string
  radiusKm: number
  image: any
}

const PLANETS: Planet[] = [
  {
    name: "Sun",
    radiusKm: 696_340,
    image: sunIcon,
  },
  {
    name: "Earth",
    radiusKm: 6_371,
    image: earthIcon,
  },
  {
    name: "Mars",
    radiusKm: 3_389.5,
    image: marsIcon,
  },
]


export const HomePlanetScreen: FC<HomeTabScreenProps<"HomePlanet">> = (_props) => {
  const { themed,theme } = useAppTheme()
  const [unit, setUnit] = useState<"km" | "mi">("km")
  const { width } = useWindowDimensions();
  const pi = usePiStore((s) => s.pi)
  const isLoading = usePiStore((s) => s.loading)
  const fetchPi = usePiStore((s) => s.fetchPi)
  const maxCircumference = Math.max(
    ...PLANETS.map(p => getCircumference(p.radiusKm, pi?.value ?? '3.1', unit))
  )
  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$styles.flex1}>
      <ListView<Planet>
        contentContainerStyle={themed([$styles.container, $listContentContainer])}
        data={PLANETS}
        extraData={[unit,pi]}
        refreshing={isLoading}
        estimatedItemSize={3}
        onRefresh={()=>fetchPi()}
        ListHeaderComponent={
          <View style={themed($heading)}>
            <Text preset="heading" tx="planetScreen:title" />
              <View style={themed($toggle)}>
                <Switch
                  value={unit === "mi"}
                  onValueChange={() => setUnit(unit === "km" ? "mi" : "km")}
                  labelTx="planetScreen:togleMeasurement"
                  labelPosition="left"
                  labelStyle={$labelStyle}
                />
              </View>
              <View style={themed({ marginTop: theme.spacing.xl })}>
                {PLANETS.map((planet) => {
                  const circumference = getCircumference(planet.radiusKm, pi?.value ?? '3.14', unit)
                  const progress = circumference / maxCircumference
                  const formatted = Intl.NumberFormat().format(circumference)
              
                  return (
                    <View key={planet.name} style={themed({ marginBottom: theme.spacing.sm })}>
                      <Text
                        text={`${planet.name}: ${formatted} ${unit}`}
                        style={themed({ marginBottom: theme.spacing.xxs })}
                        preset="formLabel"
                      />
                      <Progress.Bar
                        progress={progress}
                        color={theme.colors.tint}
                        width={width - theme.spacing.xxl}
                        height={12}
                      />
                    </View>
                  )
                })}
              </View>
          </View>
        }
        renderItem={({ item }) => (
          <PlanetCard planet={item} pi={pi?.value ?? '3.1'} unit={unit} updatedAt={pi?.updatedAt ?? new Date(0).toISOString()}/>
        )}
      />
    </Screen>
  )
}

const PlanetCard = ({
  planet,
  pi,
  unit,
  updatedAt,
}: {
  planet: Planet
  pi: string
  unit: "km" | "mi"
  updatedAt: string
}) => {
  const { themed } = useAppTheme()
  const value = getCircumference(planet.radiusKm, pi, unit)
  const formatted = Intl.NumberFormat().format(value)

  return (
    <Card
      style={themed($item)}
      verticalAlignment="force-footer-bottom"
      HeadingComponent={
        <Text style={themed({})} text={`${planet.name}: ${formatted} ${unit}`} preset="subheading" />
      }
      LeftComponent={
        <Image source={planet.image} style={themed([$itemThumbnail])} resizeMode="contain"/>
      }
      FooterComponent={
        <>
          <Text
            style={themed($metadataText)}
            tx="calculationScreen:lastUpdated"
            txOptions={{date: ''}}
            preset="default"
          />
          <Text
            style={themed($metadataText)}
            text={formatDate(updatedAt ?? (new Date(0).toISOString()), 'yyyy-MM-dd HH:mm:ss')}
            preset="default"
          />
        </>
      }
    />
  )
}

// #region Styles
const $listContentContainer: ThemedStyle<ContentStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.lg,
})

const $heading: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $item: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  padding: spacing.md,
  marginTop: spacing.md,
  minHeight: 120,
  backgroundColor: colors.palette.neutral100,
})

const $itemThumbnail: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  marginTop: spacing.sm,
  width: 80,
  height: 80,
  borderRadius: 50,
  alignSelf: "center",
})

const $toggle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
})

const $labelStyle: TextStyle = {
  textAlign: "left",
}

const $metadataText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  marginEnd: spacing.md,
  marginBottom: spacing.xs,
})

