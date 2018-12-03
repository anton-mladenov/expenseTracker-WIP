import React, { Component } from 'react'
import { ScrollView, Text, FlatList, StyleSheet, View } from "react-native"
import { connect } from "react-redux"
import { getAllCategories, createNewCategory } from "../../actions/categoriesActions"
import CategoryForm from "./CategoriesForm"
import PureChart from 'react-native-pure-chart';
import { Button, FAB, Card, Title } from 'react-native-paper';
import { addAndroidBackListener, removeAndroidBackListener } from "../AndroidBackButton"

class pieChart {
    constructor(value, label, color) {
        this.value = value
        this.label = label
        this.color = color
    }
}

class AllCategories extends Component {

    // static navigationOptions = {
    //     title: 'AllCategories',
    //     /* No more header config here! */
    //   };

    state = {
        showFlatList: true,
        showDetails: false,
        categoryId: null,
        showAddButton: true, 
        showForm: false
    }

    componentDidMount() {
        const { currentUser, navigation } = this.props
        !currentUser && navigation.navigate("WelcomeScreen")
        currentUser && this.props.getAllCategories()
        addAndroidBackListener(this.goBack)
    }

    componentWillUnmount() {
        removeAndroidBackListener(this.goBack)
    }

    goBack = async () => {
        await this.props.navigation.push("WelcomeScreen")
    }

    showAddForm = () => {
        this.setState({
            showForm: !this.state.showForm,
            showAddButton: !this.state.showAddButton,
            showFlatList: !this.state.showFlatList
        })
    }
    
    handleSubmit = (data) => {
        this.setState({
            showForm: !this.state.showForm,
            showAddButton: !this.state.showAddButton,
            showFlatList: !this.state.showFlatList
        })
        this.props.createNewCategory(data.name)
    }

    render() {

        const { allCategories, currentUser } = this.props
        const { navigate } = this.props.navigation
        const id = this.state.categoryId

        const categoriesToDisplay = allCategories.map((cat) => new pieChart(cat.amount, cat.name, cat.color))
        
        return (
            <ScrollView
            style={styles.background}
            >

                {
                    !allCategories && <Text> Loading ... </Text>
                }

                {
                    (this.state.showAddButton && currentUser) &&
                    <Button
                        mode="contained"
                        onPress={this.showAddForm}
                        style={{ flex:1,
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center',
                            marginHorizontal: 60,
                            marginVertical: 5,
                            marginTop: 35,
                            backgroundColor: "#FF951C", 
                            color: styles.buttonTextColor.color,
                            borderBottomWidth: 0.3,
                            borderRightWidth: 0.3,
                            borderColor: "white"
                        }}
                    > Add A New Category </Button>
                }

                {/* {
                    (this.state.showAddButton && currentUser) &&
                    <FAB
                        style={styles.fab}
                        small={false}
                        icon="add"
                        onPress={this.showAddForm}                        
                    />
                } */}

                {
                    this.state.showForm &&
                    <CategoryForm onSubmit={ this.handleSubmit } />
                }

                {
                    allCategories.length > 1 && !this.state.showForm &&
                    <View
                        style={{ 
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: 20 
                        }}
                    >
                        <PureChart
                            data={categoriesToDisplay}
                            type='pie'
                        />
                    </View>
                }

                {
                    (this.state.showFlatList && currentUser) &&
                    <FlatList
                        data={ allCategories }
                        keyExtractor={ (item, index) => item.id.toString() }
                        renderItem={({ item }) =>
                        <View>
                            <Card 
                                onPress={ () => navigate("CategoryDetails", {
                                    categoryId: item.id
                                })}    
                                style={{ flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginHorizontal: 80,
                                    marginVertical: 5,
                                    backgroundColor: styles.buttonBackground.backgroundColor
                                 }} 
                            >
                                <Card.Content 
                                    style={{ flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center', }} 
                                >
                                    <Title 
                                        style={{ color: styles.buttonTextColor.color }} 
                                    > 
                                        {item.name} 
                                    </Title>
                                </Card.Content>
                            </Card>
                        </View>
                        }
                    />
                }

            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => ({
    allCategories: state.categories,
    currentUser: state.currentUserReducer !== null,
})

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        
    },
    background: {
        backgroundColor: "#0B3954"
    },
    buttonBackground: {
        backgroundColor: "#00D0E5"
    },
    buttonTextColor: {
        color: "white"
    }
})
  
export default connect(mapStateToProps, { getAllCategories, createNewCategory })(AllCategories)