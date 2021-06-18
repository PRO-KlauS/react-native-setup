import React from 'react';
import { Loader, NoContent } from '../index';
import { StyleSheet } from 'react-native';

const Footer = ({ data, listEndLoading, message }) => {
  return listEndLoading ? (
    <Loader
      hasLoaderText={false}
      hasLoader={true}
      animationStyle={styles.loader}
    />
  ) : (
    data && data.length === 0 && <NoContent message={message} />
  );
};
const styles = StyleSheet.create({
  loader: {
    height: 50,
    width: 50,
  },
});

export default Footer;
