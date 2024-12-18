import { useMultipleSelection, useSelect } from "downshift";

import { cn } from "@/lib/utils";

interface Item {
  id: string;
  [key: string]: any;
}

interface MultipleSelectProps<T extends Item> {
  items: T[];
  initialSelectedItems?: T[];
  displayKey?: string;
  secondaryDisplayKey?: string;
  placeholder?: string;
  onSelectionChange?: (selectedItems: T[]) => void;
}

export function Combobox<T extends Item>({
  items,
  initialSelectedItems = [],
  displayKey = "title",
  secondaryDisplayKey = "author",
  placeholder = "Pick items",
  onSelectionChange,
}: MultipleSelectProps<T>) {
  function getItemsFilter(selectedItems: T[]) {
    return function itemsFilter(item: T) {
      return selectedItems.indexOf(item) < 0;
    };
  }

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({
    initialSelectedItems,
    onSelectedItemsChange: ({ selectedItems }) => {
      onSelectionChange?.(selectedItems);
    },
  });

  const availableItems = items.filter(getItemsFilter(selectedItems));

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    selectedItem: null,
    defaultHighlightedIndex: 0,
    items: availableItems,
    stateReducer: (_state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
        case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true,
            highlightedIndex: 0,
          };
        default:
          return changes;
      }
    },
    onStateChange: ({ type, selectedItem: newSelectedItem }) => {
      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
        case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
        case useSelect.stateChangeTypes.ToggleButtonBlur:
          if (newSelectedItem) {
            addSelectedItem(newSelectedItem);
          }
          break;
        default:
          break;
      }
    },
  });

  return (
    <div className="relative">
      <div className="flex flex-col gap-1">
        <div className="shadow-sm rounded-md border border-input bg-transparent inline-flex gap-2 items-center flex-wrap p-1.5">
          {selectedItems.map((selectedItemForRender, index) => (
            <span
              className="bg-secondary rounded-md px-1 focus:bg-green-400"
              key={`selected-item-${selectedItemForRender.id}`}
              {...getSelectedItemProps({
                selectedItem: selectedItemForRender,
                index,
              })}
            >
              {selectedItemForRender[displayKey]}
              <span
                className="px-1 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  removeSelectedItem(selectedItemForRender);
                }}
              >
                &#10005;
              </span>
            </span>
          ))}
          <div
            className="px-2 py-1 outline-2 outline-gray-400 cursor-pointer focus:bg-gray-200"
            {...getToggleButtonProps(
              getDropdownProps({ preventKeyAction: isOpen })
            )}
          >
            {placeholder} &#8595;
          </div>
        </div>
      </div>
      <ul
        className={`absolute w-full bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${
          !(isOpen && availableItems.length) && "hidden"
        }`}
        {...getMenuProps()}
      >
        {isOpen &&
          availableItems.map((item, index) => (
            <li
              className={cn(
                highlightedIndex === index && "bg-blue-300",
                selectedItem === item && "font-bold",
                "py-2 px-3 shadow-sm flex flex-col cursor-pointer"
              )}
              key={`${item.id}`}
              {...getItemProps({ item, index })}
            >
              <span>{item[displayKey]}</span>
              {secondaryDisplayKey && item[secondaryDisplayKey] && (
                <span className="text-sm text-gray-700">
                  {item[secondaryDisplayKey]}
                </span>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
