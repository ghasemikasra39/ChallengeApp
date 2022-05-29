import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function HomeScreen(props) {
  const [searchValue, setSearchValue] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const SearchInputView = useRef();

  const toggleDropdown = () => {
    console.log('toggle dropdown');
    modalVisible ? setModalVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    SearchInputView.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setModalVisible(true);
  };

  const renderDropdown = () => {
    // const renderSectionHeader = ({section: {title}}) => {
    //     return (
    //         <View style={{alignItems: "center"}}>
    //             <View style={styles.divider} />
    //             <View style={{paddingVertical: 7}}>
    //                 <Text style={AppStyles.title}>{title}</Text>
    //             </View>
    //         </View>
    //     )
    // }
    //
    // const renderItem = ({item}) => {
    //     return (
    //         <TouchableOpacity
    //             onPress={() => {
    //                 onItemPress(item)
    //             }}
    //             style={styles.itemContainer}>
    //             <View style={{paddingHorizontal: 15}}>
    //                 <View style={styles.avatarTouchable}>
    //                     <FastImage
    //                         style={styles.avatarImage}
    //                         source={{uri: item.imageUrl}}
    //                     />
    //                 </View>
    //             </View>
    //             <View style={{justifyContent: "center"}}>
    //                 <Text style={styles.itemText}>{item.title}</Text>
    //             </View>
    //         </TouchableOpacity>
    //     )
    // }
    //
    // const renderMenu = (userChallenges, challengeData) => {
    //     let userChallengesClone = [...userChallenges]
    //     userChallengesClone.unshift(Global.globalChallenge)
    //     const challengeDataClone = [...challengeData]
    //     const userChallengesWithTitle = {
    //         title: "MEINE GRUPPEN",
    //         data: userChallengesClone,
    //     }
    //     const nearChallengesWithTitle = {
    //         title: "VORSCHLÄGE",
    //         data: challengeDataClone,
    //     }
    //     let DATA = [userChallengesWithTitle, nearChallengesWithTitle]
    //     if (challengeDataClone.length < 1) {
    //         DATA = [userChallengesWithTitle]
    //     }
    //
    //     return (
    //         <View>
    //             <SectionList
    //                 sections={DATA}
    //                 keyExtractor={(item, index) => item + index}
    //                 renderItem={renderItem}
    //                 renderSectionHeader={renderSectionHeader}
    //                 style={{maxHeight: height / 2}}
    //             />
    //             {renderCreateNewGroup()}
    //         </View>
    //     )
    // }
    //
    // const renderInfo = () => {
    //     if (!activeChallenge) {
    //         return (
    //             <View style={styles.noChallengeText}>
    //                 <Text style={styles.itemText}>Wähle bitte eine Gruppe aus</Text>
    //             </View>
    //         )
    //     }
    //
    //     const {participants, description} = activeChallenge
    //     const FACES = participants.map(participant => {
    //         return {
    //             ...participant,
    //             id: participant.userId,
    //             imageUrl: participant.profilePictureUrl,
    //         }
    //     })
    //     const membersText = `${
    //         !activeChallenge.title ? "über 150.000" : participants.length
    //     } Teilnehmer`
    //
    //     return (
    //         <View style={styles.infoContainer}>
    //             <View style={styles.facePileContainer}>
    //                 <View style={{marginRight: 15}}>
    //                     <Text style={styles.itemText}>{membersText}</Text>
    //                 </View>
    //                 <FacePile numFaces={5} faces={FACES} />
    //             </View>
    //             <View>
    //                 <Text style={styles.itemText}>{description}</Text>
    //             </View>
    //         </View>
    //     )
    // }
    //
    // const Loading = (
    //     <View style={styles.loadingText}>
    //         <Text style={styles.itemText}>Lädt...</Text>
    //     </View>
    // )

    if (modalVisible) {
      return (
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={[styles.dropdown, {top: dropdownTop}]}>
          <Text>The list will go here</Text>
        </TouchableOpacity>
      );
    } else {
      return <></>;
    }
  };

  const onChangeTextHander = value => {
    setSearchValue(value);
  };

  return (
    <>
      <Text
        style={{
          fontFamily: 'Inter-Regular',
          fontSize: 30,
          color: '#334155',
          paddingBottom: 8,
        }}>
        Category
      </Text>
      <Text
        style={{fontFamily: 'Inter-Regular', fontSize: 14, color: '#94A3B8'}}>
        Choose a topic best describes you
      </Text>
      <View
        ref={SearchInputView}
        onPress={toggleDropdown}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'center',
          backgroundColor: '#F0F2F4',
          width: 327,
          height: 56,
          borderRadius: 50,
          marginTop: 32,
        }}>
        <View style={{justifyContent: 'center', paddingLeft: 17}}>
          <Image
            onLoadEnd={toggleDropdown}
            style={{width: 20, height: 20}}
            source={require('../../assets/icons/search-normal_4x.png')}
          />
        </View>
        <View style={{justifyContent: 'center', width: 200}}>
          <TextInput
            style={{
              color: '#94A3B8',
              fontFamily: 'Inter-Regular',
              fontSize: 16,
            }}
            maxLength={20}
            onChangeText={onChangeTextHander}
            value={searchValue}
            placeholder="Type to search"
          />
        </View>
        <View style={{justifyContent: 'center'}}>
          <Image
            style={{width: 56, height: 56}}
            source={require('../../assets/icons/Group_4x.png')}
          />
        </View>
      </View>
      {renderDropdown()}
    </>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 4,
    backgroundColor: 'red',
    width: 326,
    maxHeight: 180,
    shadowColor: '#314252',
    shadowRadius: 20,
    shadowOffset: {height: 10, width: 0},
    shadowOpacity: 0.5,
    borderRadius: 12,
  },
});
