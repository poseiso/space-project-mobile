import { ForwardedRef, forwardRef, PropsWithoutRef, ReactElement, RefObject } from "react"
import { FlatList } from "react-native"
import { FlashList, FlashListProps } from "@shopify/flash-list/src"



export type ListViewRef<T> = FlashList<T> | FlatList<T>

export type ListViewProps<T> = PropsWithoutRef<FlashListProps<T>>

const ListViewComponent = forwardRef(
  <T,>(props: ListViewProps<T>, ref: ForwardedRef<ListViewRef<T>>) => {
    const ListComponentWrapper = false ? FlatList : FlashList

    return <ListComponentWrapper {...props} ref={ref} />
  },
)

ListViewComponent.displayName = "ListView"

export const ListView = ListViewComponent as <T>(
  props: ListViewProps<T> & {
    ref?: RefObject<ListViewRef<T> | null>
  },
) => ReactElement
