import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { InformationDay } from '../../service';
import { colors } from '../../style';

type Props = {
  informationDay: InformationDay;
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  textTitle: {
    fontSize: 20,
    color: colors.white,
    fontWeight: 'bold',
  },
  containerSession: {
    flexDirection: 'row',
  },
  containerTime: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  textTime: {
    color: colors.white,
    marginHorizontal: 10,
  },
  textType: {
    backgroundColor: colors.white,
    color: colors.bodyBackgroundColor,
    borderRadius: 8,
    marginLeft: 2,
    width: 60,
    textAlign: 'center',
  },
});

const InformationDayList = ({ informationDay }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>{informationDay.name}</Text>
      {informationDay.rooms.map(room =>
        room.sessions.map((session, sessionId) => (
          <View style={styles.containerSession}>
            <Text style={styles.textTime} key={sessionId}>
              {session.time}
              {'     '}
            </Text>
            <View style={styles.containerTime}>
              {session.types.map((type, typeId) => (
                <Text style={styles.textType} key={typeId}>
                  {type.alias}{' '}
                </Text>
              ))}
            </View>
          </View>
        )),
      )}

      {/* {console.log(
        sessions.map(session => console.log(session.id + ' ' + session.time)),
      )} */}
      {/* {sessions.map(session => (
        <Text>{session.time}</Text>
      ))} */}
    </View>
  );
};

export default InformationDayList;
