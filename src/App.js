import { Box, NativeBaseProvider, Text } from "native-base";
import React, {useContext, useEffect, useState, useId} from 'react';
import { HStack, VStack, Center, Checkbox, Input, Button, DeleteIcon } from "native-base";

const LinearGradient = require("expo-linear-gradient").LinearGradient;
const config = {
  dependencies: {
    "linear-gradient": LinearGradient
  }
};
const beachItems = [
  "Protetor solar",
  "Carteira",
  "Toalha",
  "Água",
  "Óculos escuro",
  "Fones de ouvido",
];

const App = (props) => {
  const [inputText, setInputText] = useState('');
  const [displayItems, setDisplayItems] = useState([]);
  let id = 0;

  function handleClick(){
    let newDisplayItens = [...displayItems]
    let item = {
      id: id,
      name: inputText
    }
    console.log(id);
    newDisplayItens.push(item)
    id ++;
    setDisplayItems(newDisplayItens);
  }
  const handleChange = text => setInputText(text);

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
        </Button>} color="white" placeholder="Insert your item" />
      <VStack space={4}>
      {

        displayItems.map(item => {
          return (
          <HStack space={3}>
            <Checkbox value="test">
            </Checkbox>
            <Text color="white">{item.name}</Text> <DeleteIcon color="primary.50" />
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
