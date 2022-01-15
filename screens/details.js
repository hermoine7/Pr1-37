import * as React from "react"
import{View,Text,Stylesheet, Alert, Button} from "react-native";
import axios from "axios";
import { Card, Icon  } from "react-native-elements";

export default class DetailsScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            details:{},
            imagePath:"",
            url:`http://localhost:5000/planet?name=${this.props.navigation.getParam("planet_name")}`
        }
    }
    getDatails=()=>{
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
    setDetails=planetDetails=>{
        const ptype=planetDetails.planet_type
        let imagePath=""
        switch(ptype){
            case "Gas Giant":
                imagePath=require("../Planet-Image-assets-main/assets/planet_type/gas_giant.png");
                break;
            case "neptune Like":
                imagePath=require("../Planet-Image-assets-main/assets/planet_type/neptune_like.png");
                break;
            case "Super Earth":
                imagePath=require("../Planet-Image-assets-main/assets/planet_type/super_earth.png");
                break;
            case "Terrestrial":
                imagePath=require("../Planet-Image-assets-main/assets/planet_type/sterrestrial.png");
                break;
            default:imagePath=require("../Planet-Image-assets-main/assets/planet_type/gas_giant.png");
                    break;
        
        }
        this.setState({
            details:planetDetails,
            imagePath:imagePath
        })
    }
    render(){
  return (
    <View style={styles.container}>

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
});
