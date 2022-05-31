/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useState, useRef, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import {DATA, dataInterface, laureatesInterface} from '../../assets/data';
import Accordion from 'react-native-collapsible/Accordion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchInput from '../components/SearchInput';
import SelectedItemsList from '../components/selectedItemsList';
import {AppColors} from '../globals/AppColors';
import {AppStyles} from '../globals/AppStyles';
import {downArrow, plusIcon, upArrow} from '../globals/images';

const OnboardingScreen: FC = () => {
  const fadeAnim = useRef<any>(new Animated.Value(0)).current;
  const [searchValue, setSearchValue] = useState<string>('');
  const [rawData, setRawData] = useState<dataInterface[]>(DATA);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [dropdownTop, setDropdownTop] = useState<number>(0);
  const [dropdownData, setDropdownData] = useState<laureatesInterface[]>([]);
  const [selectedItems, setSelectedItems] = useState<laureatesInterface[]>([]);
  const [activeAccordionSections, setActiveAccordionSections] = useState<
    number[]
  >([]);
  const SearchInputView = useRef<View>();

  useEffect(() => {
    setTimeout(() => {
      SearchInputView.current.measure((_fx, _fy, _w, h, _px, py) => {
        console.log('py + h: ', py + h);
        setDropdownTop(py + h);
      });
    }, 500);
  }, []);

  const openDropdown = () => {
    setDropdownVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const closeDropdown = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start(() => {
      setDropdownVisible(false);
    });
  };

  const addItem = (itemToAdd: laureatesInterface) => {
    setSelectedItems(prevState => [...prevState, itemToAdd]);
    const rawDataUpdated: dataInterface[] = [];
    rawData.forEach(data => {
      const updatedLaureates = data.laureates.map(person =>
        person.firstname === itemToAdd.firstname
          ? {
              ...person,
              selected: true,
            }
          : person,
      );
      rawDataUpdated.push({...data, laureates: updatedLaureates});
    });
    setRawData(rawDataUpdated);
  };

  const Dropdown = useMemo(() => {
    const renderItem = ({item}: {item: laureatesInterface}) => {
      const boldSection = item.firstname.substring(0, searchValue.length);
      const normalSection = item.firstname.substring(searchValue.length);
      const onItemPress = (itemPressed: laureatesInterface) => {
        closeDropdown();
        setSearchValue('');
        addItem(itemPressed);
      };
      return (
        <TouchableOpacity
          style={styles.dropdownContainer}
          onPress={() => onItemPress(item)}>
          <Text style={styles.dropdownText}>
            <Text style={{fontWeight: 'bold'}}>{boldSection}</Text>
            {normalSection}
          </Text>
          <Image style={styles.dropdownImage} source={plusIcon} />
        </TouchableOpacity>
      );
    };

    if (dropdownVisible) {
      return (
        <TouchableOpacity>
          <FlatList
            renderItem={renderItem}
            data={dropdownData}
            style={styles.dropdownFlatList}
          />
        </TouchableOpacity>
      );
    } else {
      return <></>;
    }
  }, [addItem, dropdownData, dropdownVisible, searchValue.length]);

  const onChangeTextHandler = (enteredText: string) => {
    setSearchValue(enteredText);
    let dataFiltered: laureatesInterface[] = [];
    rawData.forEach(data => {
      const res = data.laureates.filter(
        person =>
          person.firstname
            .toLowerCase()
            .startsWith(enteredText.toLowerCase()) && !person.selected,
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
      closeDropdown();
    }
  };

  const removeItem = (itemToRemove: laureatesInterface) => {
    const rawDataUpdated: dataInterface[] = [];
    rawData.forEach(data => {
      const updatedLaureates = data.laureates.map(person =>
        person.firstname === itemToRemove.firstname
          ? {
              ...person,
              selected: false,
            }
          : person,
      );
      rawDataUpdated.push({...data, laureates: updatedLaureates});
    });
    setRawData(rawDataUpdated);

    const updatedSelectedItems = selectedItems.filter(person => {
      return person.firstname !== itemToRemove.firstname;
    });
    setSelectedItems(updatedSelectedItems);
  };

  const renderAccordionHeader = (
    item: dataInterface,
    _: number,
    isActive: boolean,
  ) => {
    const icon = isActive ? upArrow : downArrow;
    return (
      <View style={styles.accordionHeaderContainer}>
        <Text style={styles.accordionHeaderText}>{item.category}</Text>
        <Image style={styles.accordionHeaderImage} source={icon} />
      </View>
    );
  };

  const renderAccordionContent = (categoryItem: dataInterface) => {
    const onItemPress = (person: laureatesInterface) => {
      if (person.selected) {
        removeItem(person);
      } else {
        addItem(person);
      }
    };

    return (
      <View style={styles.accordionContentContainer}>
        {categoryItem.laureates.map(person => {
          return (
            <TouchableOpacity
              key={person.firstname}
              onPress={() => onItemPress(person)}
              style={[
                styles.accordionItemContainer,
                {
                  backgroundColor: person.selected
                    ? AppColors.blue
                    : AppColors.backgroundLight,
                },
              ]}>
              <Text
                style={[
                  styles.accordionItemText,
                  {
                    color: person.selected
                      ? AppColors.textLight
                      : AppColors.textDark,
                  },
                ]}>
                {person.firstname}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const updateAccordionActiveSection = (sections: number[]) => {
    setActiveAccordionSections(sections.includes(undefined) ? [] : sections);
  };

  return (
    <>
      <Header />
      <SearchInput
        onChangeTextHandler={onChangeTextHandler}
        searchValue={searchValue}
        SearchInputViewRef={SearchInputView}
      />
      <SelectedItemsList
        removeItem={removeItem}
        selectedItems={selectedItems}
      />
      <ScrollView
        contentContainerStyle={styles.scrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <Accordion
          sections={rawData}
          activeSections={activeAccordionSections}
          renderHeader={renderAccordionHeader}
          renderContent={renderAccordionContent}
          onChange={updateAccordionActiveSection}
          touchableComponent={TouchableOpacity}
        />
      </ScrollView>
      <Footer />
      <Animated.View
        style={[styles.dropdown, {top: dropdownTop, opacity: fadeAnim}]}>
        {Dropdown}
      </Animated.View>
    </>
  );
};

export default OnboardingScreen;

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
  scrollViewContentContainerStyle: {
    paddingBottom:
      Platform.OS === 'ios' ? 100 : Platform.OS === 'web' ? 100 : 180,
    paddingHorizontal: 13,
    width: 320,
    alignSelf: 'center',
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  dropdownFlatList: {
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  dropdownImage: {width: 20, height: 20},
  dropdownText: {
    fontFamily: AppStyles.fontFamily,
    color: AppColors.gray,
    fontSize: 16,
  },
  accordionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 44,
    alignItems: 'center',
    marginVertical: 15,
  },
  accordionHeaderText: {
    fontFamily: AppStyles.fontFamily,
    fontSize: 16,
    color: AppColors.textDark,
  },
  accordionHeaderImage: {width: 20, height: 20},
  accordionContentContainer: {flexDirection: 'row', flexWrap: 'wrap'},
  accordionItemContainer: {
    borderRadius: 50,
    height: 44,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  accordionItemText: {
    fontFamily: AppStyles.fontFamily,
    fontSize: 16,
  },
});
