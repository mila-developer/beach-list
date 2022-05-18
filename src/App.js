import { Box, NativeBaseProvider, Text } from "native-base"; //Components native base
import React, {useContext, useEffect, useState} from 'react'; //Hooks
import { HStack, VStack, Center, Checkbox, Input, Button, DeleteIcon, Pressable } from "native-base";
import axios from 'axios';

// importando a lib expo-linear-gradient
const LinearGradient = require("expo-linear-gradient").LinearGradient;
const config = {
  dependencies: {
    "linear-gradient": LinearGradient
  }
};

const App = (props) => {
  // utilizando o hook useSate
  const [inputText, setInputText] = useState(''); // inicializa com string vazia
  // useState recebe como parametro o valor inicial do estado
  // os dois outros parametros (inputText e setInputText) são respectivamente o nome do atributo e a função
  // para atualizá-lo.
  const [displayItems, setDisplayItems] = useState([]); // inicializa com array vazio
  const [displayId, setDisplayId] = useState(0); //inicializa com 0

  axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
  useEffect( () => {
    axios.get("http://localhost:8080/beach-api/")
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }, []);

  function handleClick(){
    let newDisplayItens = [...displayItems]
    let item = {
      id: displayId,
      name: inputText,
      strike: false,
    }
    console.log("id = " +displayId);
    newDisplayItens.push(item)
    setDisplayId(displayId+1);
    setDisplayItems(newDisplayItens);
  }

  function itemDelete(id) {
    console.log("deletando id..." +id);
    let newDisplayItens = []
    displayItems.map(item => {
      if(item.id != id) {
        newDisplayItens.push(item)
      }
    })
    console.log(newDisplayItens)
    setDisplayItems(newDisplayItens)
  }

  function strikeItem(id) {
    let newStrikeItem = []
    displayItems.map(item => {
      if(item.id != id) {
        newStrikeItem.push(item)
      }
      else {
        let newItem = {...item};
        newItem.strike = !newItem.strike;
        newStrikeItem.push(newItem);
      }
    })
    console.log(newStrikeItem)
    setDisplayItems(newStrikeItem)
  }

  const handleChange = text => setInputText(text);

  // Components

  // Provider prover um modo de passar dados através de componentes 
  // sem a necessidade de passar dados manualmente para seus filhos
  return <NativeBaseProvider config={config}>
  <Box w="100vw" h="100vh" bg={{
    linearGradient: {
      colors: ["lightBlue.300", "violet.800"],
      start: [0, 0],
      end: [1, 0]
    }  
  }}>
    <Center>
      <Text fontSize="6xl" color="white">Beach List</Text>
      <Input w="75%" maxW="300px" mb="3" py="0" onChangeText={handleChange}
      InputRightElement={
        <Button size="xs" rounded="none" w="1/6" h="full" onPress={handleClick}>
      Ok
        </Button>} color="white"  placeholderTextColor="silver" placeholder="Insert your item" />
      <VStack space={4}>
      {

        displayItems.map(item => {
          return (
          <HStack key={item.id} space={3}>
            <Checkbox onChange={() => strikeItem(item.id)} value="test">
            </Checkbox>
            <Text strikeThrough = {item.strike} color="white">{item.name}</Text>  
            <Pressable onPress={() => itemDelete(item.id)}>
              <DeleteIcon color="primary.50" />
            </Pressable>
          </HStack>
        );
        })
      }
      </VStack>
    </Center>
  </Box>
  </NativeBaseProvider>;
};

export default App;
