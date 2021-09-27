import React from 'react';
import { View, Text } from 'react-native';
import { Sessions } from '../../service';

type Props = {
  session: Sessions;
};

const Session = ({ session }: Props) => {
  return (
    <View>
      <Text>{session.time}</Text>
      {/* <Text>{sessions.types}</Text> */}
    </View>
  );
};

export default Session;
