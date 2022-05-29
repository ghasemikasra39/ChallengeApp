import React, {useState, useEffect, useRef} from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import {DATA2} from '../../assets/data';
import Accordion from 'react-native-collapsible/Accordion';

export default function HomeScreen(props) {
    const [searchValue, setSearchValue] = useState();
    const [rawData, setRawData] = useState(DATA2);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownTop, setDropdownTop] = useState(0);
    const [dropdownData, setDropdownData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [activeAccordionSections, setActiveAccordionSections] = useState([]);
    const SearchInputView = useRef();

    useEffect(() => {
        console.log('selectedItems: ', selectedItems);
        console.log('rawData: ', rawData);
    }, [selectedItems, rawData]);

    const toggleDropdown = () => {
        dropdownVisible ? setDropdownVisible(false) : openDropdown();
    };

    const openDropdown = () => {
        SearchInputView.current.measure((_fx, _fy, _w, h, _px, py) => {
            setDropdownTop(py + h);
        });
        setDropdownVisible(true);
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

        const renderItem = ({item}) => {
            const onItemPress = (item) => {
                console.log('tapped item: ', item);
                setSelectedItems(prevState => [...prevState, item]);
                setDropdownVisible(false);
                setSearchValue('');
                const rawDataUpdated = [];
                rawData.forEach(data => {
                    const updatedLaureates = data.laureates.map(person => (person.firstname === item.firstname) ? {
                        ...person,
                        selected: true,
                    } : person);
                    rawDataUpdated.push({...data, laureates: updatedLaureates});
                });
                setRawData(rawDataUpdated);
            };
            return (
                <TouchableOpacity
                    style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14}}
                    onPress={() => onItemPress(item)}>
                    <Text style={{fontFamily: 'Inter-Regular', color: '#334155', fontSize: 16}}>{item.firstname}</Text>
                    <Image
                        style={{width: 20, height: 20}}
                        source={require('../../assets/icons/plus.png')}
                    />
                </TouchableOpacity>
            );
        };

        if (dropdownVisible) {
            return (
                <TouchableOpacity
                    onPress={() => setDropdownVisible(false)}
                    style={[styles.dropdown, {top: dropdownTop}]}>
                    <FlatList
                        renderItem={renderItem}
                        data={dropdownData}
                        style={{
                            paddingVertical: 10,
                            paddingHorizontal: 24,
                        }}
                    />
                </TouchableOpacity>
            );
        } else {
            return <></>;
        }
    };

    const onChangeTextHander = enteredText => {
        setSearchValue(enteredText);
        let dataFiltered = [];
        rawData.forEach(data => {
            const res = data.laureates.filter(person =>
                person.firstname.toLowerCase().startsWith(enteredText.toLowerCase()) && !person.selected,
            );
            dataFiltered.push(...res);
        });

        const dataSorted = dataFiltered.sort((a, b) =>
            a.firstname.localeCompare(b.firstname),
        );
        setDropdownData(dataSorted);
        if (enteredText && dataSorted.length) {
            openDropdown();
        } else {
            setDropdownVisible(false);
        }
        console.log(dataSorted);
    };

    const renderSelectedItems = ({item}) => {
        const onRemoveItem = () => {
            // set Selected to false in the rawData
            const rawDataUpdated = [];
            rawData.forEach(data => {
                const updatedLaureates = data.laureates.map(person => (person.firstname === item.firstname) ? {
                    ...person,
                    selected: false,
                } : person);
                rawDataUpdated.push({...data, laureates: updatedLaureates});
            });
            setRawData(rawDataUpdated);

            // remove it from selectedItems
            const updatedSelectedItems = selectedItems.filter(person => {
                return person.firstname !== item.firstname;
            });
            setSelectedItems(updatedSelectedItems);
        };
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#334155',
                    height: 32,
                    borderRadius: 50,
                    marginRight: 8,
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                }}
                onPress={onRemoveItem}>
                <Text style={{fontFamily: 'Inter-Regular', fontSize: 14, color: '#F5F6FF'}}>{item.firstname}</Text>
                <Image
                    style={{width: 8, height: 8, marginLeft: 10}}
                    source={require('../../assets/icons/close.png')}
                />
            </TouchableOpacity>
        );
    };

    const renderAccordionHeader = (item, _, isActive) => {

        const icon = isActive ? require('../../assets/icons/up_4x.png') : require('../../assets/icons/down.png')
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>{item.category}</Text>
                <Image
                    style={{width: 20, height: 20}}
                    source={icon}
                />
            </View>
        );
    };

    const renderAccordionContent = (item, _, isActive) => {
        return (
            <Text>{item.year}</Text>
        );
    };

    const updateAccordionActiveSection = (sections) => {
        setActiveAccordionSections(sections.includes(undefined) ? [] : sections);
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
            <View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    style={{marginTop: 8}}
                    renderItem={renderSelectedItems}
                    data={selectedItems}
                    horizontal
                />
            </View>
            <Accordion
                sections={rawData}
                activeSections={activeAccordionSections}
                // renderSectionTitle={this._renderSectionTitle}
                renderHeader={renderAccordionHeader}
                renderContent={renderAccordionContent}
                onChange={updateAccordionActiveSection}
                touchableComponent={TouchableOpacity}
            />
            {renderDropdown()}
        </>
    );
}

const styles = StyleSheet.create({
    dropdown: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 4,
        backgroundColor: 'white',
        width: 326,
        maxHeight: 180,
        shadowColor: '#314252',
        shadowRadius: 20,
        shadowOffset: {height: 10, width: 0},
        shadowOpacity: 0.5,
        borderRadius: 12,
        // paddingVertical: 10,
        // paddingHorizontal: 24,
    },
});
