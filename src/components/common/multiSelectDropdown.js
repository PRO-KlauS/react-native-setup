import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { colors, spacing, fonts } from "../../styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import Ripple from "react-native-material-ripple";

const MultiSelectDropdown = ({
  onSelectedItemsChange,
  options,
  selectText,
  selectedItems,
  showError,
  error,
  disabled,
  uniqueKey,
  subKey,
  displayKey,
  showCancelButton,
  hideSearch,
  hideConfirmButton,
  headerText,
  maxHeight,
}) => {
  const dropdownRef = useRef(null);
  return (
    <>
      <SectionedMultiSelect
        ref={dropdownRef}
        items={options}
        uniqueKey={uniqueKey || "id"}
        subKey={subKey || "children"}
        selectText={selectText}
        showDropDowns={false}
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        IconRenderer={Icon}
        displayKey={displayKey || "name"}
        showCancelButton={showCancelButton}
        hideSearch={hideSearch}
        modalAnimationType="slide"
        hideConfirm={hideConfirmButton}
        disabled={disabled}
        styles={{
          container: { ...styles.container, maxHeight: maxHeight || 300 },
          item: styles.item,
          itemText: styles.itemText,
          modalWrapper: styles.modalWrapper,
          separator: styles.separator,
          selectToggleText: [
            styles.selectToggleText,
            { color: showError && error ? colors.textRed : colors.textGray },
          ],
          selectToggle: {
            borderBottomColor:
              showError && error ? colors.borderRed : colors.borderGray,
            borderBottomWidth: 1,
            paddingBottom: 4,
          },
          selectedItemText: styles.selectedItemText,
          chipContainer: styles.chipContainer,
          chipText: styles.chipText,
          chipIcon: styles.chipIcon,
        }}
        modalWithTouchable={true}
        animateDropDowns={false}
        headerComponent={
          <View style={styles.headerParent}>
            <Text style={styles.headerText}>{headerText || selectText}</Text>
            <Ripple
              rippleContainerBorderRadius={30}
              rippleColor={colors.backGroundWhite}
              style={styles.iconRipple}
              onPress={() =>
                dropdownRef &&
                dropdownRef.current &&
                dropdownRef.current._toggleSelector()
              }
            >
              <Icon name="close" style={styles.closeIcon} />
            </Ripple>
          </View>
        }
      />
      {showError && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  parentView: {
    margin: spacing.sm,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: spacing.lg,
    borderColor: colors.borderGray,
    borderBottomWidth: 1,
    padding: 0,
    height: 40,
  },
  errorText: {
    alignSelf: "flex-start",
    color: colors.textRed,
    fontSize: fonts.sizeMD,
    lineHeight: 20,
  },
  container: {
    backgroundColor: colors.backgroundDarkGray,
  },
  item: {
    backgroundColor: colors.backgroundDarkGray,
    paddingBottom: 10,
    paddingTop: 10,
  },
  itemText: {
    color: colors.textGray,
    fontSize: fonts.sizeXL,
    fontWeight: fonts.weightNormal,
  },
  selectToggleText: {
    color: colors.textGray,
    fontSize: fonts.sizeXL,
    paddingLeft: 8,
  },
  selectedItemText: {
    color: colors.textGray,
    fontSize: fonts.sizeXL,
    fontWeight: fonts.weightNormal,
  },
  modalWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    backgroundColor: colors.borderGray,
  },
  chipText: { color: colors.textWhite, fontSize: fonts.sizeXL },
  chipIcon: {
    color: colors.iconPrimary,
    fontSize: 20,
    backgroundColor: "white",
    borderRadius: 20,
  },
  chipContainer: {
    backgroundColor: colors.backgroundPrimary,
    borderWidth: 0,
    marginTop: 20,
  },
  headerParent: {
    minHeight: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: colors.borderGray,
    borderBottomWidth: 1,
    padding: 10,
    position: "relative",
  },
  headerText: {
    color: colors.textWhite,
    fontSize: fonts.sizeXXL,
    textAlignVertical: "center",
    fontWeight: fonts.weight600,
    marginRight: 30,
  },
  iconRipple: {
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 5,
    top: 5,
  },
  closeIcon: { fontSize: 24, textAlignVertical: "center" },
});

export default MultiSelectDropdown;
