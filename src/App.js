import { Box, NativeBaseProvider, Text } from "native-base";
import React, {useContext, useEffect, useState} from 'react';
import { HStack, VStack, Center, Checkbox, Input, Button } from "native-base";

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

  function handleClick(){
    let newDisplayItens = [...displayItems]
    newDisplayItens.push(inputText)
    setDisplayItems(newDisplayItens);
  }
  const handleChange = text => setInputText(text);

  return <NativeBaseProvider config={config}>
  <Center>
    <Text fontSize="6xl">Beach List</Text>
    <Input w="75%" maxW="300px" mb="3" py="0" onChangeText={handleChange}
    InputRightElement={
      <Button size="xs" rounded="none" w="1/6" h="full" onPress={handleClick}>
    Ok
      </Button>} placeholder="Digite o item" />
    <Text>{displayItems.length}</Text>
    <VStack space={4}>
    {

      displayItems.map(item => {
        return (
        <HStack space={3}>
          <Checkbox value="test">
          </Checkbox>
          <Text color="black.100">{item}</Text>
        </HStack>
      );
      })
    }
    </VStack>
  </Center>
  </NativeBaseProvider>;
};

export default App;
