
import * as React from "react"
import{View,Text,Stylesheet, FlatList, Alert} from "react-native"
import { ListItem } from "react-native-elements";
import axios from "axios";


export default class HomeScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            listData:[],
            url:"http://localhost:5000/"
        }
        }
    getPlanets=()=>{
        const {url}=this.state
        axios.get(url).then(Response=>{
            return this.setState({listData: Response.data.data})
        }
        )
        .catch(error=>{
            Alert.alert(error.message)
        })
    }
    componentDidMount(){
        this.getPlanets()
    }
    renderItem=({item,index})=>(
        <ListItem 
        key={index}
        title={`Planet:${item.name}`}
        subtitle={`Distance from Earth:${item.distance_from_earth}`}
        titleStyle={{fontSize:18, fontWeight:"bold"}}
        containerStyle={{backgroundColor:"Blue"}}
        bottomDivider
        onPress={()=>{this.props.navigation.navigate("Details", {planet_name: item.name})}}
        />
    )
    keyExtractor=(item,index)=>index.toString()
    render(){
        const {listData}=this.state
        if(listData.length==0){
            return(
                <View><Text>Loading</Text></View>
            )
        }

  return (
    <View style={styles.container}>
        <View style={styles.upView} >
            <Text>Planets World</Text>
        </View>
        <View style={styles.lowView} >
            <FlatList keyExtractor={this.keyExtractor} data={this.state.listData} renderItem={this.renderItem} />
        </View>
    </View>
  );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upView:{
      flex:0.1,
      justifyContent:"center",
      alignItems:"center"
  },
  lowView:{
      flex:0.9,
  }
});
