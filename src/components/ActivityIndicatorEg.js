import React from 'react';
import {COLOURS} from '../database/items'
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const ActivityIndicatorEg = () => (
    <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="small" color = {COLOURS.lightGray} />
        <ActivityIndicator size="large" color={COLOURS.accentRed} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});

export default ActivityIndicatorEg;