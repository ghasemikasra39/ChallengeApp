import React, {useState, useEffect, useRef, useMemo} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Platform,
    ScrollView,
} from 'react-native';
import {DATA2} from '../../assets/data';
import Accordion from 'react-native-collapsible/Accordion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchInput from '../components/SearchInput';
import SelectedItemsList from '../components/selectedItemsList';
import {AppColors} from '../globals/AppColors';

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

    const openDropdown = () => {
        SearchInputView.current.measure((_fx, _fy, _w, h, _px, py) => {
            setDropdownTop(py + h);
        });
        setDropdownVisible(true);
    };

    const Dropdown = useMemo(() => {

        const renderItem = ({item}) => {
            const boldSection = item.firstname.substring(0, searchValue.length);
            const normalSection = item.firstname.substring(searchValue.length);
            const onItemPress = (item) => {
                setDropdownVisible(false);
                setSearchValue('');
                addItem(item);
            };
            return (
                <TouchableOpacity
                    style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14}}
                    onPress={() => onItemPress(item)}>
                    <Text style={{fontFamily: 'Inter-Regular', color: AppColors.gray, fontSize: 16}}><Text
                        style={{fontWeight: 'bold'}}>{boldSection}</Text>{normalSection}</Text>
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
    }, [dropdownData, dropdownTop, dropdownVisible, searchValue]);

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
                <Text style={{fontFamily: 'Inter-Regular', fontSize: 16, color: AppColors.textDark}}>{item.category}</Text>
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
                                backgroundColor: person.selected ? AppColors.blue : AppColors.backgroundLight,
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
                                color: person.selected ? AppColors.textLight : AppColors.textDark,
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
            <Header/>
            <SearchInput
                onChangeTextHander={onChangeTextHander}
                searchValue={searchValue}
                SearchInputViewRef={SearchInputView}
            />
            <SelectedItemsList removeItem={removeItem} selectedItems={selectedItems}/>
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: Platform.OS === 'ios' ? 100 : Platform.OS === 'web' ? 100 : 180,
                    paddingHorizontal: 13,
                    width: 320,
                    alignSelf: 'center',
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
                />
            </ScrollView>
            <Footer/>
            {Dropdown}
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
        shadowColor: AppColors.shadowColor,
        shadowRadius: 20,
        shadowOffset: {height: 10, width: 0},
        shadowOpacity: 0.5,
        borderRadius: 12,
    },
});
