module.exports = {
  title: process.env.TITLE || 'Grouphub',
  serverPort: process.env.PORT || 9292,
  environment: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/picker',
  databaseTables: ['plans', 'users'],
  sessionSecret: 'pickerpicker',
  pokitdokClientId: 'ZzzUk4r9DMbV0F9xfuxG',
  pokitdokClientSecret: 'A1IsnMpkaQrqdSR9DTVOMQwCTswUMUOhaO69yLsP',
  //pokitdokClientId: 'RKH2S5iecrOcrGroqrx9',
  //pokitdokClientSecret: '1eEx7fl95Deqz0Y9w3StPfMT8oXoRS8XR4oU2xLH',
  betterDoctorKey: '5083d82035ac7aecb80c606723afaecb',
  fullcontactKey: 'a6810e0c84ec72d1',
  allscriptsName: 'Grouphub.GrouphubPicker.TestApp',
  allscriptsUser: 'Group-5438-GrouphubPi-test',
  allscriptsPassword: 'Gr!aph7bdR!9Ph6Bp#Cd%Rt1St@Pp7',
  allscriptsEhrEndpoint: 'http://tw1141ga.unitysandbox.com/Unity/UnityService.svc'
};

