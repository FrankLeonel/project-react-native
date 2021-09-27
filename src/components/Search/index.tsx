import React from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { colors } from '../../style';

type Props = {
  value: any;
  onChange: (text: string) => void;
};

const Search = ({ value, onChange }: Props) => {
  return (
    <SearchBar
      lightTheme
      round
      containerStyle={styles.searchcontainer}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.inputSearch}
      placeholderTextColor={colors.white}
      placeholder="Procure um filme..."
      searchIcon={{ name: 'search', color: colors.white, size: 24 }}
      clearIcon={{ name: 'clear', color: colors.white, size: 24 }}
      onClear={() => Keyboard.dismiss()}
      value={value}
      onChangeText={text => onChange(text)}
    />
  );
};

const styles = StyleSheet.create({
  searchcontainer: {
    backgroundColor: colors.bodyBackgroundColor,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  inputContainer: {
    backgroundColor: colors.bodyBackgroundColor,
    borderColor: colors.white,
    borderWidth: 1,
    borderBottomWidth: 1,
    color: colors.white,
  },
  inputSearch: {
    color: colors.white,
    fontSize: 16,
  },
  searchButton: {
    color: colors.white,
  },
});

export default Search;
