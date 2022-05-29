import React, {useState, useEffect, useRef} from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Platform,
    ScrollView,
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

        const renderItem = ({item}) => {
            const onItemPress = (item) => {
                setDropdownVisible(false);
                setSearchValue('');
                addItem(item);
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

    const addItem = (itemToAdd) => {
        setSelectedItems(prevState => [...prevState, itemToAdd]);
        const rawDataUpdated = [];
        rawData.forEach(data => {
            const updatedLaureates = data.laureates.map(person => (person.firstname === itemToAdd.firstname) ? {
                ...person,
                selected: true,
            } : person);
            rawDataUpdated.push({...data, laureates: updatedLaureates});
        });
        setRawData(rawDataUpdated);
    };

    const removeItem = (itemToRemove) => {
        const rawDataUpdated = [];
        rawData.forEach(data => {
            const updatedLaureates = data.laureates.map(person => (person.firstname === itemToRemove.firstname) ? {
                ...person,
                selected: false,
            } : person);
            rawDataUpdated.push({...data, laureates: updatedLaureates});
        });
        setRawData(rawDataUpdated);

        const updatedSelectedItems = selectedItems.filter(person => {
            return person.firstname !== itemToRemove.firstname;
        });
        setSelectedItems(updatedSelectedItems);
    };

    const renderSelectedItems = ({item}) => {
        const onRemoveItem = () => {
            removeItem(item);
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

        const icon = isActive ? require('../../assets/icons/up_4x.png') : require('../../assets/icons/down.png');
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 44,
                alignItems: 'center',
                marginVertical: 15,
            }}>
                <Text style={{fontFamily: 'Inter-Regular', fontSize: 16, color: '#1E293B'}}>{item.category}</Text>
                <Image
                    style={{width: 20, height: 20}}
                    source={icon}
                />
            </View>
        );
    };

    const renderAccordionContent = (categoryItem, _, isActive) => {
        const onItemPress = (person) => {
            if (person.selected) {
                removeItem(person);
            } else {
                addItem(person);
            }
        };

        return (
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {categoryItem.laureates.map(person => {
                    return (
                        <TouchableOpacity
                            key={person.firstname}
                            onPress={() => onItemPress(person)}
                            style={{
                                backgroundColor: person.selected ? '#040FD9' : '#F0F2F4',
                                borderRadius: 50,
                                height: 44,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginHorizontal: 4,
                                marginVertical: 4,
                            }}>
                            <Text style={{
                                fontFamily: 'Inter-Regular',
                                fontSize: 16,
                                color: person.selected ? '#F5F6FF' : '#1E293B',
                            }}>{person.firstname}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
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
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: Platform.OS === 'ios' ? 100 : Platform.OS === 'web' ? 100 : 180
                }}
                showsVerticalScrollIndicator={false}
            >
                <Accordion
                    sections={rawData}
                    activeSections={activeAccordionSections}
                    renderHeader={renderAccordionHeader}
                    renderContent={renderAccordionContent}
                    onChange={updateAccordionActiveSection}
                    touchableComponent={TouchableOpacity}
                    // renderAsFlatList={true}
                    // containerStyle={{marginBottom: Platform.OS === 'ios' ? 100 : Platform.OS === 'web' ? 40 : 100}}
                />
            </ScrollView>
            <View
                style={{
                    position: 'absolute',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    bottom: 0,
                    paddingBottom: Platform.OS === 'ios' ? 40 : Platform.OS === 'web' ? 20 : 100,
                    left: 0,
                    right: 0,
                    borderTopColor: '#F0F2F4',
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    paddingTop: 16,
                    paddingHorizontal: 24,
                }}
            >
                <TouchableOpacity
                    onPress={() => console.log('go back')}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#F0F2F4',
                        borderRadius: 12,
                        width: 81,
                        height: 44,
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                    }}>
                    <Text style={{
                        fontFamily: 'Inter-Regular',
                        fontSize: 14,
                        color: '#1E293B',
                    }}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => console.log('Continue')}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#040FD9',
                        borderRadius: 12,
                        width: 109,
                        height: 44,
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                    }}>
                    <Text style={{
                        fontFamily: 'Inter-Regular',
                        fontSize: 14,
                        color: '#FFFFFF',
                    }}>Continue</Text>
                </TouchableOpacity>
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
