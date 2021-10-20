/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useEffect, useState}  from 'react';
 import type {Node} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   FlatList,
   Button,
   Alert,
 } from 'react-native';
 import {Linking} from 'react-native'
 
 // import {
 //   Colors,
 //   DebugInstructions,
 //   Header,
 //   LearnMoreLinks,
 //   ReloadInstructions,
 // } from 'react-native/Libraries/NewAppScreen';
 
 const Section = ({children, title}): Node => {
   const isDarkMode = useColorScheme() === 'dark';
   return (
     <View>
       <Text>
         {title}
       </Text>
       {/* <Text
         style={[
           styles.sectionTitle,
           {
             color: isDarkMode ? Colors.white : Colors.black,
           },
         ]}>
         {title}
       </Text> */}
       {/* <Text
         style={[
           styles.sectionDescription,
           {
             color: isDarkMode ? Colors.light : Colors.dark,
           },
         ]}>
         {children}
       </Text> */}
     </View>
   );
 };
 
 const App: () => Node = () => {
   // const isDarkMode = useColorScheme() === 'dark';
 
   // const backgroundStyle = {
   //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   // };
  //  Linking.openURL("https://www.google.com/");
  //  const [isLoading, setLoading] = useState(true);
  //  const [data, setData] = useState([]);
 
  //  useEffect(() => {
  //    fetch('https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json')
  //      .then((response) => response.json())
  //      .then((json) => setData(json))
  //      .catch((error) => console.error(error))
  //      .finally(() => setLoading(false));
  //  }, []);
 
   return (
     <SafeAreaView>
       {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
       <ScrollView>
         {/* contentInsetAdjustmentBehavior="automatic"
         style={backgroundStyle}> */}
         {/* <Header /> */}
         {/* <View
           style={{
             // backgroundColor: isDarkMode ? Colors.black : Colors.white,
           }}> */}
           {/* <Section title="Step One"> */}
             {/* Edit <Text style={styles.highlight}>App.js</Text> to change this */}
             {/* screen and then come back to see your edits. */}
           {/* </Section> */}
           {/* <Section title="See Your Changes"> */}
             {/* <ReloadInstructions /> */}
           {/* </Section> */}
           <Section title="">
           </Section>
           <Button
            title="Connect with reddit account"
            onPress={() => Linking.openURL("https://www.reddit.com/api/v1/authorize.compact?client_id=e3t0ixFSw5lrApAqVPrGMA&response_type=code&state=okok&redirect_uri=https://www.google.com&duration=temporary&scope=identity")}/>
           {/* <Section title="Learn More">
             Read the docs to discover what to do next:
           </Section> */}
           {/* <LearnMoreLinks /> */}
         {/* </View> */}
         {/* <GetMoviesFromApi /> */}
       </ScrollView>
       {/* <FlatList
             data={data.articles}
             keyExtractor={({ id }, index) => id}
             renderItem={({ item }) => (
               <Text>{item.id + '. ' + item.title}</Text>
             )}
           /> */}
     </SafeAreaView>
   );
 };
 
//  const styles = StyleSheet.create({
//    sectionContainer: {
//      marginTop: 32,
//      paddingHorizontal: 24,
//    },
//    sectionTitle: {
//      fontSize: 24,
//      fontWeight: '600',
//    },
//    sectionDescription: {
//      marginTop: 8,
//      fontSize: 18,
//      fontWeight: '400',
//    },
//    highlight: {
//      fontWeight: '700',
//    },
//  });
 
 export default App;

 