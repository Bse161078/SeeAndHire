// import React from 'react'
// import { StyleSheet, View } from 'react-native'
 
// import LinkedInModal from 'react-native-linkedin'
 
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// })
 
// export default class LinkedIn extends React.Component {
//   linkedRef = React.createRef()
//   render() {
//     return (
//       <View style={styles.container}>
//         <LinkedInModal
//           ref={this.linkedRef}
//           clientID="78fi80ncb2wizm"
//           clientSecret="[ Your client secret from https://www.linkedin.com/developer/apps ]"
//           redirectUri="[ Your redirect uri set into https://www.linkedin.com/developer/apps ]"
//           onSuccess={token => console.log(token)}
//         />
//         <Button title="Log Out" onPress={this.linkedRef.current.logoutAsync()} />
//       </View>
//     )
//   }
// }